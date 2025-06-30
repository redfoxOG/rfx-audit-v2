import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const checklistItems = [
    { text: "Replace placeholder URLs/secrets in src/config.js.", completed: false },
    { text: "Upload your final SVG logo and update in Header.jsx.", completed: false },
    { text: "Point redfoxsecurities.com DNS A record to your Hostinger IP.", completed: false },
    { text: "Configure security headers (CSP, HSTS) in your hosting environment.", completed: false },
    { text: "Set up a cron job to purge old scan data and reports.", completed: false },
    { text: "Run a full end-to-end test scan against example.com.", completed: false },
    { text: "Configure server-side CORS policy to allow your domain.", completed: false },
];

const Checklist = () => {
    return (
        <Card className="bg-background/50 border-border backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="terminal-h2">Post-Deployment Checklist</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {checklistItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Square className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                            <span className="font-mono text-sm text-foreground/80">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default Checklist;