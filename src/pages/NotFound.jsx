import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    return (
        <div className="text-center my-20">
            <h1 className="terminal-h1 text-8xl">404</h1>
            <p className="mt-4 text-2xl text-muted-foreground font-mono">Page Not Found</p>
            <p className="mt-2 text-muted-foreground">The resource you requested could not be found.</p>
            <Button asChild className="mt-8 font-mono text-lg uppercase tracking-wider">
                <Link to="/">Return Home</Link>
            </Button>
        </div>
    );
};

export default NotFoundPage;