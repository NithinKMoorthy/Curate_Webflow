"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CuratePage() {
  const [query, setQuery] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [popularSubreddits, setPopularSubreddits] = useState([]);
  const [selected, setSelected] = useState([]);
  const [token, setToken] = useState(null);

  
  // ✅ Fetch Access Token on Component Mount
  useEffect(() => {
    async function fetchToken() {
      try {
        console.log("Fetching Access Token...");
        const response = await axios.get("/api/auth/token");
        console.log("Access Token Response:", response.data);
        setToken(response.data.accessToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
    fetchToken();
  }, []);

  // ✅ Fetch Popular Subreddits AFTER Token is Set
  useEffect(() => {
    console.log("TOKEN: ", token);
    if (!token) return; // Prevents API call if token isn't set yet

    async function fetchPopularSubreddits() {
      try {
        console.log("Fetching Popular Subreddits...");
        const response = await axios.get(`/api/discover?token=${token}`)
        console.log("Popular Subreddits Response:", response.data);
        setPopularSubreddits(response.data.popularSubreddits || []);
      } catch (error) {
        console.error("Error fetching popular subreddits:", error);
      }
    }

    fetchPopularSubreddits();
  }, [token]); // Runs only when `token` is set

  // ✅ Fetch Subreddits Based on Search Query
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(`/api/search?token=${token}&query=${query}`);
      console.log("Search Res.data: ", res.data); 
      setSubreddits(res.data.results || []);
    } catch (error) {
      console.error("Error fetching subreddits:", error);
      setSubreddits([]);
    }
  }

  // ✅ Get Subreddit Image for Circular Icons
  function getSubredditImage(subreddit) {
    let imageUrl =
      subreddit.data?.icon_img ||
      subreddit.data?.community_icon ||
      "/default-reddit-icon.png";

    return imageUrl;
  }

  // ✅ Add Subreddit to Selection
  function handleSelect(subreddit) {
    const { id, display_name } = subreddit.data;
    const imageUrl = getSubredditImage(subreddit);

    if (!selected.some((s) => s.id === id)) {
      setSelected((prev) => [...prev, { id, display_name, imageUrl }]);
    }
  }

  // ✅ Remove Subreddit from Selection
  function handleRemove(id) {
    setSelected((prev) => prev.filter((s) => s.id !== id));
  }


  return (
    <main className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Curate your home feed</h1>

        {/* ✅ Popular Subreddits (Circular Icons) */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Popular Subreddits</h2>
          <div className="flex flex-wrap gap-4">
            {popularSubreddits.map((sub) => {
              const { name} = sub;
              const imageUrl = sub.iconUrl || "/default-reddit-icon.png";

              return (
                <div
                  key={name}
                  className="w-20 h-20 rounded-full bg-gray-200 relative cursor-pointer hover:bg-gray-300 flex items-center justify-center text-center"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleSelect(sub)}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black/50 rounded-full">
                    r/{name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ Search Form */}
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

        {/* ✅ Search Results */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Search Results</h2>
          {subreddits.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {subreddits.map((subreddit) => {
                console.log("SUBBBBREDDITT: ", subreddit);
                const { name } = subreddit;
                const imageUrl = subreddit.iconUrl || "/default-reddit-icon.png";

                return (
                  <div
                    key={name}
                    className="w-20 h-20 rounded-full bg-gray-200 relative cursor-pointer hover:bg-gray-300 flex items-center justify-center text-center"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleSelect(subreddit)}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black/50 rounded-full">
                      r/{name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No results found or not searched yet.</p>
          )}
        </div>

        {/* ✅ Selected Subreddits */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Selections</h2>
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {selected.map((item) => (
                <div
                  key={item.id}
                  className="w-20 h-20 rounded-full bg-gray-200 relative flex items-center justify-center text-center"
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black/50 rounded-full">
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
