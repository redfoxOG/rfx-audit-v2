import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScanLine, Target, FileText, ShieldCheck, Wrench } from 'lucide-react';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>RedFox Securities | Instant Website Exposure Audit & Fixes</title>
        <meta name="description" content="Instant, professional-grade website security audits and on-demand vulnerability fixes. Pay only for what you need." />
      </Helmet>
      <div className="space-y-24">
        {/* Hero Section */}
        <section className="text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="terminal-h1 relative">
                <span className="glitch-text" data-text="Instant Website">
                  <span>Instant Website</span>
                  Instant Website
                  <span>Instant Website</span>
                </span>
                <br/>
                <span className="glitch-text" data-text="Exposure Audit">
                  <span>Exposure Audit</span>
                  Exposure Audit
                  <span>Exposure Audit</span>
                </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Uncover vulnerabilities before attackers do. Get a comprehensive security report and on-demand fixes in minutes.
            </p>
            <div className="mt-10 flex justify-center items-center gap-4">
              <Button asChild size="lg" className="font-mono text-lg uppercase tracking-wider">
                <Link to="/scan">Start Scan</Link>
              </Button>
            </div>
             <div className="mt-6">
                <Badge variant="secondary" className="font-mono text-sm py-1 px-3">
                    <Wrench className="h-4 w-4 mr-2 text-primary"/>
                    Fixes starting at $29 – pay only for what you need.
                </Badge>
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-muted rounded-full border border-border">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <p className="font-mono font-bold text-xl">1. Input Domain</p>
              <p className="text-muted-foreground">Enter the target you want to audit.</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-muted rounded-full border border-border">
                <ScanLine className="h-10 w-10 text-primary" />
              </div>
              <p className="font-mono font-bold text-xl">2. Live Scan</p>
              <p className="text-muted-foreground">Our engine performs a live, non-intrusive scan.</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-muted rounded-full border border-border">
                <Wrench className="h-10 w-10 text-primary" />
              </div>
              <p className="font-mono font-bold text-xl">3. Purchase Fixes</p>
              <p className="text-muted-foreground">Get actionable reports and on-demand fixes.</p>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section>
          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-mono text-lg text-muted-foreground">100+ Scans Run Daily</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-mono text-lg text-muted-foreground">Built by Offensive-Security Pros</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;