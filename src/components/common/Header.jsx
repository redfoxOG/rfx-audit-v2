import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Wrench, DollarSign, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { user, signOut, signInWithOAuth } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navItemClasses = ({ isActive }) =>
    `font-mono text-sm uppercase tracking-widest transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-gray-400'}`;

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-mono text-xl font-bold text-primary">RedFox Securities</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/scan" className={navItemClasses}>Scan</NavLink>
          <NavLink to="/pricing" className={navItemClasses}>Pricing</NavLink>
          <NavLink to="/subscribe" className={navItemClasses}>Subscribe</NavLink>
          {user && <NavLink to="/branding" className={navItemClasses}>Branding</NavLink>}
          {user && <NavLink to="/dashboard" className={navItemClasses}>Dashboard</NavLink>}
          {user && <NavLink to="/workspaces" className={navItemClasses}>Workspaces</NavLink>}
          {user && <NavLink to="/notifications" className={navItemClasses}>Notifications</NavLink>}
          <NavLink to="/about" className={navItemClasses}>About</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={toggleTheme} variant="ghost" size="icon">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {user ? (
            <Button onClick={signOut} variant="ghost" size="sm">Sign Out</Button>
          ) : (
            <Button onClick={() => signInWithOAuth('github')} size="sm">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;