import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface ServiceTierBillingProps {
  isDarkTheme: boolean;
}

export function ServiceTierBilling({ isDarkTheme }: ServiceTierBillingProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showCreateTierModal, setShowCreateTierModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tiers');
  
  const serviceTiers = useQuery(api.dashboard.getServiceTiers) || [];
  const billingData = useQuery(api.dashboard.getBillingData) || [];
  const createServiceTier = useMutation(api.dashboard.createServiceTier);
  const updateBilling = useMutation(api.dashboard.updateBilling);
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const billingStats = [
    { label: 'Monthly Revenue', value: '$1.83M', trend: '+12.5% vs last month', color: 'text-green-500' },
    { label: 'Active Subscriptions', value: '2,847', trend: '+89 this month', color: 'text-blue-500' },
    { label: 'Churn Rate', value: '2.3%', trend: '-0.5% vs last month', color: 'text-purple-500' },
    { label: 'Avg Revenue Per User', value: '$643', trend: '+$47 vs last month', color: 'text-orange-500' }
  ];

  const defaultTiers = [
    {
      _id: 'basic',
      name: 'Basic',
      price: 29,
      billingCycle: 'monthly',
      features: ['Up to 100 students', 'Basic analytics', 'Email support', 'Core modules'],
      limits: { students: 100, storage: '5GB', apiCalls: 1000 },
      popular: false,
      subscribers: 1247
    },
    {
      _id: 'professional',
      name: 'Professional',
      price: 79,
      billingCycle: 'monthly',
      features: ['Up to 500 students', 'Advanced analytics', 'Priority support', 'All modules', 'Custom branding'],
      limits: { students: 500, storage: '50GB', apiCalls: 10000 },
      popular: true,
      subscribers: 892
    },
    {
      _id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      billingCycle: 'monthly',
      features: ['Unlimited students', 'Custom analytics', '24/7 support', 'All modules', 'White-label', 'API access'],
      limits: { students: 'unlimited', storage: '500GB', apiCalls: 100000 },
      popular: false,
      subscribers: 708
    }
  ];

  const allTiers = [...serviceTiers, ...defaultTiers];

  const recentTransactions = [
    { id: '1', customer: 'Riverside Elementary', amount: '$79.00', tier: 'Professional', date: '2024-01-15', status: 'Completed' },
    { id: '2', customer: 'Metro High School', amount: '$199.00', tier: 'Enterprise', date: '2024-01-15', status: 'Completed' },
    { id: '3', customer: 'Oakwood Academy', amount: '$29.00', tier: 'Basic', date: '2024-01-14', status: 'Pending' },
    { id: '4', customer: 'Central University', amount: '$199.00', tier: 'Enterprise', date: '2024-01-14', status: 'Completed' },
    { id: '5', customer: 'Pine Valley School', amount: '$79.00', tier: 'Professional', date: '2024-01-13', status: 'Failed' }
  ];

  const handleCreateTier = async (tierData: any) => {
    try {
      await createServiceTier(tierData);
      setShowCreateTierModal(false);
    } catch (error) {
      console.error('Failed to create service tier:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {billingStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className={`text-xs ${stat.color}`}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Service Tiers & Billing Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Tiers */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Service Tiers</h3>
            <button 
              onClick={() => setShowCreateTierModal(true)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Create Tier
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allTiers.map((tier) => (
              <div 
                key={tier._id}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                  tier.popular 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                    : `border-gray-200 ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white'}`
                } ${selectedTier === tier._id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedTier(tier._id)}
              >
                {tier.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h4 className={`text-xl font-bold ${textPrimary} mb-2`}>{tier.name}</h4>
                  <div className={`text-3xl font-bold ${textPrimary} mb-1`}>
                    ${tier.price}
                    <span className={`text-sm font-normal ${textSecondary}`}>/{tier.billingCycle}</span>
                  </div>
                  <p className={`text-sm ${textSecondary}`}>{tier.subscribers} subscribers</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className={`text-sm ${textPrimary}`}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                    Edit Tier
                  </button>
                  <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                    View Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Overview */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Billing Overview</h3>
          
          <div className="space-y-4 mb-6">
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
              <h4 className={`font-medium ${textPrimary} mb-2`}>Revenue Distribution</h4>
              <div className="space-y-2">
                {allTiers.map((tier) => (
                  <div key={tier._id} className="flex items-center justify-between">
                    <span className={`text-sm ${textSecondary}`}>{tier.name}</span>
                    <span className={`text-sm ${textPrimary} font-medium`}>
                      ${(tier.price * tier.subscribers).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
              <h4 className={`font-medium ${textPrimary} mb-2`}>Payment Methods</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${textSecondary}`}>Credit Card</span>
                  <span className={`text-sm ${textPrimary}`}>78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${textSecondary}`}>Bank Transfer</span>
                  <span className={`text-sm ${textPrimary}`}>15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${textSecondary}`}>PayPal</span>
                  <span className={`text-sm ${textPrimary}`}>7%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => setShowBillingModal(true)}
              className="w-full px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Generate Invoice
            </button>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Export Data
            </button>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Payment Settings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent Transactions</h3>
          <div className="flex space-x-2">
            <button className={`px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Filter
            </button>
            <button className={`px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${cardBorder}`}>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Customer</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Amount</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Tier</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Date</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Status</th>
                <th className={`text-left py-3 px-4 font-medium ${textPrimary}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className={`border-b ${cardBorder} hover:bg-opacity-50 hover:bg-gray-100`}>
                  <td className={`py-3 px-4 ${textPrimary}`}>{transaction.customer}</td>
                  <td className={`py-3 px-4 ${textPrimary} font-medium`}>{transaction.amount}</td>
                  <td className={`py-3 px-4 ${textPrimary}`}>{transaction.tier}</td>
                  <td className={`py-3 px-4 ${textSecondary}`}>{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-xs text-purple-600 hover:underline">View</button>
                      <button className="text-xs text-blue-600 hover:underline">Refund</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Service Tier Modal */}
      {showCreateTierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Create Service Tier</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Tier Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="e.g., Premium"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Price</label>
                  <input 
                    type="number" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="99"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Billing Cycle</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Features</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={4}
                  placeholder="Enter features, one per line"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Student Limit</label>
                  <input 
                    type="number" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Storage</label>
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="100GB"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>API Calls</label>
                  <input 
                    type="number" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="50000"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className={`text-sm ${textPrimary}`}>Mark as popular tier</span>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowCreateTierModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleCreateTier({})}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Create Tier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Modal */}
      {showBillingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Generate Invoice</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Customer</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Search customer..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Service Tier</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    {allTiers.map((tier) => (
                      <option key={tier._id} value={tier._id}>{tier.name} - ${tier.price}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Billing Period</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="current">Current Month</option>
                    <option value="next">Next Month</option>
                    <option value="custom">Custom Period</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Additional Notes</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={3}
                  placeholder="Optional notes for the invoice..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowBillingModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowBillingModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
