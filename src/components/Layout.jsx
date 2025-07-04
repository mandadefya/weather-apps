import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaCloudSun,
  FaMapMarkerAlt,
  FaSave,
  FaUserAlt,
  FaNewspaper,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import Header2 from "./Header2";
import Footer from "./Footer";

export default function Layout() {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (loading) return <div className="p-6">🔄 Memuat akun...</div>;
  if (!user) return <div className="p-6">❌ Tidak ada akun.</div>;

  const role = user.user_metadata?.role;

  return (
    <div
      className={`flex min-h-screen overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-72 p-6 shadow flex flex-col justify-between border-r ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600">
              🌤 Weather Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {role === "admin" ? "Admin Panel" : "User Panel"}
            </p>
          </div>

          <nav className="space-y-2">
            <SidebarLink to="/weather" icon={<FaCloudSun />} label="Cuaca" />
            <SidebarLink to="/locations" icon={<FaMapMarkerAlt />} label="Lokasi" />
            <SidebarLink to="/favorites" icon={<FaSave />} label="Favorit" />
            <SidebarLink to="/user" icon={<FaUserAlt />} label="Profil" />
            <SidebarLink to="/articles" icon={<FaNewspaper />} label="Artikel" />
          </nav>
        </div>

        <div className="space-y-3 pt-6">
          <button
            onClick={() => navigate("/weather")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Go to Weather
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <div
          className={`sticky top-0 z-10 shadow ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <Header2 />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

// Komponen Reusable untuk Sidebar Link
function SidebarLink({ to, icon, label }) {
  const { theme } = useContext(ThemeContext);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-5 py-3 rounded-lg text-base font-medium transition-colors ${
          isActive
            ? theme === "dark"
              ? "bg-blue-900 text-blue-200 font-semibold"
              : "bg-blue-100 text-blue-800 font-semibold"
            : theme === "dark"
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-800 hover:bg-blue-50"
        }`
      }
    >
      <span className="mr-3 text-lg">{icon}</span>
      {label}
    </NavLink>
  );
}
