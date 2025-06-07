import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
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
import { useNavigation } from '../hooks/useNavigation';

export function Dashboard() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { currentPage, platformManagementItems, systemOperationsItems, navigateTo, getCurrentPageTitle } = useNavigation();
  
  const dashboardStats = useQuery(api.dashboard.getDashboardStats);
  const aiModels = useQuery(api.dashboard.getAIModels) || [];
  const schools = useQuery(api.dashboard.getSchools) || [];
  const userRoles = useQuery(api.dashboard.getUserRoles) || [];
  const featureFlags = useQuery(api.dashboard.getFeatureFlags) || [];
  const communications = useQuery(api.dashboard.getCommunications) || [];

  const themeClasses = isDarkTheme 
    ? 'bg-[#1A1229] text-white' 
    : 'bg-[#F8F9FA] text-gray-900';

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome isDarkTheme={isDarkTheme} />;
      case 'module-config':
        return <ModuleConfiguration 
          isDarkTheme={isDarkTheme}
          modules={[
            {
              _id: 'mod1',
              name: 'AI Study Planner',
              description: 'Personalized study planning with AI recommendations',
              category: 'ai' as const,
              version: '2.3.1',
              status: 'active' as const,
              schools: schools.filter(s => s.features?.includes('ai_planner')).length
            },
            {
              _id: 'mod2',
              name: 'Parent Portal',
              description: 'Real-time communication between parents and teachers',
              category: 'core' as const,
              version: '1.8.0',
              status: 'active' as const,
              schools: schools.filter(s => s.features?.includes('parent_portal')).length
            }
          ]}
        />;
      case 'service-tier':
        return <ServiceTierBilling 
          isDarkTheme={isDarkTheme}
          schools={schools.map(s => ({
            ...s,
            subscriptionTier: s.subscriptionTier as 'basic' | 'pro' | 'enterprise',
            status: s.status as 'active' | 'trial' | 'suspended',
            joinDate: new Date(s.joinDate).toISOString(),
            lastActivity: new Date(s.lastActivity).toISOString()
          }))}
        />;
      case 'ai-model':
        return <AIModelManagement 
          isDarkTheme={isDarkTheme}
          aiModels={aiModels.map(m => ({
            ...m,
            status: m.status as 'Healthy' | 'Monitoring' | 'Issues'
          }))}
        />;
      case 'analytics':
        return <AnalyticsReporting 
          isDarkTheme={isDarkTheme}
          schools={schools.map(s => ({
            ...s,
            subscriptionTier: s.subscriptionTier as 'basic' | 'pro' | 'enterprise',
            status: s.status as 'active' | 'trial' | 'suspended',
            joinDate: new Date(s.joinDate).toISOString(),
            lastActivity: new Date(s.lastActivity).toISOString()
          }))}
        />;
      case 'creative-studio':
        return <CreativeStudio isDarkTheme={isDarkTheme} />;
      case 'user-roles':
        return <UserRoles 
          isDarkTheme={isDarkTheme}
          userRoles={userRoles.map(role => ({
            _id: role._id,
            name: role.roleName,
            description: role.description,
            level: role.permissions.includes('all_access') ? 'admin' as const : 
                   role.permissions.includes('school_management') ? 'manager' as const : 'user' as const,
            type: role.isSystemRole ? 'system' as const : 'custom' as const,
            permissions: role.permissions,
            userCount: Math.floor(Math.random() * 50) + 10
          }))}
        />;
      case 'feature-flags':
        return <FeatureFlags 
          isDarkTheme={isDarkTheme}
          featureFlags={featureFlags.map(f => ({
            ...f,
            targetAudience: f.targetAudience as 'all' | 'beta' | 'specific_schools' | 'enterprise',
            createdAt: new Date(f.createdAt).toISOString()
          }))}
        />;
      case 'communication':
        return <CommunicationHub 
          isDarkTheme={isDarkTheme}
          communications={communications.map(c => ({
            ...c,
            type: c.type as 'announcement' | 'maintenance' | 'update' | 'alert',
            status: c.status as 'draft' | 'scheduled' | 'sent',
            scheduledAt: c.scheduledAt ? new Date(c.scheduledAt).toISOString() : undefined,
            sentAt: c.sentAt ? new Date(c.sentAt).toISOString() : undefined
          }))}
          schools={schools.map(s => ({
            ...s,
            subscriptionTier: s.subscriptionTier as 'basic' | 'pro' | 'enterprise',
            status: s.status as 'active' | 'trial' | 'suspended',
            joinDate: new Date(s.joinDate).toISOString(),
            lastActivity: new Date(s.lastActivity).toISOString()
          }))}
        />;
      case 'system-tools':
        return <SystemTools 
          isDarkTheme={isDarkTheme}
        />;
      case 'ai-assistant':
        return <AIAssistant isDarkTheme={isDarkTheme} />;
      default:
        return <ServiceTierBilling 
          isDarkTheme={isDarkTheme}
          schools={schools.map(s => ({
            ...s,
            subscriptionTier: s.subscriptionTier as 'basic' | 'pro' | 'enterprise',
            status: s.status as 'active' | 'trial' | 'suspended',
            joinDate: new Date(s.joinDate).toISOString(),
            lastActivity: new Date(s.lastActivity).toISOString()
          }))}
        />;
    }
  };

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      <Sidebar 
        isDarkTheme={isDarkTheme}
        platformManagementItems={platformManagementItems}
        systemOperationsItems={systemOperationsItems}
        onNavigate={navigateTo}
      />
      <div className="flex-1 flex flex-col">
        <TopNavigation 
          isDarkTheme={isDarkTheme} 
          onThemeToggle={() => setIsDarkTheme(!isDarkTheme)}
          currentPage={currentPage}
          pageTitle={getCurrentPageTitle()}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}
