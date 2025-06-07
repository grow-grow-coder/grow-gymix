import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface AIModelManagementProps {
  isDarkTheme: boolean;
}

export function AIModelManagement({ isDarkTheme }: AIModelManagementProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('models');
  
  const models = useQuery(api.dashboard.getAIModels) || [];
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const modelStats = [
    { label: 'Active Models', value: '12', trend: '+2 this month' },
    { label: 'Training Jobs', value: '3', trend: '1 in progress' },
    { label: 'Avg Accuracy', value: '91.2%', trend: '+2.1% improvement' },
    { label: 'Total Predictions', value: '2.4M', trend: '+15% this week' }
  ];

  const defaultModels = [
    {
      _id: 'model1',
      name: 'Student Performance Predictor',
      type: 'Classification',
      version: '1.2.0',
      accuracy: '89.3%',
      status: 'Healthy' as const,
      lastUpdate: '2 days ago',
      description: 'Predicts student performance based on learning patterns',
      framework: 'TensorFlow',
      size: '245 MB',
      deployments: 15
    },
    {
      _id: 'model2',
      name: 'Content Recommendation Engine',
      type: 'Recommendation',
      version: '2.0.1',
      accuracy: '92.7%',
      status: 'Monitoring' as const,
      lastUpdate: '1 week ago',
      description: 'Recommends personalized learning content',
      framework: 'PyTorch',
      size: '512 MB',
      deployments: 23
    },
    {
      _id: 'model3',
      name: 'Automated Grading System',
      type: 'NLP',
      version: '1.5.2',
      accuracy: '94.1%',
      status: 'Healthy' as const,
      lastUpdate: '3 days ago',
      description: 'Automatically grades written assignments',
      framework: 'Transformers',
      size: '1.2 GB',
      deployments: 8
    },
    {
      _id: 'model4',
      name: 'Learning Path Optimizer',
      type: 'Optimization',
      version: '1.0.3',
      accuracy: '87.5%',
      status: 'Training' as const,
      lastUpdate: '5 hours ago',
      description: 'Optimizes learning paths for individual students',
      framework: 'Scikit-learn',
      size: '89 MB',
      deployments: 5
    }
  ];

  const allModels = [...models, ...defaultModels];

  const trainingJobs = [
    { id: '1', name: 'Performance Predictor v1.3', status: 'Running', progress: 67, eta: '2h 15m' },
    { id: '2', name: 'Content Recommender v2.1', status: 'Queued', progress: 0, eta: '4h 30m' },
    { id: '3', name: 'Grading System v1.6', status: 'Completed', progress: 100, eta: 'Done' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'Training': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Model Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {modelStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className="text-xs text-green-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Main Model Management Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Models List */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>AI Models</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowTrainingModal(true)}
                className={`px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
              >
                Train Model
              </button>
              <button 
                onClick={() => setShowDeployModal(true)}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Deploy Model
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {allModels.map((model) => (
              <div 
                key={model._id}
                className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity ${selectedModel === model._id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedModel(model._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className={`font-medium ${textPrimary} mr-3`}>{model.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ml-2 ${isDarkTheme ? 'bg-[#4A3A60] text-[#E0D8F0]' : 'bg-gray-200 text-gray-700'}`}>
                        v{model.version}
                      </span>
                    </div>
                    <p className={`text-sm ${textSecondary} mb-2`}>{model.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className={`${textSecondary}`}>Accuracy:</span>
                        <span className={`${textPrimary} font-medium ml-1`}>{model.accuracy}</span>
                      </div>
                      <div>
                        <span className={`${textSecondary}`}>Framework:</span>
                        <span className={`${textPrimary} font-medium ml-1`}>{model.framework}</span>
                      </div>
                      <div>
                        <span className={`${textSecondary}`}>Size:</span>
                        <span className={`${textPrimary} font-medium ml-1`}>{model.size}</span>
                      </div>
                      <div>
                        <span className={`${textSecondary}`}>Deployments:</span>
                        <span className={`${textPrimary} font-medium ml-1`}>{model.deployments}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}>
                      Monitor
                    </button>
                    <button className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs hover:opacity-80">
                      Deploy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Details & Training */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Training Jobs</h3>
            <button className={`px-3 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              View All
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            {trainingJobs.map((job) => (
              <div key={job.id} className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${textPrimary} text-sm`}>{job.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    job.status === 'Running' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="mb-2">
                  <div className={`w-full bg-gray-200 rounded-full h-2`}>
                    <div 
                      className={`h-2 rounded-full ${
                        job.status === 'Completed' ? 'bg-green-500' :
                        job.status === 'Running' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${textSecondary}`}>{job.progress}% complete</span>
                  <span className={`text-xs ${textSecondary}`}>ETA: {job.eta}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedModel && (
            <div>
              <h4 className={`font-medium ${textPrimary} mb-3`}>Model Details</h4>
              {(() => {
                const model = allModels.find(m => m._id === selectedModel);
                if (!model) return null;
                
                return (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-[#4A3A60]' : 'bg-gray-100'}`}>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className={`${textSecondary}`}>Type:</span>
                          <span className={`${textPrimary} font-medium ml-1`}>{model.type}</span>
                        </div>
                        <div>
                          <span className={`${textSecondary}`}>Version:</span>
                          <span className={`${textPrimary} font-medium ml-1`}>{model.version}</span>
                        </div>
                        <div>
                          <span className={`${textSecondary}`}>Updated:</span>
                          <span className={`${textPrimary} font-medium ml-1`}>{model.lastUpdate}</span>
                        </div>
                        <div>
                          <span className={`${textSecondary}`}>Status:</span>
                          <span className={`${textPrimary} font-medium ml-1`}>{model.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        View Metrics
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Download Model
                      </button>
                      <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
                        Clone Model
                      </button>
                      <button className="w-full px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
                        Delete Model
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Model Performance Dashboard */}
      <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
        <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Model Performance Dashboard</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className={`lg:col-span-2 h-64 rounded-lg border-2 border-dashed ${cardBorder} flex items-center justify-center`}>
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <h4 className={`text-lg font-medium ${textPrimary} mb-2`}>Performance Metrics</h4>
              <p className={`text-sm ${textSecondary}`}>Real-time model performance visualization</p>
            </div>
          </div>
          
          {/* Performance Stats */}
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
              <h4 className={`font-medium ${textPrimary} mb-3`}>Performance Metrics</h4>
              <div className="space-y-2">
                {[
                  { metric: 'Precision', value: '94.2%' },
                  { metric: 'Recall', value: '91.8%' },
                  { metric: 'F1-Score', value: '93.0%' },
                  { metric: 'Latency', value: '45ms' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm ${textSecondary}`}>{item.metric}:</span>
                    <span className={`text-sm ${textPrimary} font-medium`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
              <h4 className={`font-medium ${textPrimary} mb-3`}>Resource Usage</h4>
              <div className="space-y-2">
                {[
                  { resource: 'CPU', usage: '67%' },
                  { resource: 'Memory', usage: '45%' },
                  { resource: 'GPU', usage: '89%' },
                  { resource: 'Storage', usage: '23%' }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${textSecondary}`}>{item.resource}:</span>
                      <span className={`text-sm ${textPrimary} font-medium`}>{item.usage}</span>
                    </div>
                    <div className={`w-full bg-gray-200 rounded-full h-1`}>
                      <div 
                        className="bg-purple-600 h-1 rounded-full" 
                        style={{ width: item.usage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deploy Model Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Deploy AI Model</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Select Model</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  {allModels.map((model) => (
                    <option key={model._id} value={model._id}>{model.name} v{model.version}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Deployment Environment</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Instances</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    defaultValue="2"
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Auto-scaling</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Enable monitoring</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Auto-rollback on failure</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className={`text-sm ${textPrimary}`}>Blue-green deployment</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowDeployModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowDeployModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Training Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Train New Model</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Model Name</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="My Custom Model"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Model Type</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="classification">Classification</option>
                  <option value="regression">Regression</option>
                  <option value="nlp">Natural Language Processing</option>
                  <option value="recommendation">Recommendation</option>
                  <option value="clustering">Clustering</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Training Dataset</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="student_performance">Student Performance Dataset</option>
                  <option value="learning_patterns">Learning Patterns Dataset</option>
                  <option value="content_interactions">Content Interactions Dataset</option>
                  <option value="custom">Upload Custom Dataset</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Framework</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="tensorflow">TensorFlow</option>
                    <option value="pytorch">PyTorch</option>
                    <option value="sklearn">Scikit-learn</option>
                    <option value="xgboost">XGBoost</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Priority</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowTrainingModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowTrainingModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Start Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
