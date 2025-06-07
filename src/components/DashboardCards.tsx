import React from 'react';

interface DashboardCardsProps {
  isDarkTheme: boolean;
  metrics: any;
  aiModels: any[];
  deployments: any[];
}

export function DashboardCards({ isDarkTheme, metrics, aiModels, deployments }: DashboardCardsProps) {
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : '';
  const cardShadow = isDarkTheme ? '' : 'shadow-lg';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const textAccent = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const dividerColor = isDarkTheme ? 'border-[#4A3A60]' : 'border-[#DEE2E6]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const accentColor = isDarkTheme ? 'text-[#FFD700]' : 'text-[#7F00FF]';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Platform Status Card */}
      <div className={`${cardBg} ${cardBorder} ${cardShadow} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Platform Status & Admin Actions</h3>
        <div className="flex">
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                SA
              </div>
              <div>
                <div className={`font-semibold text-lg ${textPrimary}`}>Welcome, GYN SuperAdmin!</div>
                <div className={`text-sm ${textSecondary}`}>{metrics.platform_status?.sessionInfo}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`flex items-center text-sm ${textAccent}`}>
                <span className="text-green-500 mr-2">✓</span>
                <span>Overall System Health: {metrics.platform_status?.systemHealth}</span>
              </div>
              <div className={`flex items-center text-sm ${textAccent}`}>
                <span className="mr-2">🏫</span>
                <span>Active School Partners: {metrics.platform_status?.activeSchools}</span>
              </div>
              <div className={`flex items-center text-sm ${textAccent}`}>
                <span className="text-green-500 mr-2">⚠️</span>
                <span>Critical Alerts: {metrics.platform_status?.criticalAlerts}</span>
              </div>
            </div>
          </div>
          <div className={`w-px ${dividerColor} border-l mx-4`}></div>
          <div className="flex-1 pl-4">
            <h4 className={`text-sm font-medium ${textSecondary} mb-3`}>Quick Admin Actions</h4>
            <div className="space-y-2">
              <button className={`w-full text-left px-3 py-2 rounded-full ${buttonBg} ${buttonText} text-sm hover:opacity-80 transition-opacity flex items-center`}>
                <span className="mr-2">📢</span>
                Push Global Announcement
              </button>
              <button className={`w-full text-left px-3 py-2 rounded-full ${buttonBg} ${buttonText} text-sm hover:opacity-80 transition-opacity flex items-center`}>
                <span className="mr-2">🔧</span>
                Initiate Maintenance Mode
              </button>
              <button className={`w-full text-left px-3 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm hover:opacity-80 transition-opacity flex items-center`}>
                <span className="mr-2">🔒</span>
                Review Security Incidents
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Card */}
      <div className={`${cardBg} ${cardBorder} ${cardShadow} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Revenue & Subscription Overview</h3>
        <div className="flex justify-around mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${textPrimary}`}>{metrics.revenue?.mrr}</div>
            <div className={`text-xs ${textSecondary}`}>Total MRR</div>
            <div className="text-xs text-green-500">{metrics.revenue?.mrrTrend}</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${textPrimary}`}>{metrics.revenue?.arr}</div>
            <div className={`text-xs ${textSecondary}`}>Total ARR</div>
            <div className="text-xs text-green-500">{metrics.revenue?.arrTrend}</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${textPrimary}`}>{metrics.revenue?.avgLtv}</div>
            <div className={`text-xs ${textSecondary}`}>Avg. School LTV</div>
            <div className="text-xs text-green-500">{metrics.revenue?.ltvTrend}</div>
          </div>
        </div>
        <div className="h-24 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg flex items-end justify-center">
          <div className={`text-sm ${textSecondary}`}>📈 MRR Trend Chart</div>
        </div>
      </div>

      {/* User Engagement Card */}
      <div className={`${cardBg} ${cardBorder} ${cardShadow} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>User Engagement & Platform Activity</h3>
        <div className="text-center mb-4">
          <div className={`text-3xl font-bold ${textPrimary}`}>{metrics.users?.dailyActiveUsers}</div>
          <div className={`text-sm ${textSecondary}`}>Daily Active Users (Platform Wide)</div>
          <div className="text-sm text-green-500 flex items-center justify-center">
            <span className="mr-1">↗️</span>
            {metrics.users?.dauTrend}
          </div>
        </div>
        <div className="h-32 bg-gradient-to-t from-purple-100 to-transparent rounded-lg mb-4 flex items-end justify-around p-4">
          <div className="bg-purple-500 w-8 h-16 rounded-t"></div>
          <div className="bg-yellow-500 w-8 h-20 rounded-t"></div>
          <div className="bg-green-500 w-8 h-12 rounded-t"></div>
        </div>
        <div className="flex justify-around text-center">
          <div>
            <div className={`text-sm font-medium ${textPrimary}`}>{metrics.users?.avgSession}</div>
            <div className={`text-xs ${textSecondary}`}>Avg. Session</div>
          </div>
          <div>
            <div className={`text-sm font-medium ${textPrimary}`}>{metrics.users?.featureAdoption}</div>
            <div className={`text-xs ${textSecondary}`}>Feature Adoption</div>
          </div>
        </div>
      </div>

      {/* AI Models Card */}
      <div className={`${cardBg} ${cardBorder} ${cardShadow} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>AI Model Performance</h3>
        <div className={`flex items-center text-sm ${textAccent} mb-4`}>
          <span className="text-green-500 mr-2">✓</span>
          <span>All AI Systems: Operational</span>
        </div>
        <div className="space-y-3">
          {aiModels.slice(0, 3).map((model, index) => (
            <div key={index} className={`pb-3 border-b ${dividerColor} last:border-b-0`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className={`font-medium text-sm ${textPrimary}`}>{model.name}</div>
                  <div className={`text-xs ${textSecondary}`}>{model.version} • {model.accuracy}</div>
                  <div className={`text-xs ${textSecondary}`}>Updated {model.lastUpdate}</div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    model.status === 'Healthy' ? 'bg-green-100 text-green-800' : 
                    model.status === 'Monitoring' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {model.status}
                  </span>
                  <button className={`ml-2 text-xs ${accentColor} hover:underline`}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className={`w-full mt-4 px-4 py-2 rounded-lg ${buttonBg} ${accentColor} text-sm font-medium hover:opacity-80 transition-opacity`}>
          Manage All AI Models →
        </button>
      </div>

      {/* Deployments Card */}
      <div className={`${cardBg} ${cardBorder} ${cardShadow} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Recent Deployments & Platform Updates</h3>
        <div className="space-y-3">
          {deployments.slice(0, 3).map((deployment, index) => (
            <div key={index} className={`pb-3 border-b ${dividerColor} last:border-b-0`}>
              <div className={`text-xs font-semibold uppercase ${accentColor} mb-1`}>
                {deployment.type}
              </div>
              <div className={`font-medium text-sm ${textPrimary}`}>
                {deployment.version} • {deployment.date}
              </div>
              <div className={`text-xs ${textSecondary} mt-1`}>
                {deployment.description}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  deployment.status.includes('Success') ? 'bg-green-100 text-green-800' : 
                  deployment.status === 'Live' ? 'bg-blue-100 text-blue-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {deployment.status}
                </span>
                <span className={`text-xs ${textSecondary}`}>
                  {deployment.impactedSchools}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className={`text-sm ${accentColor} hover:underline mt-3`}>
          View Full Deployment History...
        </button>
      </div>

      {/* Support Card */}
      <div className={`${cardBg} ${cardBorder} ${cardShadow} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Support & School Partner SLAs</h3>
        <div className={`text-center p-4 ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-blue-50'} rounded-lg mb-4`}>
          <div className="flex items-center justify-center mb-2">
            <span className="text-green-500 mr-2">✓</span>
            <span className={`text-sm ${textAccent}`}>Overall SLA Compliance (Response Time)</span>
          </div>
          <div className={`text-2xl font-bold text-green-500`}>{metrics.support?.slaCompliance}</div>
          <div className={`text-xs ${textSecondary}`}>Target: &gt;98%</div>
        </div>
        <div className="flex justify-around text-center mb-4">
          <div>
            <div className={`text-xl font-semibold text-blue-500`}>{metrics.support?.newTickets24h}</div>
            <div className={`text-xs ${textSecondary}`}>New Tickets (24h)</div>
          </div>
          <div>
            <div className={`text-xl font-semibold text-red-500`}>{metrics.support?.openHighPriority}</div>
            <div className={`text-xs ${textSecondary}`}>Open High Priority</div>
          </div>
          <div>
            <div className={`text-xl font-semibold ${textPrimary}`}>{metrics.support?.avgResolutionTime}</div>
            <div className={`text-xs ${textSecondary}`}>Avg. Resolution Time</div>
          </div>
        </div>
        <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${accentColor} text-sm font-medium hover:opacity-80 transition-opacity flex items-center justify-center`}>
          <span className="mr-2">🎧</span>
          Access School Support Management Portal
        </button>
      </div>
    </div>
  );
}
