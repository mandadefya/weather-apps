import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Layout() {
  const { user, loading, signOut } = useContext(AuthContext);
  const nav = useNavigate();

  if (loading) return <div className="p-6">🔄 Memuat akun...</div>;
  if (!user) return <div className="p-6">❌ Tidak ada akun.</div>;

  const role = user.user_metadata?.role;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar full height */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between shadow">
        <div>
          <h2 className="text-lg font-semibold mb-4">📋 Menu</h2>
          <nav className="space-y-3">
            <Link to="/weather" className="block hover:text-blue-600">🌤 Cuaca</Link>
            <Link to="/locations" className="block hover:text-blue-600">📍 Lokasi</Link>
            <Link to="/favorites" className="block hover:text-blue-600">💾 Favorit</Link>
            <Link to="/user" className="block hover:text-blue-600">👥 Profil</Link>
            <Link to="/articles" className="block hover:text-blue-600">✍️ Artikel</Link>
          </nav>
        </div>
        <div className="space-y-2 pt-6">
          <button
            onClick={() => nav("/weather")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Go to Weather
          </button>
          <button
            onClick={signOut}
            className="w-full text-red-600 hover:underline text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content and Header */}
      <div className="flex-1 flex flex-col">
        {/* Header at top-right */}
        <header className="w-full bg-white border-b px-6 py-4 flex justify-end items-center shadow-sm">
          <div className="text-sm text-gray-700">
            Login sebagai: <strong>{user.email}</strong> ({role})
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
