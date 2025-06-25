// src/components/guest/GuestHeader.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FaBell, FaMoon } from "react-icons/fa";

export default function GuestHeader() {
  const { user, signOut } = useContext(AuthContext);
  const role = user?.user_metadata?.role || "guest";

  return (
    <header className="w-full border-b shadow-sm bg-blue-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Kiri: Logo dan Tanggal */}
        <div className="flex items-center gap-4">
          <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
          <div className="text-sm text-gray-600 font-medium">
            Selasa, 24 Juni 2025
          </div>
        </div>

        {/* Tengah: Navigation */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/weather" className="hover:text-blue-600">Cuaca</Link>
          <Link to="/locations" className="hover:text-blue-600">Lokasi</Link>
          <Link to="/favorites" className="hover:text-blue-600">Favorit</Link>
          <Link to="/articles" className="hover:text-blue-600">Artikel</Link>
          <Link to="/user" className="hover:text-blue-600">Profil</Link>
        </nav>

        {/* Kanan: Fitur tambahan */}
        <div className="flex items-center gap-4">
          {/* Notifikasi */}
          <button
            title="Notifikasi"
            onClick={() => alert("Tidak ada notifikasi saat ini.")}
            className="text-gray-600 hover:text-blue-600 relative"
          >
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* Ganti Tema */}
          <button
            title="Ganti Mode"
            onClick={() => alert("Fitur tema belum diimplementasikan.")}
            className="text-gray-600 hover:text-blue-600"
          >
            <FaMoon className="text-xl" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
              alt="Avatar"
              className="w-9 h-9 rounded-full border"
            />
            <div className="text-sm text-gray-700 hidden md:block">
              <div className="font-medium">{user.email}</div>
              <div className="text-xs capitalize text-gray-500">({role})</div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={signOut}
            className="text-sm text-red-600 hover:underline ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
