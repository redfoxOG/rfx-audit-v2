import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Wrench } from 'lucide-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const DashboardPage = () => {
    const { user, session } = useAuth();
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScans = async () => {
            if (!user) {
                setLoading(false);
                return;
            };

            setLoading(true);
            const { data, error } = await supabase
                .from('scans')
                .select('id, domain, status, created_at')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10);
            
            if (error) {
                console.error("Failed to fetch scans", error);
            } else {
                setScans(data);
            }
            setLoading(false);
        };

        fetchScans();
    }, [user]);

    const getStatusVariant = (status) => {
        switch (status) {
            case 'DONE': return 'outline';
            case 'ERROR': return 'destructive';
            default: return 'secondary';
        }
    };

    if (!session) {
        return (
            <div className="max-w-md mx-auto">
                <Card className="bg-background/50 border-border backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="terminal-h2">Access Your Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Auth
                            supabaseClient={supabase}
                            appearance={{ theme: ThemeSupa,
                                style: {
                                    button: { background: '#ff3b3b', borderColor: '#ff3b3b', color: 'white' },
                                    anchor: { color: '#ff3b3b' },
                                    input: { background: 'rgba(255, 59, 59, 0.1)', borderColor: 'rgba(255, 59, 59, 0.2)', color: 'white' },
                                    label: { color: '#ff3b3b', fontFamily: 'monospace' },
                                    message: { color: 'white' },
                                },
                            }}
                            providers={['github', 'google']}
                            theme="dark"
                        />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | RedFox Securities</title>
                <meta name="description" content="Your deployment checklist and recent scans." />
            </Helmet>
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="bg-background/50 border-border backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="terminal-h2">Recent Scans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading && <p>Loading scans...</p>}
                        {!loading && scans.length === 0 && (
                            <div className="text-center text-muted-foreground py-8">
                                <p>You haven't run any scans yet.</p>
                                <Button asChild variant="link" className="text-primary">
                                    <Link to="/scan">Start your first scan</Link>
                                </Button>
                            </div>
                        )}
                        {!loading && scans.length > 0 && (
                            <ul className="space-y-3">
                                {scans.map(scan => (
                                    <li key={scan.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md border border-border">
                                        <div>
                                            <p className="font-mono font-bold text-primary">{scan.domain}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(scan.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={getStatusVariant(scan.status)}>{scan.status}</Badge>
                                            <Button asChild variant="ghost" size="icon">
                                                <Link to={`/status/${scan.id}`} title="View Status">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            {scan.status === 'DONE' && (
                                                <Button asChild variant="ghost" size="icon">
                                                    <Link to={`/fixes/${scan.id}`} title="View Fixes">
                                                        <Wrench className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default DashboardPage;