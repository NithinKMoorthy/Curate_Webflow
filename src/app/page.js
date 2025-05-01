'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { ArrowRight, LogIn, LogOut } from 'lucide-react';

export default function LandingPage() {
  const { user, isLoading } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Header */}
      <header className="px-6 py-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-indigo-600">Curate</h1>
        {!isLoading && (
          <div>
            {user ? (
              <a
                href="/api/auth/logout"
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <LogOut size={18} className="mr-1" />
                Log out
              </a>
            ) : (
              <a
                href="/api/auth/login"
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <LogIn size={18} className="mr-1" />
                Log in
              </a>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <div className="flex justify-center mb-6">
          <img
            src="/logo.jpeg"
            alt="Curate logo"
            width={200}
            height={200}
            className="rounded-xl shadow-sm border border-gray-200"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Simplify Your Content Life
        </h2>
        <p className="text-lg text-gray-600 max-w-md mb-6">
          Curate helps you discover and summarize the most important insights from podcasts, articles, Reddit, and more — all in one feed.
        </p>

        {user ? (
          <Link href="/onboarding" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition">
            Go to Dashboard
            <ArrowRight size={18} className="ml-2" />
          </Link>
        ) : (
          <a
            href="/api/auth/login"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
          >
            Get Started
            <ArrowRight size={18} className="ml-2" />
          </a>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-sm text-gray-400 bg-white border-t">
        &copy; {new Date().getFullYear()} Curate. All rights reserved.
      </footer>
    </div>
  );
}
