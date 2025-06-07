import React, { useState } from 'react';
import { useAction, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface AIAssistantProps {
  isDarkTheme: boolean;
}

export function AIAssistant({ isDarkTheme }: AIAssistantProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState('general');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const conversations = useQuery(api.dashboard.getAIConversations) || [];
  const assistants = useQuery(api.dashboard.getAIAssistants) || [];
  const sendAIMessage = useAction(api.ai.sendMessage);
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const aiStats = [
    { label: 'Total Queries', value: '12,847', trend: '+234 today' },
    { label: 'Active Assistants', value: '8', trend: '2 specialized' },
    { label: 'Response Time', value: '1.2s', trend: '-0.3s improvement' },
    { label: 'Satisfaction', value: '94%', trend: '+2% this week' }
  ];

  const defaultAssistants = [
    {
      _id: 'general',
      name: 'General Assistant',
      description: 'General purpose AI assistant for various tasks',
      model: 'gpt-4.1-nano',
      capabilities: ['Q&A', 'Writing', 'Analysis', 'Planning'],
      active: true
    },
    {
      _id: 'curriculum',
      name: 'Curriculum Designer',
      description: 'Specialized in educational content and curriculum design',
      model: 'gpt-4o-mini',
      capabilities: ['Lesson Planning', 'Content Creation', 'Assessment Design'],
      active: true
    },
    {
      _id: 'analytics',
      name: 'Data Analyst',
      description: 'Analyzes educational data and provides insights',
      model: 'gpt-4.1-nano',
      capabilities: ['Data Analysis', 'Report Generation', 'Trend Analysis'],
      active: true
    },
    {
      _id: 'support',
      name: 'Support Assistant',
      description: 'Helps with technical support and troubleshooting',
      model: 'gpt-4o-mini',
      capabilities: ['Troubleshooting', 'Documentation', 'User Guidance'],
      active: true
    }
  ];

  const allAssistants = [...assistants, ...defaultAssistants];

  const sampleConversation = [
    {
      id: '1',
      role: 'user',
      content: 'Can you help me create a lesson plan for 5th grade mathematics?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      role: 'assistant',
      content: 'I\'d be happy to help you create a 5th grade mathematics lesson plan! Let me suggest a structure for a lesson on fractions. Here\'s a comprehensive plan:\n\n**Lesson Topic: Introduction to Fractions**\n\n**Objectives:**\n- Students will understand what fractions represent\n- Students will identify numerator and denominator\n- Students will relate fractions to real-world examples\n\n**Materials Needed:**\n- Fraction circles or pie charts\n- Pizza/cake models\n- Worksheets\n- Interactive whiteboard\n\nWould you like me to elaborate on any specific section or adjust this for a different math topic?',
      timestamp: '10:31 AM'
    }
  ];

  const quickPrompts = [
    'Create a lesson plan for...',
    'Analyze student performance data',
    'Generate quiz questions for...',
    'Explain a complex concept simply',
    'Create a project rubric',
    'Suggest classroom activities'
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    try {
      await sendAIMessage({
        message,
        assistantId: selectedAssistant,
        context: 'admin_dashboard'
      });
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {aiStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className="text-xs text-green-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Main AI Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Assistant Selection */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>AI Assistants</h3>
            <button 
              onClick={() => setShowSettingsModal(true)}
              className={`px-3 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
            >
              Settings
            </button>
          </div>
          
          <div className="space-y-3">
            {allAssistants.map((assistant) => (
              <div 
                key={assistant._id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedAssistant === assistant._id 
                    ? 'bg-purple-100 border border-purple-300 dark:bg-purple-900/30' 
                    : `${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} hover:opacity-80`
                }`}
                onClick={() => setSelectedAssistant(assistant._id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${textPrimary} text-sm`}>{assistant.name}</h4>
                  {assistant.active && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <p className={`text-xs ${textSecondary} mb-2`}>{assistant.description}</p>
                <div className="flex flex-wrap gap-1">
                  {assistant.capabilities.slice(0, 2).map((capability, index) => (
                    <span key={index} className={`px-2 py-1 rounded text-xs ${isDarkTheme ? 'bg-[#4A3A60] text-[#E0D8F0]' : 'bg-gray-200 text-gray-700'}`}>
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>
              {allAssistants.find(a => a._id === selectedAssistant)?.name || 'AI Assistant'}
            </h3>
            <div className="flex space-x-2">
              <button className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}>
                Clear Chat
              </button>
              <button className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}>
                Export
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {sampleConversation.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : `${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-100'} ${textPrimary}`
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-100'}`}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Message Input */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className={`flex-1 px-4 py-3 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
                className="px-6 py-3 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
            
            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(prompt)}
                  className={`px-3 py-1 rounded-full text-xs ${buttonBg} ${buttonText} hover:opacity-80 transition-opacity`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Tools & Analytics */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>AI Tools</h3>
          
          <div className="space-y-4 mb-6">
            <button className={`w-full px-4 py-3 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity text-left`}>
              <div className="flex items-center">
                <span className="text-lg mr-3">📝</span>
                <div>
                  <div className={`font-medium ${textPrimary}`}>Content Generator</div>
                  <div className={`text-xs ${textSecondary}`}>Create educational content</div>
                </div>
              </div>
            </button>
            
            <button className={`w-full px-4 py-3 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity text-left`}>
              <div className="flex items-center">
                <span className="text-lg mr-3">📊</span>
                <div>
                  <div className={`font-medium ${textPrimary}`}>Data Analyzer</div>
                  <div className={`text-xs ${textSecondary}`}>Analyze performance data</div>
                </div>
              </div>
            </button>
            
            <button className={`w-full px-4 py-3 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity text-left`}>
              <div className="flex items-center">
                <span className="text-lg mr-3">🎯</span>
                <div>
                  <div className={`font-medium ${textPrimary}`}>Quiz Generator</div>
                  <div className={`text-xs ${textSecondary}`}>Auto-generate assessments</div>
                </div>
              </div>
            </button>
            
            <button className={`w-full px-4 py-3 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity text-left`}>
              <div className="flex items-center">
                <span className="text-lg mr-3">🔍</span>
                <div>
                  <div className={`font-medium ${textPrimary}`}>Research Assistant</div>
                  <div className={`text-xs ${textSecondary}`}>Find relevant resources</div>
                </div>
              </div>
            </button>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
            <h4 className={`font-medium ${textPrimary} mb-3`}>Usage Today</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${textSecondary}`}>Queries</span>
                <span className={`text-sm ${textPrimary} font-medium`}>234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${textSecondary}`}>Tokens Used</span>
                <span className={`text-sm ${textPrimary} font-medium`}>45.2K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${textSecondary}`}>Avg Response</span>
                <span className={`text-sm ${textPrimary} font-medium`}>1.2s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>AI Assistant Settings</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Default Model</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="gpt-4.1-nano">GPT-4.1 Nano</option>
                  <option value="gpt-4o-mini">GPT-4o Mini</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Response Style</label>
                <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="detailed">Detailed</option>
                  <option value="concise">Concise</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Max Response Length</label>
                <input 
                  type="number" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Enable conversation memory</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className={`text-sm ${textPrimary}`}>Auto-save conversations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className={`text-sm ${textPrimary}`}>Enable voice responses</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
