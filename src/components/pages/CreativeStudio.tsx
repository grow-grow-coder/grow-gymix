import React, { useState, useRef, useCallback } from 'react';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface CreativeStudioProps {
  isDarkTheme: boolean;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  type: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
  collaborators: string[];
  tags: string[];
  thumbnail?: string;
}

export function CreativeStudio({ isDarkTheme }: CreativeStudioProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAIAssistantModal, setShowAIAssistantModal] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentEditor, setCurrentEditor] = useState<string>('visual');
  const [editorContent, setEditorContent] = useState<string>('');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const projects = useQuery(api.dashboard.getCreativeProjects) || [];
  const templates = useQuery(api.dashboard.getCreativeTemplates) || [];
  const createProject = useMutation(api.dashboard.createCreativeProject);
  const generateContent = useAction(api.ai.generateCreativeContent);
  
  const cardBg = isDarkTheme ? 'bg-[#2C203E]' : 'bg-white';
  const cardBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-200';
  const textPrimary = isDarkTheme ? 'text-[#F8F9FA]' : 'text-[#212529]';
  const textSecondary = isDarkTheme ? 'text-[#A092B8]' : 'text-[#868E96]';
  const buttonBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-[#F1F3F5]';
  const buttonText = isDarkTheme ? 'text-[#E0D8F0]' : 'text-[#495057]';
  const inputBg = isDarkTheme ? 'bg-[#3D2E52]' : 'bg-white';
  const inputBorder = isDarkTheme ? 'border-[#4A3A60]' : 'border-gray-300';

  const creativeStats = [
    { label: 'Active Projects', value: projects.length.toString(), trend: '+3 this week' },
    { label: 'Templates', value: templates.length.toString(), trend: '12 available' },
    { label: 'AI Generations', value: '1,247', trend: '+89 today' },
    { label: 'Collaborators', value: '23', trend: '5 online now' }
  ];

  const projectTypes = [
    { id: 'curriculum', name: 'Curriculum Design', icon: '📚', description: 'Create educational content and lesson plans' },
    { id: 'assessment', name: 'Assessment Builder', icon: '📝', description: 'Design quizzes, tests, and evaluations' },
    { id: 'presentation', name: 'Presentation Studio', icon: '🎨', description: 'Create engaging presentations and slides' },
    { id: 'interactive', name: 'Interactive Content', icon: '🎮', description: 'Build interactive learning experiences' },
    { id: 'video', name: 'Video Production', icon: '🎬', description: 'Create and edit educational videos' },
    { id: 'infographic', name: 'Infographics', icon: '📊', description: 'Design visual data representations' }
  ];

  const aiTools = [
    { id: 'content_generator', name: 'Content Generator', description: 'Generate educational content with AI' },
    { id: 'image_creator', name: 'Image Creator', description: 'Create custom images and illustrations' },
    { id: 'quiz_builder', name: 'Quiz Builder', description: 'Auto-generate quizzes from content' },
    { id: 'lesson_planner', name: 'Lesson Planner', description: 'AI-powered lesson plan creation' },
    { id: 'style_transfer', name: 'Style Transfer', description: 'Apply artistic styles to content' },
    { id: 'voice_synthesis', name: 'Voice Synthesis', description: 'Generate narration and audio' }
  ];

  const handleCreateProject = async (projectData: any) => {
    try {
      await createProject(projectData);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleGenerateContent = async (prompt: string, type: string) => {
    try {
      setIsGenerating(true);
      const result = await generateContent({ prompt, type });
      setEditorContent(result?.content || '');
      return result;
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setEditorContent(content);
      };
      reader.readAsText(file);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Creative Studio Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {creativeStats.map((stat, index) => (
          <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
            <div className={`text-3xl font-bold ${textPrimary} mb-2`}>{stat.value}</div>
            <div className={`text-sm font-medium ${textPrimary} mb-1`}>{stat.label}</div>
            <div className="text-xs text-green-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className={`${cardBg} ${cardBorder} border rounded-xl p-4 mb-6`}>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm`}
          />
          <button
            onClick={() => setShowAIAssistantModal(true)}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
          >
            AI Assistant
          </button>
        </div>
      </div>

      {/* Main Studio Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Types & Tools */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Create New</h3>
            <button 
              onClick={() => setShowTemplateModal(true)}
              className={`px-3 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
            >
              Templates
            </button>
          </div>
          
          <div className="space-y-3">
            {projectTypes.map((type) => (
              <div 
                key={type.id}
                className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={() => {
                  setSelectedProject(type.id);
                  setShowCreateModal(true);
                }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{type.icon}</span>
                  <h4 className={`font-medium ${textPrimary}`}>{type.name}</h4>
                </div>
                <p className={`text-sm ${textSecondary}`}>{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent Projects</h3>
            <div className="flex space-x-1">
              {['projects', 'drafts', 'shared'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-purple-600 text-white' 
                      : `${buttonBg} ${buttonText} hover:opacity-80`
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {projects.map((project) => (
              <div 
                key={project._id}
                className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${textPrimary} mb-1`}>{project.title}</h4>
                    <p className={`text-sm ${textSecondary} mb-2`}>{project.description}</p>
                    <div className={`text-xs ${textSecondary}`}>
                      {project.type} • Updated {project.lastModified}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`px-3 py-1 rounded ${buttonBg} ${buttonText} text-xs hover:opacity-80`}>
                      Edit
                    </button>
                    <button className="px-3 py-1 rounded bg-purple-100 text-purple-800 text-xs hover:opacity-80">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Creative Tools */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>AI Creative Tools</h3>
          <div className="space-y-3">
            {aiTools.map((tool) => (
              <div 
                key={tool.id}
                className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={() => handleGenerateContent('', tool.id)}
              >
                <h4 className={`font-medium ${textPrimary} mb-1`}>{tool.name}</h4>
                <p className={`text-sm ${textSecondary}`}>{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas/Editor Area */}
      <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${textPrimary}`}>Creative Canvas</h3>
          <div className="flex space-x-2">
            <button className={`px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}>
              Save Draft
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
              Publish
            </button>
          </div>
        </div>
        
        {/* Canvas Placeholder */}
        <div className={`h-96 rounded-lg border-2 border-dashed ${cardBorder} flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h4 className={`text-lg font-medium ${textPrimary} mb-2`}>Start Creating</h4>
            <p className={`text-sm ${textSecondary} mb-4`}>Select a project type or template to begin</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Create New Project
            </button>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Create New Project</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Project Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="My Creative Project"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Project Type</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    {projectTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Description</label>
                <textarea 
                  className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  rows={3}
                  placeholder="Describe your project..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Target Audience</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="elementary">Elementary (K-5)</option>
                    <option value="middle">Middle School (6-8)</option>
                    <option value="high">High School (9-12)</option>
                    <option value="college">College/University</option>
                    <option value="adult">Adult Education</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Subject Area</label>
                  <select className={`w-full px-3 py-2 rounded-lg ${inputBg} ${inputBorder} border ${textPrimary} text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent`}>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English/Language Arts</option>
                    <option value="history">History/Social Studies</option>
                    <option value="art">Arts</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Collaboration Settings</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className={`text-sm ${textPrimary}`}>Allow team collaboration</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className={`text-sm ${textPrimary}`}>Enable AI assistance</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className={`text-sm ${textPrimary}`}>Auto-save changes</span>
                  </label>
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
                  onClick={() => handleCreateProject({})}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Gallery Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Template Gallery</h3>
            <div className="grid grid-cols-3 gap-4">
              {templates.map((template) => (
                <div 
                  key={template._id}
                  className={`p-4 rounded-lg ${isDarkTheme ? 'bg-[#3D2E52]' : 'bg-gray-50'} border ${cardBorder} cursor-pointer hover:opacity-80 transition-opacity ${selectedTemplate === template._id ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={() => setSelectedTemplate(template._id)}
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg mb-3"></div>
                  <h4 className={`font-medium ${textPrimary} mb-1`}>{template.name}</h4>
                  <p className={`text-sm ${textSecondary} mb-2`}>{template.description}</p>
                  <div className={`text-xs ${textSecondary}`}>
                    {template.category} • {template.downloads} downloads
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-3 pt-6">
              <button 
                onClick={() => setShowTemplateModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg ${buttonBg} ${buttonText} text-sm font-medium hover:opacity-80 transition-opacity`}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowTemplateModal(false);
                  setShowCreateModal(true);
                }}
                disabled={!selectedTemplate}
                className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                Use Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
