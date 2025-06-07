import React, { useState } from 'react';
import { useQuery, useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface AnalyticsReportingProps {
  isDarkTheme: boolean;
}

export function AnalyticsReporting({ isDarkTheme }: AnalyticsReportingProps) {
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState('line');
  
  const analyzeData = useAction(api.ai.analyzeData);
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';

  const analyticsMetrics = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'users', name: 'User Analytics', icon: '👥' },
    { id: 'schools', name: 'School Performance', icon: '🏫' },
    { id: 'modules', name: 'Module Usage', icon: '📚' },
    { id: 'revenue', name: 'Revenue Analytics', icon: '💰' },
    { id: 'engagement', name: 'Engagement Metrics', icon: '📈' }
  ];

  const keyMetrics = [
    { label: 'Total Users', value: '126,847', change: '+12.5%', trend: 'up' },
    { label: 'Active Schools', value: '2,847', change: '+8.3%', trend: 'up' },
    { label: 'Monthly Revenue', value: '$1.83M', change: '+15.2%', trend: 'up' },
    { label: 'Avg Session Time', value: '24m 32s', change: '+3.1%', trend: 'up' },
    { label: 'Module Adoption', value: '89.2%', change: '+5.7%', trend: 'up' },
    { label: 'Support Tickets', value: '234', change: '-18.4%', trend: 'down' }
  ];

  const chartData = {
    overview: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { name: 'Users', data: [12000, 15000, 18000, 22000, 25000, 28000] },
        { name: 'Revenue', data: [150000, 180000, 220000, 280000, 320000, 380000] }
      ]
    },
    users: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { name: 'New Users', data: [1200, 1500, 1800, 2200] },
        { name: 'Active Users', data: [8500, 9200, 9800, 10500] }
      ]
    }
  };

  const handleAnalyzeData = async (dataType: string) => {
    try {
      const sampleData = JSON.stringify(chartData[selectedMetric as keyof typeof chartData] || chartData.overview);
      await analyzeData({
        data: sampleData,
        analysisType: dataType
      });
    } catch (error) {
      console.error('Failed to analyze data:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>Analytics & Reporting</h2>
          <p className={`text-sm ${textSecondary} mt-1`}>Comprehensive insights and data analysis</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={`px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm border ${cardBorder} focus:ring-2 focus:ring-purple-500`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button 
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {keyMetrics.map((metric, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${textPrimary} mb-1`}>{metric.value}</div>
            <div className={`text-sm ${textPrimary} mb-2`}>{metric.label}</div>
            <div className={`text-xs flex items-center ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              <span className="mr-1">{metric.trend === 'up' ? '↗' : '↘'}</span>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Metrics Sidebar */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Analytics Categories</h3>
          <div className="space-y-2">
            {analyticsMetrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedMetric === metric.id 
                    ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                    : `${buttonBg} ${buttonText} hover:opacity-80`
                }`}
              >
                <span className="text-lg mr-3">{metric.icon}</span>
                <span className="font-medium">{metric.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chart Area */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>
              {analyticsMetrics.find(m => m.id === selectedMetric)?.name || 'Overview'}
            </h3>
            <div className="flex space-x-2">
              {['line', 'bar', 'pie'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedChart(type)}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedChart === type 
                      ? 'bg-purple-600 text-white' 
                      : `${buttonBg} ${buttonText}`
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className={`h-80 rounded-lg border-2 border-dashed ${cardBorder} flex items-center justify-center`}>
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h4 className={`text-lg font-medium ${textPrimary} mb-2`}>Interactive Chart</h4>
              <p className={`text-sm ${textSecondary} mb-4`}>
                {selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} chart for {analyticsMetrics.find(m => m.id === selectedMetric)?.name}
              </p>
              <button 
                onClick={() => handleAnalyzeData(selectedMetric)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Analyze with AI
              </button>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>AI Insights</h3>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-blue-50'} border ${cardBorder}`}>
              <h4 className={`font-medium ${textPrimary} mb-2`}>📈 Trend Analysis</h4>
              <p className={`text-sm ${textSecondary}`}>
                User engagement has increased by 15% this month, with peak activity during weekday afternoons.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-green-50'} border ${cardBorder}`}>
              <h4 className={`font-medium ${textPrimary} mb-2`}>💡 Recommendation</h4>
              <p className={`text-sm ${textSecondary}`}>
                Consider expanding module offerings in mathematics, as it shows the highest adoption rate.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-yellow-50'} border ${cardBorder}`}>
              <h4 className={`font-medium ${textPrimary} mb-2`}>⚠️ Alert</h4>
              <p className={`text-sm ${textSecondary}`}>
                Support ticket volume has decreased, indicating improved user experience.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Generate Report
            </button>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Schedule Analysis
            </button>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Set Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Schools */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Top Performing Schools</h3>
          <div className="space-y-3">
            {[
              { name: 'Riverside Elementary', score: 94, students: 450, growth: '+12%' },
              { name: 'Metro High School', score: 91, students: 1200, growth: '+8%' },
              { name: 'Oakwood Academy', score: 89, students: 680, growth: '+15%' },
              { name: 'Central University', score: 87, students: 2100, growth: '+6%' }
            ].map((school, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'}`}>
                <div>
                  <h4 className={`font-medium ${textPrimary}`}>{school.name}</h4>
                  <p className={`text-sm ${textSecondary}`}>{school.students} students</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${textPrimary}`}>{school.score}%</div>
                  <div className="text-sm text-green-500">{school.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Usage Statistics */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Module Usage Statistics</h3>
          <div className="space-y-3">
            {[
              { name: 'AI Study Planner', usage: 89, schools: 67, trend: '+5%' },
              { name: 'Smart Gradebook', usage: 76, schools: 89, trend: '+12%' },
              { name: 'Content Creator', usage: 68, schools: 45, trend: '+8%' },
              { name: 'Analytics Dashboard', usage: 54, schools: 34, trend: '+15%' }
            ].map((module, index) => (
              <div key={index} className={`p-3 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${textPrimary}`}>{module.name}</h4>
                  <span className="text-sm text-green-500">{module.trend}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`w-full bg-gray-200 rounded-full h-2 mr-3`}>
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${module.usage}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm ${textSecondary} whitespace-nowrap`}>
                    {module.schools} schools
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Export Analytics Report</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Report Type</label>
                <select className={`w-full px-3 py-2 rounded-lg ${buttonBg} ${cardBorder} border ${textPrimary} text-sm`}>
                  <option value="overview">Overview Report</option>
                  <option value="detailed">Detailed Analytics</option>
                  <option value="custom">Custom Report</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {['PDF', 'Excel', 'CSV'].map((format) => (
                    <button key={format} className={`px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm hover:opacity-80`}>
                      {format}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Include</label>
                <div className="space-y-2">
                  {['Charts & Graphs', 'Raw Data', 'AI Insights', 'Recommendations'].map((item) => (
                    <label key={item} className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className={`text-sm ${textPrimary}`}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowExportModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
