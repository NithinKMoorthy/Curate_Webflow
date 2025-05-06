'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import {
  Bell, BookOpen, Search, Settings, Home,
  Bookmark, User, TrendingUp, Filter
} from 'lucide-react';
import Link from 'next/link';

const ForYouPage = () => {
  const [activeTab, setActiveTab] = useState('forYou');
  const [accessToken, setAccessToken] = useState(null);
  const { user, isLoading } = useUser();
  const [search, setSearch] = useState('Exercise and Science');
  const [selectedSources, setSelectedSources] = useState(['reddit']);
  const [activeTopic, setActiveTopic] = useState('All Content');
  const [contentItems, setContentItems] = useState([]);

  const tabs = [
    { id: 'forYou', name: 'For You', Icon: Home },
    { id: 'trending', name: 'Trending', Icon: TrendingUp },
    { id: 'saved', name: 'Saved', Icon: Bookmark },
  ];

  const allSources = ["All", "youtube", "reddit", "X", "Podcasts", "RSS", "Medium", "WebPages"];

  useEffect(() => {
    if (user) getAccessToken();
  }, [user]);

  const getAccessToken = async () => {
    try {
      const res = await axios.get('/api/auth/token');
      const token = res.data.accessToken;
      console.log('Access Token Response', token);
      setAccessToken(token);
      callDiscover(token);
    } catch (err) {
      console.error('Error fetching access token', err);
    }
  };

  const toggleSource = (source) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const callDiscover = async (tokenOverride) => {
    console.log("CALL DISCOVER");
    const token = tokenOverride || accessToken;
    if (!token) return;

    const sourceParams = selectedSources
      .map(source => `sources=${encodeURIComponent(source)}`)
      .join('&');

    const url = `/api/search?token=${token}&query=${encodeURIComponent(search)}&${sourceParams}`;
    console.log("TOKEN: ", token);
    console.log("URL: ", url);
    try {
      const response = await axios.get(url);
      console.log("RESPONSE.DATA: ", response.data.results);
      const transformed = response.data.results.map(item => ({
        id: item.id,
        type: item.type,
        source: item.subreddit || item.author || item.creator || 'Unknown Source',
        title: item.title,
        summary: item.snippet || '',
        timestamp: new Date(item.publishDate).toLocaleDateString(),
        imageUrl: item.thumbnailUrl || '/default-reddit-icon.png',
        engagement: `${item.commentCount || 0} comments • ${item.upvotes || 0} upvotes`,
        url: item.url, 
      }));

      setContentItems(transformed);
    } catch (err) {
      console.error("Error in callDiscover:", err);
    }
  };

  const topics = [
    'All Content',
    'Technology',
    'Design',
    'SaaS',
    'Product Management',
    'Marketing',
    'UX Research'
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-indigo-600">Curate</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <Link href='/dashboard/configuration'>
              <Settings size={20} className="p-2 text-gray-500 hover:text-gray-700" />
            </Link>
            <User size={20} className="p-2 text-gray-500 hover:text-gray-700" />
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') callDiscover();
            }}
            placeholder="Search for content..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Source filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sources:</span>
          {allSources.map(src => (
            <button
              key={src}
              onClick={() => toggleSource(src)}
              className={`px-2 py-1 text-xs rounded-full ${
                selectedSources.includes(src)
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="flex space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex items-center py-2 px-1 border-b-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.Icon size={20} className="mr-2" />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-2">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activeTopic === topic
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Search Results</h2>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <Filter size={16} className="mr-1" />
            <span>Filter</span>
          </button>
        </div>

        <div className="space-y-4">
          {contentItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <img src={item.imageUrl} alt={item.source} className="w-12 h-12 rounded object-cover" />
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
                  <a
                    href={`/dashboard/summary?url=${encodeURIComponent(item.url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 font-medium hover:text-indigo-800 mb-2 flex items-center"
                  >
                    View entire summary
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
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

      {/* Bottom nav */}
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
