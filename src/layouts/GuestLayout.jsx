
// src/components/GuestLayout.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function GuestLayout({ children }) {
  const { signOut } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 bg-green-100">
        <h2 className="text-xl mb-4">Guest Menu</h2>
        <nav className="space-y-2">
          <Link to="/weather">🌤 Cuaca</Link>
          <Link to="/locations">📍 Lokasi</Link>
          <Link to="/favorites">💾 Favorit</Link>
          <Link to="/articles">📰 Artikel</Link>
          <Link to="/user">👥 Profil</Link>
        </nav>
        <div className="mt-6 space-y-2">
          <button onClick={() => nav("/weather")}>Go to Weather</button>
          <button onClick={signOut} className="text-red-600">Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
