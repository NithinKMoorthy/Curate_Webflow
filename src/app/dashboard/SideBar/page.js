"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <aside className="w-56 bg-gray-100 h-screen p-4 fixed shadow-md flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-gray-800">Curate</h2>
      <nav className="flex flex-col space-y-3 w-full flex-1 mt-10">
        <Link href="/dashboard/protected-home" className="px-3 py-2 w-full text-gray-700 hover:bg-gray-200 rounded-md transition">
          Home
        </Link>
        <Link href="/dashboard/curate" className="px-3 py-2 w-full text-gray-700 hover:bg-gray-200 rounded-md transition">
          Configure
        </Link>
      </nav>
      <button 
        onClick={handleLogout} 
        className="px-3 py-2 w-full text-red-600 hover:bg-red-100 rounded-md transition">
        Log Out
      </button>
    </aside>
  );
}
