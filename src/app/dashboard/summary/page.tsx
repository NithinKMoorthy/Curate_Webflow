'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  BookOpen,
  BarChart2,
  BookMarked,
  Share2
} from 'lucide-react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';

const CurateArticlePage = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const { user } = useUser();
  const [accessToken, setAccessToken] = useState(null);
  const [summaryObject, setSummaryObject] = useState(null);

  useEffect(() => {
    if (user) getAccessToken();
  }, [user]);

  useEffect(() => {
    if (accessToken && url) getSummary();
  }, [accessToken]);

  const getAccessToken = async () => {
    try {
      const res = await axios.get('/api/auth/token');
      setAccessToken(res.data.accessToken);
    } catch (err) {
      console.error('Error fetching access token', err);
    }
  };

  const getSummary = async () => {
    try {
      const res = await axios.get(`/api/getSummary?url=${url}&token=${accessToken}`);
      setSummaryObject(res.data);
    } catch (err) {
      console.error('Error fetching summary', err);
    }
  };

  const renderStats = (stats) => (
    <div className="grid grid-cols-2 gap-4 text-sm">
      {stats && Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  );

  const renderTopComments = (comments) => (
    <div className="space-y-4">
      {(comments || []).map((c, idx) => (
        <div key={idx} className="border-b pb-3">
          <div className="flex items-center mb-2">
            <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold text-gray-700 mr-3">
              {c.userInitials || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{c.user || 'Anonymous'}</p>
            </div>
            <div className="ml-auto flex items-center text-sm text-gray-500">
              <ThumbsUp className="w-4 h-4 mr-1" /> {c.likes || 0}
            </div>
          </div>
          <p className="text-gray-700 text-sm">{c.comment}</p>
        </div>
      ))}
    </div>
  );

  const renderInsights = (insights) => (
    <ul className="space-y-2 text-gray-700 list-disc list-inside">
      {(insights || []).map((insight, idx) => (
        <li key={idx}>{insight.text}</li>
      ))}
    </ul>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <nav className="bg-white shadow-sm py-4 px-6 flex items-center">
        <a href="/dashboard/protected-home" className="flex items-center text-gray-600 mr-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Feed</span>
        </a>
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BookMarked className="h-5 w-5 text-purple-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center mb-2">
          <div className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
            <span className="mr-1">●</span> {summaryObject?.source || 'Source'}
            <span className="mx-2">•</span>
            <span>{summaryObject?.contentType || 'Type'}</span>
          </div>
          <div className="ml-auto text-sm text-gray-500">Added just now</div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">{summaryObject?.title || 'Curated Summary'}</h1>

        <div className="flex border-b mb-6">
          <button className="px-4 py-2 border-b-2 border-purple-600 text-purple-600 font-medium">Curated Summary</button>
          <a href={url || '#'} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-gray-500 hover:text-purple-600">Original Content</a>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-5">
          <div className="flex items-center mb-4">
            <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
          </div>
          <p className="text-gray-700 mb-3 whitespace-pre-wrap">{summaryObject?.summary || 'Loading summary...'}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-5">
          <div className="flex items-center mb-4">
            <MessageCircle className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Top Comments</h2>
          </div>
          {renderTopComments(summaryObject?.topComments)}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-5">
          <div className="flex items-center mb-4">
            <BookMarked className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Actionable Insights</h2>
          </div>
          {renderInsights(summaryObject?.actionableInsights)}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Key Statistics</h2>
          </div>
          {renderStats(summaryObject?.stats)}
        </div>
      </div>
    </div>
  );
};

export default CurateArticlePage;
