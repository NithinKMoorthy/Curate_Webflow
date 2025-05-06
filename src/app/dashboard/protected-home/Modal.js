'use client';
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, ThumbsUp, MessageCircle, BookOpen,
  BarChart2, BookMarked, Share2
} from 'lucide-react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';

const SummaryModal = ({ url, onClose }) => {
  const { user } = useUser();
  const [accessToken, setAccessToken] = useState(null);
  const [summary, setSummary] = useState(null);

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
      const response = await axios.get(`/api/getSummary?url=${url}&token=${accessToken}`);
      setSummary(response.data);
    } catch (err) {
      console.error("Summary fetch failed", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          ✕
        </button>
        <nav className="flex items-center mb-4">
          <ArrowLeft className="h-5 w-5 mr-2 text-gray-600" />
          <span className="text-gray-600">Summary</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Curated Summary</h1>
        <p className="text-sm text-gray-500 mb-4 break-all">
          Original URL: <a href={url} target="_blank" className="underline text-blue-600">{url}</a>
        </p>

        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold">Summary</h2>
            </div>
            <p className="text-gray-700">
              {summary?.text || 'Loading summary...'}
            </p>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold">Key Stats</h2>
            </div>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
