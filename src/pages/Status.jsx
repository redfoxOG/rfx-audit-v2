import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useScanStatus } from '@/hooks/useScanStatus';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileDown, Loader2, Wrench } from 'lucide-react';
import { config } from '@/config';
import { supabase } from '@/lib/customSupabaseClient';

const StatusPage = () => {
  const { scanId } = useParams();
  const { status, progress, logs, error } = useScanStatus(scanId);
  const [scanInfo, setScanInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  useEffect(() => {
    const fetchScanInfo = async () => {
        if (!scanId) return;
        setLoadingInfo(true);
        const { data, error } = await supabase
            .from('scans')
            .select('domain')
            .eq('id', scanId)
            .single();
        
        if (error) {
            console.error('Error fetching scan info:', error);
        } else {
            setScanInfo(data);
        }
        setLoadingInfo(false);
    };
    fetchScanInfo();
  }, [scanId]);


  return (
    <>
      <Helmet>
        <title>Scan Status: {scanInfo?.domain || scanId} | RedFox Securities</title>
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Live Scan Status</CardTitle>
            {loadingInfo ? (
                 <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <>
                    <p className="text-muted-foreground font-mono">
                        Target: <span className="text-primary">{scanInfo?.domain || 'N/A'}</span>
                    </p>
                    <p className="text-muted-foreground font-mono">
                        Scan ID: <span className="text-primary">{scanId}</span>
                    </p>
                </>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 font-mono text-sm">
                <span>{status}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full [&>*]:bg-primary" />
            </div>

            {status === 'DONE' && (
              <div className="text-center py-4 flex flex-col sm:flex-row justify-center gap-4">
                 <Button asChild size="lg" className="font-mono text-lg uppercase tracking-wider">
                    <a href={`${config.REPORT_BASE_URL}/${scanId}.pdf`} target="_blank" rel="noopener noreferrer">
                        <FileDown className="mr-2 h-5 w-5" /> Download Report
                    </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-mono text-lg uppercase tracking-wider">
                    <Link to={`/fixes/${scanId}`}>
                        <Wrench className="mr-2 h-5 w-5" /> View & Fix Vulnerabilities
                    </Link>
                </Button>
              </div>
            )}
            
            {status === 'ERROR' && (
                <div className="flex items-center gap-4 p-4 text-destructive border border-destructive/50 bg-destructive/10 rounded-md">
                    <AlertTriangle className="h-6 w-6"/>
                    <div>
                        <p className="font-bold">An Error Occurred</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2 text-2xl">Live Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto bg-black/50 p-4 rounded-md font-mono text-sm border border-border">
              {logs.map((log, index) => (
                <p key={index} className="whitespace-pre-wrap">
                  <span className="text-green-400">[{log.time}]</span>
                  <span className="text-cyan-400"> {log.check}: </span>
                  <span className="text-gray-300">{log.result}</span>
                </p>
              ))}
              {status !== 'DONE' && status !== 'ERROR' && <div className="animate-pulse">_</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StatusPage;