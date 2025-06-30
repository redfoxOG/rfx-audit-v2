import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | RedFox Securities</title>
        <meta name="description" content="Learn about RedFox Securities' ethical hacking stance and commitment to improving web security." />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Our Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              RedFox Securities was born from the trenches of offensive security. We're not corporate suits; we're ethical hackers, penetration testers, and security researchers who believe in proactive defense. Our mission is to make high-quality security auditing accessible to everyone, from solo developers to growing businesses.
            </p>
            <p>
              We operate on a simple principle: to catch a thief, you have to think like one. Our tools and methodologies mimic the techniques used by real-world attackers, providing you with a realistic assessment of your digital footprint. We don't just find vulnerabilities; we provide context and actionable advice to help you secure your assets effectively.
            </p>
            <p>
              This platform is our way of democratizing security knowledge. It's fast, automated, and built on the expertise gained from years of breaking into systems—so you don't have to.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AboutPage;