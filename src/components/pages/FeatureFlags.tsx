import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface FeatureFlagsProps {
  isDarkTheme: boolean;
}

export function FeatureFlags({ isDarkTheme }: FeatureFlagsProps) {
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const featureFlags = useQuery(api.dashboard.getFeatureFlags) || [];
  const createFeatureFlag = useMutation(api.dashboard.createFeatureFlag);
  const toggleFeatureFlag = useMutation(api.dashboard.toggleFeatureFlag);
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const flagStats = [
    { label: 'Total Flags', value: featureFlags.length.toString(), trend: '+3 this month' },
    { label: 'Active Flags', value: featureFlags.filter(f => f.enabled).length.toString(), trend: '12 enabled' },
    { label: 'Beta Features', value: featureFlags.filter(f => f.environment === 'beta').length.toString(), trend: '5 in testing' },
    { label: 'Rollout Rate', value: '73%', trend: '+15% this week' }
  ];

  const filteredFlags = featureFlags.filter(flag => {
    if (activeTab === 'all') return true;
    if (activeTab === 'enabled') return flag.enabled;
    if (activeTab === 'disabled') return !flag.enabled;
    return flag.environment === activeTab;
  });

  const handleToggleFlag = async (flagId: string) => {
    try {
      await toggleFeatureFlag({ flagId });
    } catch (error) {
      console.error('Failed to toggle feature flag:', error);
    }
  };

  const handleCreateFlag = async (flagData: any) => {
    try {
      await createFeatureFlag(flagData);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create feature flag:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Feature Flag Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {flagStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className="text-xs text-green-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Feature Flags Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flags List */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Feature Flags</h3>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Create Flag
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1 mb-4 overflow-x-auto">
            {['all', 'enabled', 'disabled', 'production', 'beta', 'development'].map((tab) => (
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
            {filteredFlags.map((flag) => (
              <div 
                key={flag._id} 
                className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity ${selectedFlag === flag._id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedFlag(flag._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className={`font-medium ${textPrimary} mr-3`}>{flag.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        flag.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {flag.enabled ? 'ENABLED' : 'DISABLED'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ml-2 ${
                        flag.environment === 'production' ? 'bg-blue-100 text-blue-800' :
                        flag.environment === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {flag.environment.toUpperCase()}
                      </span>
                    </div>
                    <p className={`text-sm ${textSecondary} mb-2`}>{flag.description}</p>
                    <div className={`text-xs ${textSecondary}`}>
                      Rollout: {flag.rolloutPercentage}% • Created {flag.createdAt}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={flag.enabled}
                        onChange={() => handleToggleFlag(flag._id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                    <button className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flag Details */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          {selectedFlag ? (
            <div>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Flag Details</h3>
              {(() => {
                const flag = featureFlags.find(f => f._id === selectedFlag);
                if (!flag) return null;
                
                return (
                  <div className="space-y-4">
                    <div>
                      <h4 className={`text-sm font-medium ${textPrimary} mb-2`}>Configuration</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Status:</span>
                          <span className={`text-sm ${textPrimary}`}>{flag.enabled ? 'Enabled' : 'Disabled'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Environment:</span>
                          <span className={`text-sm ${textPrimary}`}>{flag.environment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Rollout:</span>
                          <span className={`text-sm ${textPrimary}`}>{flag.rolloutPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-medium ${textPrimary} mb-2`}>Targeting Rules</h4>
                      <div className="space-y-2">
                        {flag.targetingRules?.map((rule: any, index: number) => (
                          <div key={index} className={`p-2 rounded ${isDarkTheme ? 'bg-[#4A3A60]' : 'bg-gray-100'}`}>
                            <span className={`text-xs ${textPrimary}`}>{rule.condition}: {rule.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-medium ${textPrimary} mb-2`}>Usage Analytics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Evaluations:</span>
                          <span className={`text-sm ${textPrimary}`}>12,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>True Rate:</span>
                          <span className={`text-sm ${textPrimary}`}>73.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Last 24h:</span>
                          <span className={`text-sm ${textPrimary}`}>2,341</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Edit Configuration
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        View Analytics
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Clone Flag
                      </button>
                      <button className="w-full px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
                        Delete Flag
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">🚩</div>
              <h4 className={`text-lg font-medium ${textPrimary} mb-2`}>Select a Feature Flag</h4>
              <p className={`text-sm ${textSecondary}`}>Choose a flag to view details and configuration</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Feature Flag Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Create Feature Flag</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Flag Name</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="e.g., new_dashboard_ui"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Description</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={3}
                  placeholder="Describe what this feature flag controls"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Environment</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="development">Development</option>
                    <option value="beta">Beta</option>
                    <option value="production">Production</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Initial Rollout %</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Targeting Rules</label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <select className={`flex-1 px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500`}>
                      <option value="user_type">User Type</option>
                      <option value="school_tier">School Tier</option>
                      <option value="region">Region</option>
                    </select>
                    <input 
                      type="text" 
                      className={`flex-1 px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500`}
                      placeholder="Value"
                    />
                    <button className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className={`text-sm ${textPrimary}`}>Enable flag immediately</span>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleCreateFlag({})}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Create Flag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
