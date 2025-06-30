import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { loadStripe } from '@stripe/stripe-js';
import { config } from '@/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

const SubscribePage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-subscription-session');
      if (error) throw error;
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (stripeError) toast({ variant: 'destructive', title: 'Stripe Error', description: stripeError.message });
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not start checkout' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Subscribe | RedFox Securities</title>
      </Helmet>
      <div className="max-w-xl mx-auto">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Premium Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Unlock higher scan quotas and branding options.</p>
            <Button onClick={handleSubscribe} disabled={loading} className="w-full">
              {loading ? 'Redirecting...' : 'Subscribe with Stripe'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SubscribePage;
