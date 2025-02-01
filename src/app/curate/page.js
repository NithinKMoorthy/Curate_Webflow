"use client";
import { useState, useEffect } from "react";

export default function CuratePage() {
  const [query, setQuery] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [popularSubreddits, setPopularSubreddits] = useState([]);
  const [selected, setSelected] = useState([]);

  // Fetch Popular Subreddits from Reddit API
  useEffect(() => {
    async function fetchPopularSubreddits() {
      try {
        const res = await fetch("https://www.reddit.com/subreddits/popular.json?limit=10");
        const data = await res.json();
        setPopularSubreddits(data?.data?.children || []);
      } catch (error) {
        console.error("Error fetching popular subreddits:", error);
      }
    }
    fetchPopularSubreddits();
  }, []);

  // Fetch Subreddits based on Search Query
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(query)}&limit=10`
      );
      const data = await res.json();
      setSubreddits(data?.data?.children || []);
    } catch (error) {
      console.error("Error fetching subreddits:", error);
      setSubreddits([]);
    }
  }

  // Helper Function to Get Subreddit Image (Ensures Formatting)
  function getSubredditImage(subreddit) {
    let imageUrl = subreddit.data.icon_img || subreddit.data.community_icon || "/default-reddit-icon.png";

    if (imageUrl.startsWith("https://styles.redditmedia.com")) {
      imageUrl = `/api/image_proxy?url=${encodeURIComponent(imageUrl)}`;
    }

    return imageUrl;
  }

  // Add Subreddit to Selection
  function handleSelect(subreddit) {
    const { id, display_name, title } = subreddit.data;
    const imageUrl = getSubredditImage(subreddit);

    if (!selected.some((s) => s.id === id)) {
      setSelected((prev) => [...prev, { id, display_name, title, imageUrl }]);
    }
  }

  // Remove Subreddit from Selection
  function handleRemove(id) {
    setSelected((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Curate your home feed</h1>

        {/* Popular Subreddits */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Popular Subreddits</h2>
          <div className="flex flex-wrap gap-4">
            {popularSubreddits.map((sub) => {
              const { id, display_name } = sub.data;
              const imageUrl = getSubredditImage(sub);

              return (
                <div
                  key={id}
                  className="w-24 h-24 rounded-full bg-gray-200 relative cursor-pointer hover:bg-gray-300 flex items-center justify-center text-center"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleSelect(sub)}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white bg-black/50 rounded-full">
                    r/{display_name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex items-center mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subreddits..."
            className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-r-md hover:bg-purple-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Search Results */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Search Results</h2>
          {subreddits.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {subreddits.map((subreddit) => {
                const { id, display_name } = subreddit.data;
                const imageUrl = getSubredditImage(subreddit);

                return (
                  <div
                    key={id}
                    className="w-24 h-24 rounded-full bg-gray-200 relative cursor-pointer hover:bg-gray-300 flex items-center justify-center text-center"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleSelect(subreddit)}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white bg-black/50 rounded-full">
                      r/{display_name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No results found or not searched yet.</p>
          )}
        </div>

        {/* Selected Subreddits */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Selections</h2>
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {selected.map((item) => (
                <div
                  key={item.id}
                  className="w-24 h-24 rounded-full bg-gray-200 relative flex items-center justify-center text-center"
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white bg-black/50 rounded-full">
                    r/{item.display_name}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center transform translate-x-1/3 -translate-y-1/3"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No subreddits selected yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
