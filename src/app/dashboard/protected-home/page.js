"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import PostCard from "./PostCard"; // Ensure correct path

export default function Home() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newsFeed, setNewsfeed] = useState([]); // ✅ Initialize as an array

  // ✅ Fetch Access Token
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.get("/api/auth/token");
        setToken(response.data.accessToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
    fetchToken();
  }, []);

  // ✅ Fetch Newsfeed AFTER Token is Set
  useEffect(() => {
    if (!token) return;

    async function getNewsfeed() {
      setLoading(true);
      try {
        console.log("Fetching news feed...");
        const response = await axios.get(`/api/getNewsfeed?token=${token}`);

        console.log("Newsfeed response:", response.data);

        if (response.data.posts && Array.isArray(response.data.posts)) {
          setNewsfeed(response.data.posts); // ✅ Correctly setting newsFeed as an array
        } else {
          console.warn("Unexpected API response format:", response.data);
          setNewsfeed([]);
        }
      } catch (error) {
        console.error("Error fetching news feed:", error);
        setNewsfeed([]);
      } finally {
        setLoading(false);
      }
    }

    getNewsfeed();
  }, [token]);

  useEffect(() => {
    console.log("NewsFeed Updated:", JSON.stringify(newsFeed, null, 2));
  }, [newsFeed]);

  return (
    <div className="flex min-h-screen ">
      <div className="w-full  mx-auto space-y-6"> {/* ✅ Adjusted for correct width */}
        <h1 className="text-3xl font-bold mb-4">Your Newsfeed</h1>
  
        {loading ? (
          <p className="text-gray-500 text-center">Loading posts...</p>
        ) : newsFeed.length > 0 ? (
          newsFeed.map((newsFeedItem, index) => (
            <PostCard key={index} post={newsFeedItem.post} subreddit={newsFeedItem.subreddit} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
}  