'use client';
import React, { useEffect, useState } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  BookOpen,
  BarChart2,
  BookMarked,
  Share2,
} from 'lucide-react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';

// 🔄 Skeleton Loader with blur effect
const SkeletonLoader = () => (
  <div className="p-6 font-sans bg-white animate-pulse space-y-6">
    <div className="flex items-center mb-2 space-x-3">
      <div className="h-4 w-32 bg-gray-200 rounded-full blur-sm" />
      <div className="h-4 w-16 bg-gray-200 rounded-full blur-sm" />
    </div>

    <div className="h-6 w-3/4 bg-gray-300 rounded-md blur-sm mb-4" />

    <div className="flex border-b mb-6">
      <div className="h-6 w-32 bg-gray-200 rounded blur-sm mr-4" />
      <div className="h-6 w-32 bg-gray-100 rounded blur-sm" />
    </div>

    <div className="bg-gray-100 rounded-lg p-6 mb-5 space-y-4">
      <div className="h-5 w-40 bg-gray-300 rounded blur-sm" />
      <div className="h-4 w-full bg-gray-200 rounded blur-sm" />
      <div className="h-4 w-5/6 bg-gray-200 rounded blur-sm" />
      <div className="h-4 w-2/3 bg-gray-200 rounded blur-sm" />
    </div>

    <div className="bg-gray-100 rounded-lg p-6 space-y-3">
      <div className="h-5 w-40 bg-gray-300 rounded blur-sm" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-20 bg-gray-200 rounded blur-sm" />
        <div className="h-20 bg-gray-200 rounded blur-sm" />
      </div>
    </div>
  </div>
);

// 🧠 Main Modal Component
const CurateArticleModal = ({ url }) => {
  const { user } = useUser();
  const [accessToken, setAccessToken] = useState(null);
  const [summaryObject, setSummaryObject] = useState(null);

  useEffect(() => {
    if (user) getAccessToken();
  }, [user]);

  useEffect(() => {
    if (accessToken && url) getSummary();
  }, [accessToken, url]);

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

  if (!summaryObject) {
    return <SkeletonLoader />;
  }

  return (
    <div className="p-6 font-sans bg-white transition-opacity duration-500 ease-in opacity-100">
      <div className="flex items-center mb-2">
        <div className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
          <span className="mr-1">●</span> {summaryObject?.source || 'Source'}
          <span className="mx-2">•</span>
          <span>{summaryObject?.contentType || 'Type'}</span>
        </div>
        <div className="ml-auto text-sm text-gray-500">Just now</div>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {summaryObject?.title || 'Curated Summary'}
      </h1>

      <div className="flex border-b mb-6">
        <span className="px-4 py-2 border-b-2 border-purple-600 text-purple-600 font-medium">
          Curated Summary
        </span>
        <a
          href={url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-gray-500 hover:text-purple-600"
        >
          Original Content
        </a>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-5">
        <div className="flex items-center mb-4">
          <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
        </div>
        <p className="text-gray-700 mb-3 whitespace-pre-wrap">
          {summaryObject?.summary || 'No summary found.'}
        </p>
      </div>

      {summaryObject?.topComments?.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mb-5">
          <div className="flex items-center mb-4">
            <MessageCircle className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Top Comments</h2>
          </div>
          {renderTopComments(summaryObject?.topComments)}
        </div>
      )}

      {summaryObject?.actionableInsights?.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mb-5">
          <div className="flex items-center mb-4">
            <BookMarked className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Actionable Insights</h2>
          </div>
          {renderInsights(summaryObject?.actionableInsights)}
        </div>
      )}

      {summaryObject?.stats && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Key Statistics</h2>
          </div>
          {renderStats(summaryObject?.stats)}
        </div>
      )}
    </div>
  );
};

export default CurateArticleModal;
