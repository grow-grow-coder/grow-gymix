import React from 'react';

interface TopNavigationProps {
  isDarkTheme: boolean;
  onThemeToggle: () => void;
  currentPage: string;
  pageTitle: string;
}

export function TopNavigation({ isDarkTheme, onThemeToggle, currentPage, pageTitle }: TopNavigationProps) {
  const bgColor = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const borderColor = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const buttonHover = isDarkTheme ? 'hover:bg-[#4A3A60]' : 'hover:bg-[#E9ECEF]';
  const accentBg = isDarkTheme ? 'bg-[#FFD700]' : 'bg-[#7F00FF]';
  const accentText = isDarkTheme ? 'text-[#1A1229]' : 'text-white';

  const getPageSpecificButtons = () => {
    switch (currentPage) {
      case 'dashboard':
        return [
          { label: 'Platform Health', action: () => {}, icon: '🏥' },
          { label: 'System Status', action: () => {}, icon: '📊' },
          { label: 'Refresh Data', action: () => {}, icon: '🔄' },
        ];
      case 'module-config':
        return [
          { label: 'Add Module', action: () => {}, icon: '➕' },
          { label: 'Import Config', action: () => {}, icon: '📥' },
          { label: 'Export Settings', action: () => {}, icon: '📤' },
        ];
      case 'service-tier':
        return [
          { label: 'Add Tier', action: () => {}, icon: '🏷️' },
          { label: 'Billing Reports', action: () => {}, icon: '📋' },
          { label: 'Revenue Analytics', action: () => {}, icon: '💰' },
        ];
      case 'ai-model':
        return [
          { label: 'Deploy Model', action: () => {}, icon: '🚀' },
          { label: 'Performance Monitor', action: () => {}, icon: '📈' },
          { label: 'Model Registry', action: () => {}, icon: '📚' },
        ];
      case 'analytics':
        return [
          { label: 'Generate Report', action: () => {}, icon: '📊' },
          { label: 'Export Data', action: () => {}, icon: '💾' },
          { label: 'Schedule Report', action: () => {}, icon: '⏰' },
        ];
      case 'user-roles':
        return [
          { label: 'Create Role', action: () => {}, icon: '👤' },
          { label: 'Import Roles', action: () => {}, icon: '📥' },
          { label: 'Audit Log', action: () => {}, icon: '📝' },
        ];
      case 'feature-flags':
        return [
          { label: 'New Flag', action: () => {}, icon: '🚩' },
          { label: 'Bulk Update', action: () => {}, icon: '🔄' },
          { label: 'Rollout Plan', action: () => {}, icon: '📋' },
        ];
      case 'communication':
        return [
          { label: 'New Message', action: () => {}, icon: '✉️' },
          { label: 'Templates', action: () => {}, icon: '📄' },
          { label: 'Send History', action: () => {}, icon: '📜' },
        ];
      case 'system-tools':
        return [
          { label: 'System Logs', action: () => {}, icon: '📋' },
          { label: 'API Monitor', action: () => {}, icon: '🔍' },
          { label: 'Backup Status', action: () => {}, icon: '💾' },
        ];
      default:
        return [
          { label: 'Platform Health', action: () => {}, icon: '🏥' },
          { label: 'Deployment Status', action: () => {}, icon: '🚀' },
          { label: 'Global Search', action: () => {}, icon: '🔍' },
        ];
    }
  };

  const pageButtons = getPageSpecificButtons();

  return (
    <div className={`h-16 ${bgColor} border-b ${borderColor} flex items-center justify-between px-6`}>
      {/* Left: Page Title and Context Buttons */}
      <div className="flex items-center space-x-4">
        <h1 className={`text-lg font-semibold ${isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]'}`}>
          {pageTitle}
        </h1>
        <div className="flex items-center space-x-2">
          {pageButtons.map((button, index) => (
            <button 
              key={index}
              onClick={button.action}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${buttonBg} ${buttonText} ${buttonHover} transition-colors flex items-center space-x-1`}
              title={button.label}
            >
              <span>{button.icon}</span>
              <span className="hidden sm:inline">{button.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Global Actions */}
      <div className="flex items-center space-x-4">
        <button className={`px-4 py-2 rounded-full text-sm font-medium ${accentBg} ${accentText} shadow-sm hover:shadow transition-shadow flex items-center space-x-2`}>
          <span>+</span>
          <span className="hidden sm:inline">New Release</span>
        </button>
        
        <button 
          onClick={onThemeToggle}
          className={`p-2 rounded-full ${buttonHover} transition-colors`}
          title="Toggle theme"
        >
          <span className="text-xl">{isDarkTheme ? '☀️' : '🌙'}</span>
        </button>
        
        <button className={`p-2 rounded-full ${buttonHover} transition-colors`} title="Refresh">
          <span className="text-xl">🔄</span>
        </button>
        
        <button className={`p-2 rounded-full ${buttonHover} transition-colors`} title="Help">
          <span className="text-xl">❓</span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-full ${isDarkTheme ? 'bg-[#7F00FF]' : 'bg-[#495057]'} flex items-center justify-center text-white font-bold text-sm`}>
            SA
          </div>
          <div className="text-sm hidden md:block">
            <div className={`font-medium ${isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]'}`}>Super Admin</div>
            <div className={`text-xs ${isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]'}`}>Grow Your Need HQ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
