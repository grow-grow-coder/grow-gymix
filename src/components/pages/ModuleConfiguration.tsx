import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface ModuleConfigurationProps {
  isDarkTheme: boolean;
}

export function ModuleConfiguration({ isDarkTheme }: ModuleConfigurationProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const modules = useQuery(api.dashboard.getModules) || [];
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const moduleStats = [
    { label: 'Total Modules', value: '24', trend: '+3 this month' },
    { label: 'Active Modules', value: '18', trend: '12 deployed' },
    { label: 'School Adoption', value: '89%', trend: '+5% this week' },
    { label: 'Avg Rating', value: '4.7', trend: '★★★★★' }
  ];

  const defaultModules = [
    {
      _id: 'mod1',
      name: 'AI Study Planner',
      description: 'Intelligent study planning and scheduling system with personalized recommendations',
      category: 'ai' as const,
      version: '2.1.0',
      status: 'active' as const,
      schools: 67,
      rating: 4.8,
      features: ['Personalized Scheduling', 'Progress Tracking', 'AI Recommendations', 'Calendar Integration'],
      dependencies: ['Core System', 'User Management'],
      configuration: {
        maxStudents: 1000,
        aiModel: 'gpt-4.1-nano',
        updateFrequency: 'daily',
        notifications: true
      }
    },
    {
      _id: 'mod2',
      name: 'Smart Gradebook',
      description: 'Advanced gradebook with analytics, insights, and automated grading capabilities',
      category: 'core' as const,
      version: '1.8.3',
      status: 'active' as const,
      schools: 89,
      rating: 4.6,
      features: ['Automated Grading', 'Grade Analytics', 'Parent Portal', 'Export Tools'],
      dependencies: ['Core System', 'Assessment Engine'],
      configuration: {
        gradingScale: 'percentage',
        autoBackup: true,
        parentAccess: true,
        analyticsLevel: 'advanced'
      }
    },
    {
      _id: 'mod3',
      name: 'Content Creator Studio',
      description: 'AI-powered content creation tools for educational materials and assessments',
      category: 'creative' as const,
      version: '1.5.1',
      status: 'beta' as const,
      schools: 23,
      rating: 4.4,
      features: ['AI Content Generation', 'Template Library', 'Collaboration Tools', 'Version Control'],
      dependencies: ['AI Engine', 'File Storage'],
      configuration: {
        aiProvider: 'openai',
        templateAccess: 'premium',
        collaborationMode: 'real-time',
        versionHistory: 30
      }
    },
    {
      _id: 'mod4',
      name: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting system for educational insights',
      category: 'analytics' as const,
      version: '2.0.2',
      status: 'active' as const,
      schools: 45,
      rating: 4.9,
      features: ['Real-time Analytics', 'Custom Reports', 'Data Visualization', 'Export Options'],
      dependencies: ['Data Pipeline', 'Visualization Engine'],
      configuration: {
        dataRetention: '2years',
        reportScheduling: true,
        customDashboards: true,
        apiAccess: true
      }
    }
  ];

  const allModules = [...modules, ...defaultModules];

  const filteredModules = allModules.filter(module => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return module.status === 'active';
    if (activeTab === 'beta') return module.status === 'beta';
    return module.category === activeTab;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'bg-purple-100 text-purple-800';
      case 'core': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-green-100 text-green-800';
      case 'analytics': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {moduleStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className="text-xs text-green-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Module Management Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules List */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Module Library</h3>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Create Module
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1 mb-4 overflow-x-auto">
            {['all', 'active', 'beta', 'ai', 'core', 'creative', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-purple-600 text-white' 
                    : `${buttonBg} ${buttonText} hover:opacity-80`
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredModules.map((module) => (
              <div 
                key={module._id}
                className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity ${selectedModule === module._id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedModule(module._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className={`font-medium ${textPrimary} mr-3`}>{module.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(module.status)}`}>
                        {module.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ml-2 ${getCategoryColor(module.category)}`}>
                        {module.category.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ml-2 ${isDarkTheme ? 'bg-[#4A3A60] text-[#E0D8F0]' : 'bg-gray-200 text-gray-700'}`}>
                        v{module.version}
                      </span>
                    </div>
                    <p className={`text-sm ${textSecondary} mb-3`}>{module.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {module.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className={`px-2 py-1 rounded text-xs ${isDarkTheme ? 'bg-[#4A3A60] text-[#E0D8F0]' : 'bg-gray-200 text-gray-700'}`}>
                          {feature}
                        </span>
                      ))}
                      {module.features.length > 3 && (
                        <span className={`px-2 py-1 rounded text-xs ${textSecondary}`}>
                          +{module.features.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm ${textSecondary}`}>{module.schools} schools</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className={`text-sm ${textPrimary} font-medium`}>{module.rating}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowConfigModal(true);
                          }}
                          className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}
                        >
                          Configure
                        </button>
                        <button className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs hover:opacity-80">
                          Deploy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Details */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          {selectedModule ? (
            <div>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Module Details</h3>
              {(() => {
                const module = allModules.find(m => m._id === selectedModule);
                if (!module) return null;
                
                return (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
                      <h4 className={`font-medium ${textPrimary} mb-3`}>Configuration</h4>
                      <div className="space-y-2">
                        {Object.entries(module.configuration).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className={`text-sm ${textSecondary}`}>{key}:</span>
                            <span className={`text-sm ${textPrimary} font-medium`}>
                              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
                      <h4 className={`font-medium ${textPrimary} mb-3`}>Dependencies</h4>
                      <div className="space-y-2">
                        {module.dependencies.map((dep, index) => (
                          <div key={index} className={`p-2 rounded ${isDarkTheme ? 'bg-[#4A3A60]' : 'bg-gray-100'}`}>
                            <span className={`text-xs ${textPrimary}`}>{dep}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        View Documentation
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Check Updates
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Export Settings
                      </button>
                      <button className="w-full px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
                        Uninstall Module
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <h4 className={`text-lg font-medium ${textPrimary} mb-2`}>Select a Module</h4>
              <p className={`text-sm ${textSecondary}`}>Choose a module to view details and configuration</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Module Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Create New Module</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Module Name</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="My Custom Module"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Description</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={3}
                  placeholder="Describe your module..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Category</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="ai">AI</option>
                    <option value="core">Core</option>
                    <option value="creative">Creative</option>
                    <option value="analytics">Analytics</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Version</label>
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="1.0.0"
                  />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Create Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Module Configuration</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Max Students</label>
                  <input 
                    type="number" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    defaultValue="1000"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>AI Model</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="gpt-4.1-nano">GPT-4.1 Nano</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Update Frequency</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="real-time">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Enable notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Auto-backup data</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className={`text-sm ${textPrimary}`}>Debug mode</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
