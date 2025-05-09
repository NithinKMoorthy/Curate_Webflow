'use client';
import React, { useState } from 'react';
import {
  Bell, Settings, User, Home, Bookmark, ChevronLeft, Plus,
  Check, ExternalLink, Info, X, AlertCircle
} from 'lucide-react';
import Link from 'next/link';


const DataSourcesConfiguration = () => {
  const [activeTab, setActiveTab] = useState('connected');
  const [showModal, setShowModal] = useState(false);
  const [currentSource, setCurrentSource] = useState(null);

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
            <Link href='/dashboard/protected-home'>   
              <ChevronLeft size={20} />
            </Link>
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

          {/* Connected Sources */}
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

          {/* Available Sources */}
          {activeTab === 'available' && (
            <div className="space-y-4">
              {availableSources.map((source) => (
                <div key={source.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <img src={source.icon} alt={source.name} className="w-10 h-10 rounded mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-base font-medium text-gray-900">{source.name}</h3>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
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

      {/* Bottom Navigation */}
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
