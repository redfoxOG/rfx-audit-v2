import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RedFox Securities. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            About
          </Link>
          <Link to="/legal" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Legal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;