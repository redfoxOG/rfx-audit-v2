import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LegalPage = () => {
  return (
    <>
      <Helmet>
        <title>Legal & Data Policy | RedFox Securities</title>
        <meta name="description" content="Details on our data retention policy, terms of service, and privacy." />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Data Retention & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We take your privacy and data security seriously. Our policies are designed to be as transparent and straightforward as possible.
            </p>
            <h3 className="text-lg font-bold font-mono text-primary pt-4">Data Retention</h3>
            <p>
              All scan logs and generated reports are transient. They are automatically and permanently purged from our systems after 24 hours. We do not retain long-term records of your scan results or the vulnerabilities found. The temporary storage is solely for the purpose of allowing you to download your report after a scan is complete.
            </p>
            <h3 className="text-lg font-bold font-mono text-primary pt-4">Terms of Service</h3>
            <p>
              By using this service, you agree that you are authorized to perform a security scan on the domain you provide. You must have explicit permission from the owner of the target domain. Unauthorized scanning of systems is illegal and against our terms of service. RedFox Securities is not responsible for any misuse of this tool.
            </p>
            <h3 className="text-lg font-bold font-mono text-primary pt-4">Disclaimer</h3>
            <p>
              This tool provides an automated, high-level security assessment. It is not a replacement for a full, manual penetration test. While we strive for accuracy, we cannot guarantee that all vulnerabilities will be discovered.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LegalPage;