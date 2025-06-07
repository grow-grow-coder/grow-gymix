import { useState } from 'react';
import { NavigationItem } from '../types';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const platformManagementItems: NavigationItem[] = [
    { id: 'module-config', label: 'Module Configuration', icon: '⚙️', isActive: false, path: '/module-config' },
    { id: 'service-tier', label: 'Service Tier & Billing', icon: '💳', isActive: false, path: '/service-tier' },
    { id: 'ai-model', label: 'AI Model Management', icon: '🧠', isActive: false, path: '/ai-model' },
    { id: 'analytics', label: 'Analytics & Reporting', icon: '📊', isActive: false, path: '/analytics' },
    { id: 'creative-studio', label: 'Creative Studio', icon: '🎨', isActive: false, path: '/creative-studio' },
  ];

  const systemOperationsItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard Home', icon: '📈', isActive: true, path: '/dashboard' },
    { id: 'user-roles', label: 'Master User Roles', icon: '👥', isActive: false, path: '/user-roles' },
    { id: 'feature-flags', label: 'Feature Flags & Updates', icon: '🚩', isActive: false, path: '/feature-flags' },
    { id: 'communication', label: 'Communication Hub', icon: '📧', isActive: false, path: '/communication' },
    { id: 'system-tools', label: 'System Tools & Settings', icon: '🔧', isActive: false, path: '/system-tools' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: '🤖', isActive: false, path: '/ai-assistant' },
  ];

  const navigateTo = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const getCurrentPageTitle = () => {
    const allItems = [...platformManagementItems, ...systemOperationsItems];
    const currentItem = allItems.find(item => item.id === currentPage);
    return currentItem?.label || 'Dashboard';
  };

  return {
    currentPage,
    platformManagementItems: platformManagementItems.map(item => ({
      ...item,
      isActive: item.id === currentPage
    })),
    systemOperationsItems: systemOperationsItems.map(item => ({
      ...item,
      isActive: item.id === currentPage
    })),
    navigateTo,
    getCurrentPageTitle,
  };
}
