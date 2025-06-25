import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCloudSun,
  FaMapMarkerAlt,
  FaSave,
  FaNewspaper,
  FaUserAlt,
} from "react-icons/fa";

export default function NavbarGuest() {
  const nav = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition ${
      isActive ? "bg-green-200 text-green-900 font-semibold" : "hover:bg-green-100 text-gray-700"
    }`;

  return (
    <nav className="w-full bg-white shadow border-b px-6 py-3 flex flex-wrap items-center justify-between">
      <div className="flex gap-2 flex-wrap">
        <NavLink to="/weather" className={linkClass}>
          <FaCloudSun /> Cuaca
        </NavLink>
        <NavLink to="/locations" className={linkClass}>
          <FaMapMarkerAlt /> Lokasi
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          <FaSave /> Favorit
        </NavLink>
        <NavLink to="/articles" className={linkClass}>
          <FaNewspaper /> Artikel
        </NavLink>
        <NavLink to="/user" className={linkClass}>
          <FaUserAlt /> Profil
        </NavLink>
      </div>

      <button
        onClick={() => nav("/weather")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
      >
        Go to Weather
      </button>
    </nav>
  );
}
