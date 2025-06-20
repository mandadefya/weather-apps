// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { user } = useContext(AuthContext);

  // Kalau belum login → ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kalau ada role yang diprotect dan tidak cocok → redirect silang
  const userRole = user.user_metadata.role;
  if (role && userRole !== role) {
    return <Navigate to={`/${userRole}/weather`} replace />;
  }

  // Role sesuai → render children
  return children;
}