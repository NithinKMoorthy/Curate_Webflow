'use client'
import React, { useState } from 'react';
import { Bell, BookOpen, Search, Settings, Home, Bookmark, User, TrendingUp, Filter } from 'lucide-react';
import Link from 'next/link';

const ForYouPage = () => {
  const [activeTab, setActiveTab] = useState('forYou');

  const tabs = [
    { id: 'forYou', name: 'For You', icon: <Home size={20} /> },
    { id: 'trending', name: 'Trending', icon: <TrendingUp size={20} /> },
    { id: 'saved', name: 'Saved', icon: <Bookmark size={20} /> },
  ];

  const contentItems = [
    {
      id: 1,
      type: 'podcast',
      source: 'The Tech Perspective',
      title: 'The Future of AI in Content Curation',
      summary: 'This episode discusses how AI algorithms are revolutionizing content discovery and curation, making it easier for users to find relevant information in an increasingly crowded digital landscape.',
      timestamp: '12 min read',
      imageUrl: '/api/placeholder/60/60',
      engagement: '423 discussions'
    },
    {
      id: 2,
      type: 'reddit',
      source: 'r/ProductManagement',
      title: 'How do you prioritize features when user feedback is contradictory?',
      summary: 'A thread exploring different methodologies for feature prioritization when dealing with conflicting user feedback. Top comments emphasize the importance of data-driven decisions and clear product vision.',
      timestamp: '8 min read',
      imageUrl: '/api/placeholder/60/60',
      engagement: '156 comments'
    },
    {
      id: 3,
      type: 'tweet',
      source: 'X',
      title: 'Thread: Building a successful SaaS in 2025',
      summary: 'An insightful thread from a successful founder discussing the current state of SaaS development, covering topics like pricing strategies, customer acquisition, and retention tactics.',
      timestamp: '5 min read',
      imageUrl: '/api/placeholder/60/60',
      engagement: '2.4k likes'
    },
    {
      id: 4,
      type: 'article',
      source: 'Medium',
      title: 'Designing For Information Overload',
      summary: 'This article explores UX design principles that help users navigate and process large amounts of information without feeling overwhelmed, with practical examples from leading products.',
      timestamp: '15 min read',
      imageUrl: '/api/placeholder/60/60',
      engagement: '3.2k claps'
    }
  ];

  const topics = [
    'All Content', 
    'Technology', 
    'Design', 
    'SaaS', 
    'Product Management',
    'Marketing',
    'UX Research'
  ];

  const [activeTopic, setActiveTopic] = useState('All Content');


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-indigo-600">Curate</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
             <Link href='/dashboard/configuration'>  <Settings size={20} /> </Link> 
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <User size={20} />
            </button>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="relative w-full mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search for content..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* Source selection */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sources:</span>
          <button className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">All</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200">X</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200">Medium</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200">Reddit</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200">Podcasts</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200">RSS</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200">Webpages</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 flex items-center">
            <span>More</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center py-2 px-1 border-b-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topic chips */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-2">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activeTopic === topic
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Personalized Feed</h2>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <Filter size={16} className="mr-1" />
            <span>Filter</span>
          </button>
        </div>

        {/* Content cards */}
        <div className="space-y-4">
          {contentItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={item.imageUrl}
                    alt={item.source}
                    className="w-12 h-12 rounded object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <span className="font-medium">{item.source}</span>
                    <span className="mx-2">•</span>
                    <span>{item.type}</span>
                    <span className="mx-2">•</span>
                    <span>{item.timestamp}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{item.summary}</p>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800 mb-2 flex items-center">
                    View entire summary
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.engagement}</span>
                    <div className="flex space-x-3">
                      <button className="text-gray-500 hover:text-indigo-600">
                        <BookOpen size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-indigo-600">
                        <Bookmark size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
        <button className="text-indigo-600">
          <Home size={24} />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <TrendingUp size={24} />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Bookmark size={24} />
        </button>
        <a href="/api/auth/logout" className="text-gray-500 hover:text-gray-700">
          <User size={24} />
        </a>


      </div>
    </div>
  );
};

export default ForYouPage;