import React from 'react';
import { NavigationItem } from '../types';

interface SidebarProps {
  isDarkTheme: boolean;
  platformManagementItems: NavigationItem[];
  systemOperationsItems: NavigationItem[];
  onNavigate: (pageId: string) => void;
}

export function Sidebar({ isDarkTheme, platformManagementItems, systemOperationsItems, onNavigate }: SidebarProps) {
  const bgColor = isDarkTheme ? 'bg-[#2C203E]' : 'bg-[#343A40]';
  const borderColor = isDarkTheme ? 'border-[#3D2E52]' : 'border-[#495057]';
  const textColor = isDarkTheme ? 'text-[#A092B8]' : 'text-[#ADB5BD]';
  const activeTextColor = 'text-white';
  const activeBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#495057]';
  const hoverBg = isDarkTheme ? 'hover:bg-[#3D2E52]' : 'hover:bg-[#495057]';
  const accentColor = isDarkTheme ? 'border-[#FFD700]' : 'border-[#7F00FF]';

  return (
    <div className={`w-64 ${bgColor} flex flex-col`}>
      {/* Header */}
      <div className={`p-5 border-b ${borderColor} flex items-center`}>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
          G
        </div>
        <span className="ml-3 text-white font-bold text-xl">Grow Your Need</span>
      </div>

      {/* Platform Management Section */}
      <div className="pt-5">
        <div className={`px-5 pb-2 text-xs font-semibold uppercase tracking-wide ${textColor}`}>
          Platform Management
        </div>
        <nav className="space-y-1">
          {platformManagementItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center px-5 py-2.5 text-sm font-medium transition-colors text-left
                ${item.isActive 
                  ? `${activeTextColor} ${activeBg} border-l-3 ${accentColor}` 
                  : `${textColor} ${hoverBg} hover:text-white`
                }
              `}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* System Operations Section */}
      <div className="pt-6">
        <div className={`px-5 pb-2 text-xs font-semibold uppercase tracking-wide ${textColor}`}>
          System Operations
        </div>
        <nav className="space-y-1">
          {systemOperationsItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center px-5 py-2.5 text-sm font-medium transition-colors text-left
                ${item.isActive 
                  ? `${activeTextColor} ${activeBg} border-l-3 ${accentColor}` 
                  : `${textColor} ${hoverBg} hover:text-white`
                }
              `}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
