import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import App from '../App';
import Dashboard from './Dashboard';

// Import page components
import LoginPage from './pages/login-page/login';
import FeaturesPage from './pages/features/FeaturesPage';
import ConsultationPage from './pages/consultation/ConsultationPage';

// Dashboard pages
import { DashboardHome } from './pages/DashboardHome';
import { ModuleConfiguration } from './pages/ModuleConfiguration';
import { ServiceTierBilling } from './pages/ServiceTierBilling';
import { AIModelManagement } from './pages/AIModelManagement';
import { AnalyticsReporting } from './pages/AnalyticsReporting';
import { UserRoles } from './pages/UserRoles';
import { FeatureFlags } from './pages/FeatureFlags';
import { CommunicationHub } from './pages/CommunicationHub';
import { SystemTools } from './pages/SystemTools';
import { AIAssistant } from './pages/AIAssistant';
import { CreativeStudio } from './pages/CreativeStudio';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<App />} />
          
          {/* Auth Pages */}
          <Route path="/pages/login" element={<LoginPage />} />
          
          {/* Info Pages */}
          <Route path="/pages/features" element={<FeaturesPage />} />
          <Route path="/pages/consultation" element={<ConsultationPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/module-config" element={<ModuleConfiguration />} />
          <Route path="/service-tier" element={<ServiceTierBilling />} />
          <Route path="/ai-model" element={<AIModelManagement />} />
          <Route path="/analytics" element={<AnalyticsReporting />} />
          <Route path="/user-roles" element={<UserRoles />} />
          <Route path="/feature-flags" element={<FeatureFlags />} />
          <Route path="/communication" element={<CommunicationHub />} />
          <Route path="/system-tools" element={<SystemTools />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/creative-studio" element={<CreativeStudio />} />
          
          {/* Portal Routes */}
          <Route path="/admin-portal" element={<Dashboard />} />
          <Route path="/teacher-portal" element={<Dashboard />} />
          <Route path="/student-dashboard" element={<Dashboard />} />
          <Route path="/parent-portal" element={<Dashboard />} />
          <Route path="/finance-dashboard" element={<Dashboard />} />
          <Route path="/marketing-hub" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
