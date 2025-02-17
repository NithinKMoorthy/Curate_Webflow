"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CuratePage() {
  const [query, setQuery] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [popularSubreddits, setPopularSubreddits] = useState([]);
  const [selected, setSelected] = useState([]);
  const [token, setToken] = useState(null);

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

  useEffect(() => {
    if (!token) return;

    async function fetchPopularSubreddits() {
      try {
        const response = await axios.get(`/api/discover?token=${token}`);
        console.log("POPULAR SUBREDDITS: ", response.data);
        setPopularSubreddits(response.data.popularSubreddits || []);
      } catch (error) {
        console.error("Error fetching popular subreddits:", error);
      }
    }
    fetchPopularSubreddits();
    fetchPreferences();
  }, [token]);

  async function fetchPreferences() {
    if (!token) return;
    try {
      const response = await axios.get(`/api/getPreferences?token=${token}`);
      console.log("Fetched Preferences:", response.data.preferences);
      let preferences = response.data.preferences?.filter((p) => p?.id) ;
      console.log("PREFERENCES: ", preferences);
      setSelected(response.data.preferences);
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  }

  useEffect(() => {
    if (!token || selected.length === 0) return;

    async function savePreferences() {
      console.log("Saving preferences ", selected);
      let selectedNameArray = selected.map((selected) => selected?.display_name || "Unknown");
      console.log("SELECTED NAME ARRAY: ", selectedNameArray);
      try {
        const response = await axios.post("/api/savePreference", {
          token,
          selectedNameArray,
        });
        console.log("Preferences Saved:", response.data);
      } catch (error) {
        console.error("Error saving preferences:", error);
      }
    }

    savePreferences();
  }, [selected]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(`/api/search?token=${token}&query=${query}`);
      setSubreddits(res.data.results || []);
    } catch (error) {
      console.error("Error fetching subreddits:", error);
      setSubreddits([]);
    }
  }

  function handleSelect(subreddit) {
    console.log("SUBREDDIT: ", subreddit);
    setSelected((prev) => {
      if (prev.some((s) => s?.id && s.id === subreddit?.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          id: subreddit?.name || `sub-${Math.random()}`,
          display_name: subreddit?.name ? `r/${subreddit.name}` : "Unknown",
          imageUrl: subreddit?.iconUrl ? subreddit.iconUrl : "/default-reddit-icon.png",
        },
      ];
    });
  }

  function handleRemove(id) {
    setSelected((prev) => prev.filter((s) => s?.id && s.id !== id));
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 ml-56 p-6 bg-gray-50">
        <div className="mx-auto bg-white shadow-md rounded-md p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Curate your home feed</h1>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Popular Subreddits</h2>
            <div className="flex flex-wrap gap-4">
              {popularSubreddits
                .filter((sub) => sub?.name)
                .map((sub) => {
                  let imageUrl = sub?.iconUrl ? sub.iconUrl : "/default-reddit-icon.png";
                  return (
                    <div
                      key={sub?.name || `sub-${Math.random()}`}
                      className="w-20 h-20 rounded-full bg-gray-200 relative cursor-pointer hover:bg-gray-300 flex items-center justify-center text-center"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() => handleSelect(sub)}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black/50 rounded-full">
                        r/{sub?.name ? sub.name : "Unknown"}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Your Selections</h2>
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {selected
                  .filter((item) => item && item?.id)
                  .map((item) => {
                    let imageUrl = item?.imageUrl ? item.imageUrl : "/default-reddit-icon.png";
                    console.log("ITEM: ", item);
                    return (
                      <div key={item.id} className="w-20 h-20 bg-gray-200">
                        <span>r/{item?.display_name ? item.display_name : "Unknown"}</span>
                        <button onClick={() => handleRemove(item.id)}>X</button>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p>No subreddits selected yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
