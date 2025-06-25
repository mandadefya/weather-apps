import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaUserCircle, FaEnvelope, FaUserTag } from "react-icons/fa";

export default function UserPanel() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <FaUserCircle className="text-gray-400 text-7xl mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profil Pengguna</h2>

        {/* Email */}
        <div className="flex items-center text-gray-600 mt-2">
          <FaEnvelope className="mr-2 text-blue-500" />
          <span>{user.email}</span>
        </div>

        {/* Role */}
        <div className="flex items-center text-gray-600 mt-2">
          <FaUserTag className="mr-2 text-green-500" />
          <span className="capitalize">{user.user_metadata.role}</span>
        </div>
      </div>
    </div>
  );
}
