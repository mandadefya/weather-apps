import React, { useContext, useState } from "react";
import riauRegions from "../data/riau-regions.json";
import { AuthContext } from "../contexts/AuthContext";
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";

export default function Locations() {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user_metadata.role === "admin";
  const cities = riauRegions[0].cities;
  const [expanded, setExpanded] = useState({});

  const toggleCity = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="px-6 py-4 bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <FaMapMarkerAlt className="text-blue-600" />
        Daftar Lokasi Provinsi Riau
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div
            key={city.name}
            className="bg-white rounded-xl shadow-md border border-gray-100 transition hover:shadow-lg"
          >
            <button
              onClick={() => toggleCity(city.name)}
              className="w-full text-left flex justify-between items-center px-5 py-4 bg-gradient-to-r from-blue-100 to-white hover:from-blue-200 rounded-t-xl transition"
            >
              <span className="text-lg font-semibold text-gray-700">{city.name}</span>
              {expanded[city.name] ? (
                <FaChevronUp className="text-blue-500" />
              ) : (
                <FaChevronDown className="text-blue-500" />
              )}
            </button>

            {expanded[city.name] && (
              <div className="px-5 py-4 bg-white rounded-b-xl">
                <ul className="space-y-2 text-gray-600 font-medium">
                  {city.villages.map((v) => (
                    <li
                      key={v.name}
                      className="px-3 py-1 rounded hover:bg-blue-50 transition"
                    >
                      • {v.name}
                    </li>
                  ))}
                </ul>

                {isAdmin && (
                  <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <FaEdit /> Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      <FaTrash /> Hapus
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

