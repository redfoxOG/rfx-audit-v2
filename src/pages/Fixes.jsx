import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { loadStripe } from '@stripe/stripe-js';
import { config } from '@/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShieldAlert, Wrench, Download, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock vulnerability data - in a real app, this would come from the scan report
const mockVulnerabilities = [
  { id: 'missing-csp', risk: 'High' },
  { id: 'exposed-panel', risk: 'Medium' },
  { id: 'weak-tls', risk: 'Critical' },
];

const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

const FixesPage = () => {
  const { scanId } = useParams();
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fixes, setFixes] = useState([]);
  const [purchases, setPurchases] = useState({});
  const [loading, setLoading] = useState(true);
  const [payingFixId, setPayingFixId] = useState(null);

  useEffect(() => {
    if (!session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // 1. Fetch available fixes from the 'fixes' table
      const { data: fixesData, error: fixesError } = await supabase
        .from('fixes')
        .select('*');
      
      if (fixesError) {
        console.error('Error fetching fixes:', fixesError);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not load available fixes.' });
        setLoading(false);
        return;
      }

      // 2. Map vulnerabilities to available fixes
      const availableFixes = mockVulnerabilities.map(vuln => {
        const fixDetail = fixesData.find(f => f.id === vuln.id);
        return { ...vuln, ...fixDetail };
      }).filter(f => f.summary); // Only show vulns that have a corresponding fix

      setFixes(availableFixes);

      // 3. Fetch existing purchases for this scan
      const { data: purchasesData, error: purchasesError } = await supabase
        .from('purchases')
        .select('*')
        .eq('scan_id', scanId)
        .eq('user_id', user.id);

      if (purchasesError) {
        console.error('Error fetching purchases:', purchasesError);
      } else {
        const purchasesMap = purchasesData.reduce((acc, p) => {
          acc[p.fix_id] = p;
          return acc;
        }, {});
        setPurchases(purchasesMap);
      }

      setLoading(false);
    };

    if (user) {
      fetchData();
    }
  }, [scanId, user, toast]);

  // Listen for real-time updates to purchases
  useEffect(() => {
    if (!user) return;
    const channel = supabase.channel(`purchases:${scanId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'purchases',
        filter: `scan_id=eq.${scanId}`
      }, (payload) => {
        setPurchases(prev => ({ ...prev, [payload.new.fix_id]: payload.new }));
        toast({ title: 'Payment Successful!', description: `Your fix for ${payload.new.fix_id} is ready.` });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [scanId, user, toast]);

  const handlePurchase = async (fix) => {
    setPayingFixId(fix.id);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId: fix.price_id,
          scanId: scanId,
          fixId: fix.id,
          userEmail: user.email,
        },
      });

      if (error) throw error;

      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (stripeError) {
        toast({ variant: 'destructive', title: 'Stripe Error', description: stripeError.message });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not initiate checkout. Please try again.' });
    } finally {
      setPayingFixId(null);
    }
  };

  const getRiskBadgeVariant = (risk) => {
    if (risk === 'Critical') return 'destructive';
    if (risk === 'High') return 'destructive';
    if (risk === 'Medium') return 'secondary';
    return 'outline';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <Helmet>
        <title>Fix Vulnerabilities | RedFox Securities</title>
      </Helmet>
      <div className="space-y-8">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Vulnerability Remediation</CardTitle>
            <p className="text-muted-foreground font-mono">Scan ID: {scanId}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fixes.map(fix => {
                const purchase = purchases[fix.id];
                return (
                  <div key={fix.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-md border border-border gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3">
                        <Badge variant={getRiskBadgeVariant(fix.risk)}>{fix.risk}</Badge>
                        <p className="font-mono font-bold text-primary">{fix.summary}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{fix.cve}</p>
                    </div>
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      {purchase && purchase.status === 'paid' ? (
                        fix.tier === 'remote-session' ? (
                          <Button variant="outline" className="w-full">
                            <Calendar className="mr-2 h-4 w-4" /> Schedule Session
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" /> Download Fix
                          </Button>
                        )
                      ) : (
                        <Button onClick={() => handlePurchase(fix)} disabled={payingFixId === fix.id} className="w-full">
                          {payingFixId === fix.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wrench className="mr-2 h-4 w-4" />}
                          Fix for ${(fix.price_amount / 100).toFixed(2)}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FixesPage;