import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/pages/Landing';
import ScanPage from '@/pages/Scan';
import StatusPage from '@/pages/Status';
import AboutPage from '@/pages/About';
import LegalPage from '@/pages/Legal';
import DashboardPage from '@/pages/Dashboard';
import NotFoundPage from '@/pages/NotFound';
import PricingPage from '@/pages/Pricing';
import FixesPage from '@/pages/Fixes';
import PaymentSuccessPage from '@/pages/PaymentSuccess';
import SessionPage from '@/pages/Session';
import WorkspacesPage from '@/pages/Workspaces';
import NotificationsPage from '@/pages/Notifications';
import SubscribePage from '@/pages/Subscribe';
import BrandingPage from '@/pages/Branding';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/status/:scanId" element={<StatusPage />} />
        <Route path="/fixes/:scanId" element={<FixesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/session/:sessionId" element={<SessionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workspaces" element={<WorkspacesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/branding" element={<BrandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;