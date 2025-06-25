import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBell, FaMoon, FaUserCircle } from "react-icons/fa";

export default function Header2() {
  const { user, signOut } = useContext(AuthContext);
  const nav = useNavigate();
  const role = user?.user_metadata?.role;

  return (
    <header className="w-full bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Kiri: Logo & Judul */}
      <div className="flex items-center gap-3">
        <img src="/logo-weather.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold text-blue-600">WeatherApp</h1>
      </div>

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
    </header>
  );
}
