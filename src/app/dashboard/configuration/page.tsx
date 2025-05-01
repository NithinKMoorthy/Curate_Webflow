'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { Bell, Settings, User, Home, Bookmark, ChevronLeft, Plus, Check, ExternalLink, Info, X, AlertCircle } from 'lucide-react';

const DataSourcesConfiguration = () => {
  const [activeTab, setActiveTab] = useState('connected');
  
  const connectedSources = [
    { 
      id: 1, 
      name: 'Reddit', 
      icon: '/api/placeholder/40/40',
      status: 'connected',
      lastSync: '10 minutes ago',
      topics: ['r/technology', 'r/webdev', 'r/ProductManagement'],
      description: 'Pulls discussions from subreddits you follow and recommends similar content.'
    },
    { 
      id: 2, 
      name: 'X (Twitter)', 
      icon: '/api/placeholder/40/40',
      status: 'connected',
      lastSync: '25 minutes ago',
      topics: ['Tech', 'SaaS', 'Product'],
      description: 'Curates tweets, threads, and discussions from accounts and topics you follow.'
    },
    { 
      id: 3, 
      name: 'Medium', 
      icon: '/api/placeholder/40/40',
      status: 'issues',
      lastSync: '2 days ago',
      topics: ['UX Design', 'Productivity', 'Startups'],
      description: 'Summarizes articles from publications and writers you follow.'
    }
  ];
  
  const availableSources = [
    { 
      id: 4, 
      name: 'Podcasts', 
      icon: '/api/placeholder/40/40',
      description: 'Transcribes and summarizes episodes from your favorite podcasts.'
    },
    { 
      id: 5, 
      name: 'RSS Feeds', 
      icon: '/api/placeholder/40/40',
      description: 'Add any RSS feed to get summarized updates from blogs and news sites.'
    },
    { 
      id: 6, 
      name: 'YouTube', 
      icon: '/api/placeholder/40/40',
      description: 'Get summaries and key points from videos in your subscriptions.'
    },
    { 
      id: 7, 
      name: 'Slack', 
      icon: '/api/placeholder/40/40',
      description: 'Connect workspaces to get summaries of important discussions.'
    },
    { 
      id: 8, 
      name: 'Webpages', 
      icon: '/api/placeholder/40/40',
      description: 'Add any webpage URL to get a summarized version.'
    }
  ];
  
  const [showModal, setShowModal] = useState(false);
  const [currentSource, setCurrentSource] = useState(null);
  
  const openSourceModal = (source) => {
    setCurrentSource(source);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="mr-2 text-gray-500">
            <Link href='/dashboard/protected-home'> <ChevronLeft size={20} /> </Link>
          </button>
          <h1 className="text-lg font-medium text-gray-900">Data Sources</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto py-6 px-4">
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Configure Your Content Sources</h2>
            <p className="text-sm text-gray-600">
              Connect to your favorite platforms to receive personalized summaries of content that matters to you. 
              Curate will analyze your interests and create a customized feed.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                className={`py-2 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'connected'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('connected')}
              >
                Connected Sources ({connectedSources.length})
              </button>
              <button
                className={`py-2 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'available'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('available')}
              >
                Available Sources
              </button>
            </div>
          </div>
          
          {/* Connected sources list */}
          {activeTab === 'connected' && (
            <div className="space-y-4">
              {connectedSources.map((source) => (
                <div key={source.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <img src={source.icon} alt={source.name} className="w-10 h-10 rounded mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-base font-medium text-gray-900">{source.name}</h3>
                        <div className="flex items-center">
                          {source.status === 'connected' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <Check size={12} className="mr-1" />
                              Connected
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <AlertCircle size={12} className="mr-1" />
                              Issues
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {source.topics.map((topic, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Last synced: {source.lastSync}</span>
                        <button 
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                          onClick={() => openSourceModal(source)}
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Available sources list */}
          {activeTab === 'available' && (
            <div className="space-y-4">
              {availableSources.map((source) => (
                <div key={source.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <img src={source.icon} alt={source.name} className="w-10 h-10 rounded mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-base font-medium text-gray-900">{source.name}</h3>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <Plus size={12} className="mr-1" />
                          Connect
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{source.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Configuration Modal */}
      {showModal && currentSource && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Configure {currentSource.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal content */}
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Connection Status</h4>
                {currentSource.status === 'connected' ? (
                  <div className="flex items-center text-sm text-green-700">
                    <Check size={16} className="mr-1" />
                    <span>Connected - Last synced {currentSource.lastSync}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-yellow-700">
                    <AlertCircle size={16} className="mr-1" />
                    <span>Authentication issues - Please reconnect</span>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Topics and Interests</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {currentSource.topics && currentSource.topics.map((topic, index) => (
                    <div key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {topic}
                      <button className="ml-1 text-gray-500 hover:text-gray-700">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Plus size={12} className="mr-1" />
                    Add Topic
                  </button>
                </div>
                <p className="text-xs text-gray-500">Add topics to get more relevant content from this source.</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Content Preferences</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Summary length</label>
                    <select className="text-sm border border-gray-300 rounded-md">
                      <option>Short (2-3 min)</option>
                      <option>Medium (4-5 min)</option>
                      <option>Long (7-10 min)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Update frequency</label>
                    <select className="text-sm border border-gray-300 rounded-md">
                      <option>Real-time</option>
                      <option>Hourly</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="includeComments" className="mr-2" />
                    <label htmlFor="includeComments" className="text-sm text-gray-700">Include comments and discussions</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Advanced Options</h4>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Manage account connection</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-500" />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Content filters</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-500" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 text-red-600">Disconnect source</span>
                  </div>
                  <ExternalLink size={16} className="text-red-500" />
                </div>
              </div>
            </div>
            
            {/* Modal footer */}
            <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button 
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
        <button className="text-gray-500 hover:text-gray-700">
          <Home size={24} />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Bookmark size={24} />
        </button>
        <button className="text-indigo-600">
          <Settings size={24} />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <User size={24} />
        </button>
      </div>
    </div>
  );
};

export default DataSourcesConfiguration;