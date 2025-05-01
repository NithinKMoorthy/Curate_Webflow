'use client';
import React, { useState } from 'react';
import { Bell, BookOpen, Search, Settings, Home, Bookmark, User, TrendingUp, Filter } from 'lucide-react';
import Link from 'next/link';

// ✅ Define types
interface Tab {
  id: string;
  name: string;
  icon: JSX.Element;
}

interface ContentItem {
  id: number;
  type: string;
  source: string;
  title: string;
  summary: string;
  timestamp: string;
  imageUrl: string;
  engagement: string;
}

const ForYouPage = () => {
  const [activeTab, setActiveTab] = useState<string>('forYou');
  const [activeTopic, setActiveTopic] = useState<string>('All Content');

  const tabs: Tab[] = [
    { id: 'forYou', name: 'For You', icon: <Home size={20} /> },
    { id: 'trending', name: 'Trending', icon: <TrendingUp size={20} /> },
    { id: 'saved', name: 'Saved', icon: <Bookmark size={20} /> },
  ];

  const contentItems: ContentItem[] = [
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

  const topics: string[] = [
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
      {/* JSX remains unchanged */}
    </div>
  );
};

export default ForYouPage;
