import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface UserRolesProps {
  isDarkTheme: boolean;
}

export function UserRoles({ isDarkTheme }: UserRolesProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('roles');
  
  const roles = useQuery(api.dashboard.getUserRoles) || [];
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const roleStats = [
    { label: 'Total Roles', value: '12', trend: '+2 this month' },
    { label: 'Active Users', value: '1,247', trend: '+89 this week' },
    { label: 'Admin Users', value: '23', trend: '3 super admins' },
    { label: 'Permission Groups', value: '8', trend: '4 custom groups' }
  ];

  const defaultRoles = [
    {
      _id: 'role1',
      name: 'Super Admin',
      description: 'Full system access with all permissions including user management and system configuration',
      type: 'system' as const,
      level: 'admin' as const,
      permissions: ['all_access', 'user_management', 'school_management', 'system_config', 'billing_access'],
      userCount: 3,
      color: 'red',
      createdAt: '2024-01-01',
      lastModified: '2024-01-10'
    },
    {
      _id: 'role2',
      name: 'School Manager',
      description: 'Manage school-specific settings, users, and educational content within assigned schools',
      type: 'custom' as const,
      level: 'manager' as const,
      permissions: ['school_management', 'user_management', 'content_creation', 'analytics_view'],
      userCount: 45,
      color: 'blue',
      createdAt: '2024-01-05',
      lastModified: '2024-01-12'
    },
    {
      _id: 'role3',
      name: 'Teacher',
      description: 'Access to classroom management, student progress tracking, and content creation tools',
      type: 'system' as const,
      level: 'user' as const,
      permissions: ['classroom_management', 'student_tracking', 'content_creation', 'grade_management'],
      userCount: 892,
      color: 'green',
      createdAt: '2024-01-01',
      lastModified: '2024-01-08'
    },
    {
      _id: 'role4',
      name: 'Content Creator',
      description: 'Specialized role for creating and managing educational content and assessments',
      type: 'custom' as const,
      level: 'user' as const,
      permissions: ['content_creation', 'template_access', 'ai_tools', 'collaboration'],
      userCount: 156,
      color: 'purple',
      createdAt: '2024-01-03',
      lastModified: '2024-01-11'
    }
  ];

  const allRoles = [...roles, ...defaultRoles];

  const permissions = [
    { id: 'all_access', name: 'All Access', description: 'Complete system access' },
    { id: 'user_management', name: 'User Management', description: 'Create, edit, and delete users' },
    { id: 'school_management', name: 'School Management', description: 'Manage school settings and data' },
    { id: 'system_config', name: 'System Configuration', description: 'Configure system settings' },
    { id: 'billing_access', name: 'Billing Access', description: 'View and manage billing information' },
    { id: 'content_creation', name: 'Content Creation', description: 'Create and edit educational content' },
    { id: 'analytics_view', name: 'Analytics View', description: 'View analytics and reports' },
    { id: 'classroom_management', name: 'Classroom Management', description: 'Manage classroom activities' },
    { id: 'student_tracking', name: 'Student Tracking', description: 'Track student progress' },
    { id: 'grade_management', name: 'Grade Management', description: 'Manage grades and assessments' },
    { id: 'template_access', name: 'Template Access', description: 'Access to content templates' },
    { id: 'ai_tools', name: 'AI Tools', description: 'Access to AI-powered features' },
    { id: 'collaboration', name: 'Collaboration', description: 'Collaborate with other users' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'system': return 'bg-blue-100 text-blue-800';
      case 'custom': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-orange-100 text-orange-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roleStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className="text-xs text-green-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* User Roles Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>User Roles</h3>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Create Role
            </button>
          </div>
          
          <div className="space-y-4">
            {allRoles.map((role) => (
              <div 
                key={role._id}
                className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity ${selectedRole === role._id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedRole(role._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className={`font-medium ${textPrimary} mr-3`}>{role.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(role.type)}`}>
                        {role.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ml-2 ${getLevelColor(role.level)}`}>
                        {role.level.toUpperCase()}
                      </span>
                    </div>
                    <p className={`text-sm ${textSecondary} mb-3`}>{role.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {role.permissions.slice(0, 4).map((permission, index) => (
                        <span key={index} className={`px-2 py-1 rounded text-xs ${isDarkTheme ? 'bg-[#4A3A60] text-[#E0D8F0]' : 'bg-gray-200 text-gray-700'}`}>
                          {permissions.find(p => p.id === permission)?.name || permission}
                        </span>
                      ))}
                      {role.permissions.length > 4 && (
                        <span className={`px-2 py-1 rounded text-xs ${textSecondary}`}>
                          +{role.permissions.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${textSecondary}`}>{role.userCount} users assigned</span>
                      <span className={`text-xs ${textSecondary}`}>Modified {role.lastModified}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEditModal(true);
                      }}
                      className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}
                    >
                      Edit
                    </button>
                    <button className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs hover:opacity-80">
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Details */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          {selectedRole ? (
            <div>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Role Details</h3>
              {(() => {
                const role = allRoles.find(r => r._id === selectedRole);
                if (!role) return null;
                
                return (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
                      <h4 className={`font-medium ${textPrimary} mb-3`}>Role Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Type:</span>
                          <span className={`text-sm ${textPrimary} font-medium`}>{role.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Level:</span>
                          <span className={`text-sm ${textPrimary} font-medium`}>{role.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Users:</span>
                          <span className={`text-sm ${textPrimary} font-medium`}>{role.userCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${textSecondary}`}>Created:</span>
                          <span className={`text-sm ${textPrimary} font-medium`}>{role.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
                      <h4 className={`font-medium ${textPrimary} mb-3`}>Permissions</h4>
                      <div className="space-y-2">
                        {role.permissions.map((permissionId, index) => {
                          const permission = permissions.find(p => p.id === permissionId);
                          return (
                            <div key={index} className={`p-2 rounded ${isDarkTheme ? 'bg-[#4A3A60]' : 'bg-gray-100'}`}>
                              <div className={`text-xs font-medium ${textPrimary}`}>
                                {permission?.name || permissionId}
                              </div>
                              <div className={`text-xs ${textSecondary}`}>
                                {permission?.description || 'Custom permission'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        View Users
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Duplicate Role
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Export Settings
                      </button>
                      <button className="w-full px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
                        Delete Role
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">👥</div>
              <h4 className={`text-lg font-medium ${textPrimary} mb-2`}>Select a Role</h4>
              <p className={`text-sm ${textSecondary}`}>Choose a role to view details and permissions</p>
            </div>
          )}
        </div>
      </div>

      {/* Permission Matrix */}
      <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Permission Matrix</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${cardBorder}`}>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Permission</th>
                {allRoles.slice(0, 4).map((role) => (
                  <th key={role._id} className={`text-center py-3 px-4 font-medium ${textPrimary}`}>
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className={`border-b ${cardBorder} hover:bg-opacity-50 hover:bg-gray-100`}>
                  <td className={`py-3 px-4`}>
                    <div>
                      <div className={`font-medium ${textPrimary} text-sm`}>{permission.name}</div>
                      <div className={`text-xs ${textSecondary}`}>{permission.description}</div>
                    </div>
                  </td>
                  {allRoles.slice(0, 4).map((role) => (
                    <td key={role._id} className="py-3 px-4 text-center">
                      {role.permissions.includes(permission.id) ? (
                        <span className="text-green-500 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-300 text-lg">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Create New Role</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Role Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Custom Role"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Role Level</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Description</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={3}
                  placeholder="Describe the role and its responsibilities..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Permissions</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-start">
                      <input type="checkbox" className="mr-2 mt-1" />
                      <div>
                        <span className={`text-sm ${textPrimary}`}>{permission.name}</span>
                        <div className={`text-xs ${textSecondary}`}>{permission.description}</div>
                      </div>
                    </label>
                  ))}
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
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Edit Role</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Role Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    defaultValue="School Manager"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Role Level</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="user">User</option>
                    <option value="manager" selected>Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Description</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={3}
                  defaultValue="Manage school-specific settings, users, and educational content within assigned schools"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Permissions</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-start">
                      <input 
                        type="checkbox" 
                        className="mr-2 mt-1" 
                        defaultChecked={['school_management', 'user_management', 'content_creation', 'analytics_view'].includes(permission.id)}
                      />
                      <div>
                        <span className={`text-sm ${textPrimary}`}>{permission.name}</span>
                        <div className={`text-xs ${textSecondary}`}>{permission.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
