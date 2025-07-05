// src/components/guest/GuestHeader.jsx
import React, { useContext } from "react";
import { RiLogoutCircleLine } from "react-icons/ri"; 
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import logo from "../../assets/image.png";

export default function GuestHeader() {
  const { user, signOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // ⬅️ Gunakan context
  const role = user?.user_metadata?.role || "Guest";

  // Format tanggal lokal
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const navLinks = [
    { to: "/weather", label: "Cuaca" },
    { to: "/locations", label: "Lokasi" },
    { to: "/favorites", label: "Favorit" },
    { to: "/articles", label: "Artikel" },
    { to: "/user", label: "Profil" },
  ];

  return (
    <>
      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FFCD00] to-[#009639]" />

      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          {/* Kiri: Logo dan tanggal */}
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Logo Riau"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
            <span className="text-gray-600 dark:text-gray-300 font-medium capitalize">
              {formattedDate}
            </span>
          </div>

          {/* Tengah: Navigasi */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="
                  text-gray-700 dark:text-gray-200 font-medium
                  hover:text-[#009639] dark:hover:text-[#FFCD00]
                  transition-colors duration-200
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Kanan: Ikon dan user info */}
          <div className="flex items-center space-x-4">
            {/* Notifikasi */}
            <button
              onClick={() => alert("Tidak ada notifikasi saat ini.")}
              className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Notifikasi"
            >
              <FaBell className="text-gray-700 dark:text-gray-200" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle Tema"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-700 dark:text-gray-200" />
              )}
            </button>

            {/* Avatar & Role */}
            <div className="flex items-center space-x-2">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                alt="Avatar"
                className="w-9 h-9 rounded-full border-2 border-gray-200 dark:border-gray-700"
              />
              <div className="hidden md:block text-right">
                <p className="text-gray-800 dark:text-gray-100 font-medium">
                  {user.email}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">
                  {role}
                </p>
              </div>
            </div>

            {/* Logout */}
            <div
              onClick={signOut}
              className="flex flex-col items-center text-red-600 text-sm cursor-pointer hover:text-red-800">
              <RiLogoutCircleLine size={24} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
