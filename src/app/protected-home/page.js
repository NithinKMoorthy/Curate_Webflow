"use client";

import Link from "next/link";
import axios from "axios";

export default function Home() {
  // Function to get Auth0 Access Token
  const getToken = async () => {
    console.log("GET TOKEN: ");
    try {
      const response = await axios.get("/api/auth/token");
      console.log("Access Token:", response.data);
      const token= response.data.accessToken;
      console.log("TOKEN: ", token);
      const second_response = await axios.get(`/api/discover?token=${encodeURIComponent(token)}`);
      console.log("Second Response: ", second_response);
    } catch (error) {
      console.error("Error fetching token:", error);
    }

  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-4">
          Welcome to Curate

        </h1>
        <button onClick={getToken}> Get Token </button> 
        <p className="max-w-xl text-lg md:text-xl lg:text-2xl mb-8">
          A modern platform for discovering and curating the best content.
        </p>
        
        {/* Authentication Links */}
        <Link
          href="/api/auth/login"
          className="px-6 py-3 text-lg font-semibold bg-pink-500 rounded-md hover:bg-pink-600 transition-colors"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-6">Why Curate?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Discover"
              description="Find content tailored just for you with our advanced recommendation engine."
              icon="🔍"
              href="/curate"
            />
            <FeatureCard
              title="Organize"
              description="Keep your favorite articles, videos, and posts all in one place."
              icon="📚"
            />
            <FeatureCard
              title="Collaborate"
              description="Share collections and collaborate with friends or teammates in real time."
              icon="🤝"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * FeatureCard - A reusable component that optionally wraps its content
 * in a <Link> if the `href` prop is provided.
 */
function FeatureCard({ title, description, icon, href }) {
  const content = (
    <>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow block"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {content}
    </div>
  );
}
