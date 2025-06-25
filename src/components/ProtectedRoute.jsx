// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import AdminLayout from "../layouts/AdminLayout";
import GuestLayout from "../layouts/GuestLayout";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.user_metadata?.role;

  const Layout = role === "admin" ? AdminLayout : GuestLayout;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
