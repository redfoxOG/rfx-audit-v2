import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const scanId = searchParams.get('scan_id');

  return (
    <>
      <Helmet>
        <title>Payment Successful | RedFox Securities</title>
      </Helmet>
      <div className="max-w-2xl mx-auto text-center">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <div className="mx-auto bg-green-500/20 text-green-500 rounded-full p-3 w-fit">
              <CheckCircle className="h-12 w-12" />
            </div>
            <CardTitle className="terminal-h2 mt-4">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Your payment has been processed. Your requested fix is now unlocked.
              You will be notified on the fixes page once it's ready.
            </p>
            {scanId && (
              <Button asChild>
                <Link to={`/fixes/${scanId}`}>Return to Fixes</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PaymentSuccessPage;