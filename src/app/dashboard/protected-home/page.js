'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {
  Bell, BookOpen, Search, Settings, Home,
  Bookmark, User, TrendingUp, Filter, X
} from 'lucide-react';
import Link from 'next/link';
import CurateArticleModal from './Modal';

// 🔲 Skeleton Loader for Cards
const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-4 animate-pulse space-y-3">
    <div className="flex">
      <div className="w-12 h-12 bg-gray-200 rounded mr-4 blur-[1px]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded blur-[0.5px]" />
        <div className="h-4 w-1/2 bg-gray-200 rounded blur-[0.5px]" />
        <div className="h-4 w-full bg-gray-200 rounded blur-[0.5px]" />
        <div className="h-4 w-5/6 bg-gray-200 rounded blur-[0.5px]" />
        <div className="h-4 w-1/3 bg-gray-200 rounded blur-[0.5px]" />
      </div>
    </div>
  </div>
);

const ForYouPage = () => {
  const [activeTab, setActiveTab] = useState('forYou');
  const [accessToken, setAccessToken] = useState(null);
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [selectedSources, setSelectedSources] = useState(['reddit']);
  const [activeTopic, setActiveTopic] = useState('All Content');
  const [contentItems, setContentItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    if (user) getAccessToken();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const getAccessToken = async () => {
    try {
      const res = await axios.get('/api/auth/token');
      const token = res.data.accessToken;
      setAccessToken(token);
      callDiscover(token);
    } catch (err) {
      console.error('Error fetching access token', err);
    }
  };

  const callDiscover = async (tokenOverride) => {
    const token = tokenOverride || accessToken;
    if (!token) return;

    const sourceParams = selectedSources
      .map(source => `sources=${encodeURIComponent(source)}`)
      .join('&');

    const url = `/api/search?token=${token}&query=${encodeURIComponent(search)}&${sourceParams}`;

    setIsLoadingResults(true);
    try {
      const response = await axios.get(url);
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
    } finally {
      setIsLoadingResults(false);
    }
  };

  const toggleSource = (source) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const debouncedSuggestions = useCallback(debounce(async (val) => {
    if (val.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`/api/searchSuggestions?query=${encodeURIComponent(val)}&sources=${selectedSources.join(',')}&token=${accessToken}`);
      setSuggestions(response.data.suggestions || []);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  }, 300), [selectedSources]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setShowSuggestions(true);
    debouncedSuggestions(val);
  };

  const openModal = (url) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalUrl(null);
    setIsModalOpen(false);
  };

  const allSources = ["All", "youtube", "reddit", "X", "Podcasts", "RSS", "Medium", "WebPages"];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-indigo-600">Curate</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <Link href='/dashboard/configuration' className="p-2 text-gray-500 hover:text-gray-700">
              <Settings size={20} />
            </Link>
            <a href="/api/auth/logout" className="text-gray-500 hover:text-gray-700">
              <User size={24} />
            </a>
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
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowSuggestions(false);
                callDiscover();
              }
            }}
            placeholder="Search for content..."
            className="w-full pl-10 pr-16 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={() => {
              setShowSuggestions(false);
              callDiscover();
            }}
            className="absolute right-1 top-1 bottom-1 px-3 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Go
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-200 rounded-md w-full mt-1 max-h-60 overflow-y-auto shadow">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSearch(s);
                    setShowSuggestions(false);
                    callDiscover();
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Source Filters */}
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

      {/* Results */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-4">
          {isLoadingResults
            ? Array.from({ length: 6 }).map((_, idx) => <CardSkeleton key={idx} />)
            : contentItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex">
                    <img src={item.imageUrl} alt={item.source} className="w-12 h-12 rounded object-cover mr-4" />
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
                      <button
                        onClick={() => openModal(item.url)}
                        className="text-xs text-indigo-600 font-medium hover:text-indigo-800 mb-2 flex items-center"
                      >
                        View entire summary
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
            <CurateArticleModal url={modalUrl} />
          </div>
        </div>
      )}

      {/* Bottom Nav */}
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
      </div>
    </div>
  );
};

export default ForYouPage;
