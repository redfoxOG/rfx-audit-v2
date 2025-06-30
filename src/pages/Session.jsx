import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { config } from '@/config';

const SessionPage = () => {
  const { sessionId } = useParams();

  return (
    <>
      <Helmet>
        <title>Remote Session | RedFox Securities</title>
      </Helmet>
      <div className="space-y-8">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">RedFox Remote Session</CardTitle>
            <p className="text-muted-foreground font-mono">Session ID: {sessionId}</p>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black border border-border rounded-md">
              <iframe
                src={`https://${config.JITSI_DOMAIN}/${sessionId}`}
                allow="camera; microphone"
                className="w-full h-full"
                title={`Jitsi Meeting ${sessionId}`}
              ></iframe>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2 text-2xl">Pre-Session Checklist</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2">
            <p>✅ Ensure you have stable internet connection.</p>
            <p>✅ If required, enable SSH access on the target machine.</p>
            <p>✅ If required, open port 22 in your firewall for our IP (to be provided).</p>
            <p>✅ Make sure you have a recent backup of your data.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SessionPage;