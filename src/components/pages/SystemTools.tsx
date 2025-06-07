import React, { useState } from 'react';
import { useQuery, useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface SystemToolsProps {
  isDarkTheme: boolean;
}

export function SystemTools({ isDarkTheme }: SystemToolsProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const systemStats = [
    { label: 'System Uptime', value: '99.9%', trend: '30 days', color: 'text-green-500' },
    { label: 'Active Users', value: '1,247', trend: '+89 today', color: 'text-blue-500' },
    { label: 'Database Size', value: '2.4 TB', trend: '+120 GB this month', color: 'text-purple-500' },
    { label: 'API Calls', value: '2.4M', trend: '+15% this week', color: 'text-orange-500' }
  ];

  const systemTools = [
    {
      id: 'database',
      name: 'Database Management',
      description: 'Manage database operations, backups, and optimization',
      icon: '🗄️',
      status: 'healthy',
      lastRun: '2 hours ago',
      actions: ['Backup', 'Optimize', 'Migrate', 'Restore']
    },
    {
      id: 'cache',
      name: 'Cache Management',
      description: 'Clear and manage application cache and CDN',
      icon: '⚡',
      status: 'healthy',
      lastRun: '30 minutes ago',
      actions: ['Clear Cache', 'Warm Cache', 'View Stats', 'Configure']
    },
    {
      id: 'logs',
      name: 'Log Management',
      description: 'View, search, and manage system logs',
      icon: '📋',
      status: 'warning',
      lastRun: '5 minutes ago',
      actions: ['View Logs', 'Download', 'Archive', 'Configure']
    },
    {
      id: 'monitoring',
      name: 'System Monitoring',
      description: 'Monitor system performance and health metrics',
      icon: '📊',
      status: 'healthy',
      lastRun: 'Real-time',
      actions: ['View Metrics', 'Set Alerts', 'Export Data', 'Configure']
    },
    {
      id: 'security',
      name: 'Security Scanner',
      description: 'Scan for security vulnerabilities and threats',
      icon: '🔒',
      status: 'healthy',
      lastRun: '1 day ago',
      actions: ['Run Scan', 'View Report', 'Configure', 'Update Rules']
    },
    {
      id: 'maintenance',
      name: 'Maintenance Mode',
      description: 'Enable maintenance mode and schedule downtime',
      icon: '🔧',
      status: 'inactive',
      lastRun: '1 week ago',
      actions: ['Enable', 'Schedule', 'Configure', 'History']
    }
  ];

  const recentLogs = [
    { id: '1', level: 'INFO', message: 'User authentication successful', timestamp: '2024-01-15 14:30:25', source: 'auth-service' },
    { id: '2', level: 'WARN', message: 'High memory usage detected', timestamp: '2024-01-15 14:28:15', source: 'system-monitor' },
    { id: '3', level: 'ERROR', message: 'Database connection timeout', timestamp: '2024-01-15 14:25:10', source: 'database' },
    { id: '4', level: 'INFO', message: 'Backup completed successfully', timestamp: '2024-01-15 14:20:00', source: 'backup-service' },
    { id: '5', level: 'DEBUG', message: 'Cache invalidation triggered', timestamp: '2024-01-15 14:15:30', source: 'cache-service' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600';
      case 'WARN': return 'text-yellow-600';
      case 'INFO': return 'text-blue-600';
      case 'DEBUG': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className={`text-xs ${stat.color}`}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* System Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {systemTools.map((tool) => (
          <div 
            key={tool.id}
            className={`${cardBg} ${cardBorder} border rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all ${selectedTool === tool.id ? 'ring-2 ring-purple-500' : ''}`}
            onClick={() => setSelectedTool(tool.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{tool.icon}</span>
                <div>
                  <h3 className={`text-lg font-semibold ${textPrimary}`}>{tool.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tool.status)}`}>
                    {tool.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <p className={`text-sm ${textSecondary} mb-4`}>{tool.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs ${textSecondary}`}>Last run: {tool.lastRun}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {tool.actions.slice(0, 4).map((action, index) => (
                <button 
                  key={index}
                  className={`px-3 py-2 rounded-lg ${buttonBg} ${buttonText} text-xs font-medium hover:opacity-80 transition-opacity`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (action === 'Enable' || action === 'Schedule') {
                      setShowMaintenanceModal(true);
                    } else if (action === 'Backup') {
                      setShowBackupModal(true);
                    }
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* System Logs */}
      <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent System Logs</h3>
          <div className="flex space-x-2">
            <select className={`px-3 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm border ${cardBorder}`}>
              <option value="all">All Levels</option>
              <option value="error">Errors Only</option>
              <option value="warn">Warnings</option>
              <option value="info">Info</option>
            </select>
            <button className={`px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Export Logs
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${cardBorder}`}>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Level</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Message</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Source</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => (
                <tr key={log.id} className={`border-b ${cardBorder} hover:bg-opacity-50 hover:bg-gray-100`}>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${textPrimary}`}>{log.message}</td>
                  <td className={`py-3 px-4 ${textSecondary}`}>{log.source}</td>
                  <td className={`py-3 px-4 ${textSecondary} text-sm`}>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Health Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Performance Metrics</h3>
          
          <div className="space-y-4">
            {[
              { metric: 'CPU Usage', value: 45, color: 'bg-blue-500' },
              { metric: 'Memory Usage', value: 67, color: 'bg-green-500' },
              { metric: 'Disk Usage', value: 23, color: 'bg-purple-500' },
              { metric: 'Network I/O', value: 89, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${textPrimary}`}>{item.metric}</span>
                  <span className={`text-sm ${textPrimary} font-medium`}>{item.value}%</span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-2`}>
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>System Health</h3>
          
          <div className="space-y-4">
            {[
              { service: 'Database', status: 'healthy', uptime: '99.9%' },
              { service: 'API Gateway', status: 'healthy', uptime: '99.8%' },
              { service: 'Cache Layer', status: 'warning', uptime: '98.5%' },
              { service: 'File Storage', status: 'healthy', uptime: '99.7%' },
              { service: 'Search Engine', status: 'healthy', uptime: '99.6%' },
              { service: 'Message Queue', status: 'healthy', uptime: '99.9%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    service.status === 'healthy' ? 'bg-green-500' :
                    service.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className={`text-sm ${textPrimary}`}>{service.service}</span>
                </div>
                <span className={`text-sm ${textSecondary}`}>{service.uptime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Maintenance Mode</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Maintenance Type</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="immediate">Immediate</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Duration (minutes)</label>
                <input 
                  type="number" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="30"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Maintenance Message</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={3}
                  placeholder="System maintenance in progress. Please try again later."
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className={`text-sm ${textPrimary}`}>Notify all users</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Block new logins</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className={`text-sm ${textPrimary}`}>Force logout existing users</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowMaintenanceModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowMaintenanceModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
                >
                  Enable Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Database Backup</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Backup Type</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="full">Full Backup</option>
                  <option value="incremental">Incremental Backup</option>
                  <option value="differential">Differential Backup</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Storage Location</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="local">Local Storage</option>
                  <option value="s3">Amazon S3</option>
                  <option value="gcs">Google Cloud Storage</option>
                  <option value="azure">Azure Blob Storage</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Compression</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="gzip">GZIP</option>
                  <option value="lz4">LZ4</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Verify backup integrity</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className={`text-sm ${textPrimary}`}>Encrypt backup</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Send notification on completion</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowBackupModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowBackupModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Backup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
