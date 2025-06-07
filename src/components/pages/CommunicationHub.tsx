import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface CommunicationHubProps {
  isDarkTheme: boolean;
}

export function CommunicationHub({ isDarkTheme }: CommunicationHubProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [messageText, setMessageText] = useState('');
  
  const conversations = useQuery(api.dashboard.getConversations) || [];
  const announcements = useQuery(api.dashboard.getAnnouncements) || [];
  const sendMessage = useMutation(api.dashboard.sendMessage);
  const createAnnouncement = useMutation(api.dashboard.createAnnouncement);
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const communicationStats = [
    { label: 'Active Conversations', value: conversations.length.toString(), trend: '+5 today' },
    { label: 'Unread Messages', value: '23', trend: '12 urgent' },
    { label: 'Announcements', value: announcements.length.toString(), trend: '2 this week' },
    { label: 'Response Rate', value: '94%', trend: '+2% vs last week' }
  ];

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;
    
    try {
      await sendMessage({
        conversationId: selectedConversation,
        content: messageText,
        type: 'text'
      });
      setMessageText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleCreateAnnouncement = async (announcementData: any) => {
    try {
      await createAnnouncement(announcementData);
      setShowAnnouncementModal(false);
    } catch (error) {
      console.error('Failed to create announcement:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Communication Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {communicationStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className="text-xs text-green-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Main Communication Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Conversations List */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Conversations</h3>
            <button 
              onClick={() => setShowComposeModal(true)}
              className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              New
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {conversations.map((conversation) => (
              <div 
                key={conversation._id}
                className={`p-3 rounded-lg cursor-pointer transition-opacity hover:opacity-80 ${
                  selectedConversation === conversation._id 
                    ? 'bg-purple-100 border border-purple-300' 
                    : `${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`
                }`}
                onClick={() => setSelectedConversation(conversation._id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${textPrimary} text-sm`}>{conversation.title}</h4>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <p className={`text-xs ${textSecondary} mb-1`}>{conversation.lastMessage}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${textSecondary}`}>{conversation.participants.length} participants</span>
                  <span className={`text-xs ${textSecondary}`}>{conversation.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className={`lg:col-span-2 ${cardBg} ${cardBorder} border rounded-xl p-6`}>
          {selectedConversation ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>
                  {conversations.find(c => c._id === selectedConversation)?.title}
                </h3>
                <div className="flex space-x-2">
                  <button className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}>
                    Archive
                  </button>
                  <button className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}>
                    Settings
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 space-y-4 mb-4 max-h-64 overflow-y-auto">
                {conversations.find(c => c._id === selectedConversation)?.messages?.map((message: any) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn 
                        ? 'bg-purple-600 text-white' 
                        : `${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-100'} ${textPrimary}`
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-75">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className={`flex-1 px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h4 className={`text-lg font-medium ${textPrimary} mb-2`}>Select a Conversation</h4>
                <p className={`text-sm ${textSecondary}`}>Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Announcements & Quick Actions */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Announcements</h3>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement._id} className={`p-3 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder}`}>
                <h4 className={`font-medium ${textPrimary} text-sm mb-1`}>{announcement.title}</h4>
                <p className={`text-xs ${textSecondary} mb-2`}>{announcement.content}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${textSecondary}`}>{announcement.date}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                    announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className={`font-medium ${textPrimary} mb-3`}>Quick Actions</h4>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Broadcast Message
            </button>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Schedule Meeting
            </button>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Send Survey
            </button>
            <button className={`w-full px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Create Poll
            </button>
          </div>
        </div>
      </div>

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>New Conversation</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Recipients</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Search users or groups..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Subject</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Conversation subject"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Message</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={4}
                  placeholder="Type your message..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowComposeModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowComposeModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-lg mx-4`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Create Announcement</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Title</label>
                <input 
                  type="text" 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Announcement title"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Content</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={4}
                  placeholder="Announcement content..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Priority</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Target Audience</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="all">All Users</option>
                    <option value="schools">Schools Only</option>
                    <option value="admins">Admins Only</option>
                    <option value="teachers">Teachers Only</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowAnnouncementModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleCreateAnnouncement({})}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
