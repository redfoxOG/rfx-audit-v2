import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { config } from '@/config';
import { generateHmac } from '@/lib/crypto';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const FQDN_REGEX = /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/;

const ScanPage = () => {
    const [domain, setDomain] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!FQDN_REGEX.test(domain)) {
            toast({
                title: 'Invalid Domain',
                description: 'Please enter a valid fully qualified domain name.',
                variant: 'destructive',
            });
            return;
        }
        setIsLoading(true);

        const scanId = crypto.randomUUID();
        const timestamp = new Date().toISOString();
        const dataToSign = `${scanId}${config.SECRET}`;
        const hmac = await generateHmac(dataToSign, config.SECRET);

        const n8nPayload = {
            scanId,
            domain,
            email,
            timestamp,
            hmac,
        };

        try {
            const { error: dbError } = await supabase.from('scans').insert({
                id: scanId,
                domain,
                email,
                user_id: user?.id,
            });

            if (dbError) throw dbError;

            await fetch(config.N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(n8nPayload),
                mode: 'no-cors'
            });

             toast({
                title: 'Scan Initiated',
                description: `Audit for ${domain} has begun. Redirecting...`,
            });
            
            setTimeout(() => navigate(`/status/${scanId}`), 1000);

        } catch (error) {
            console.error('Failed to initiate scan:', error);
            toast({
                title: 'Submission Failed',
                description: error.message || 'Could not connect to the scan service. Please try again later.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Start Scan | RedFox Securities</title>
                <meta name="description" content="Initiate a new website security scan." />
            </Helmet>
            <div className="max-w-2xl mx-auto">
                <Card className="bg-background/50 border-border backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="terminal-h2">Initiate New Scan</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Enter a domain to begin the security audit. An optional email can be used for notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="domain" className="font-mono text-primary">Target Domain</Label>
                                <Input
                                    id="domain"
                                    type="text"
                                    placeholder="example.com"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    required
                                    className="font-mono bg-input border-border focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-mono text-primary">Email (Optional)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="font-mono bg-input border-border focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full font-mono text-lg uppercase tracking-wider">
                                {isLoading ? 'Initiating...' : 'Launch Scan'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ScanPage;