'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Bell, Settings, User, Home, Bookmark, ChevronLeft, Plus,
  Check, ExternalLink, Info, X, AlertCircle
} from 'lucide-react';

// ✅ Define types
interface ConnectedSource {
  id: number;
  name: string;
  icon: string;
  status: 'connected' | 'issues';
  lastSync: string;
  topics: string[];
  description: string;
}

interface AvailableSource {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const DataSourcesConfiguration = () => {
  const [activeTab, setActiveTab] = useState<'connected' | 'available'>('connected');
  const [showModal, setShowModal] = useState(false);
  const [currentSource, setCurrentSource] = useState<ConnectedSource | null>(null);
  console.log("HELLO: ");
  const connectedSources: ConnectedSource[] = [
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

  const availableSources: AvailableSource[] = [
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

  const openSourceModal = (source: ConnectedSource) => {
    setCurrentSource(source);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* All original JSX unchanged */}
    </div>
  );
};

export default DataSourcesConfiguration;
