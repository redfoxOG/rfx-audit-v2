import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'One-Click Fix',
    price: '$29',
    unit: 'per vulnerability',
    description: 'Automated, instant fixes for common vulnerabilities.',
    features: [
      'Automated bash snippets',
      'Docker Compose patches',
      'Step-by-step guides',
      'Pay only for what you need',
    ],
    cta: 'Start Scanning',
    link: '/scan',
  },
  {
    name: 'RedFox Remote',
    price: '$199',
    unit: 'per hour',
    description: 'Live, hands-on support from a security professional.',
    features: [
      'Live SSH/Tailscale session',
      'Expert-led remediation',
      'Complex issue resolution',
      'Perfect for critical vulnerabilities',
    ],
    cta: 'Purchase Session',
    link: '/scan',
  },
  {
    name: 'Managed Hardening',
    price: '$499',
    unit: 'per month',
    description: 'Continuous monitoring and proactive hardening.',
    features: [
      'Full project management',
      'Dedicated security engineer',
      'Weekly reports & check-ins',
      'Complete peace of mind',
    ],
    cta: 'Contact Sales',
    link: 'mailto:sales@redfoxsecurities.com',
  },
];

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Pricing | RedFox Securities</title>
        <meta name="description" content="Affordable, on-demand security fixes and professional support." />
      </Helmet>
      <div className="text-center mb-16">
        <h1 className="terminal-h1">Find Your Fix</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          From instant automated patches to hands-on expert support, we have a solution for every security need.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card key={tier.name} className="flex flex-col bg-background/50 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="terminal-h2 text-2xl">{tier.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
              <div className="font-mono">
                <span className="text-4xl font-bold text-primary">{tier.price}</span>
                <span className="text-muted-foreground">/{tier.unit}</span>
              </div>
              <ul className="space-y-3 text-left">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full font-mono uppercase tracking-wider">
                <Link to={tier.link}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PricingPage;