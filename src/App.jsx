// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./assets/tailwind.css";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import "./assets/tailwind.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import WeatherPage from "./pages/Weather";
import Locations from "./pages/Locations";
import Favorites from "./pages/Favorites";
import UserPanel from "./pages/UserPanel";
import Articles from "./pages/Articles";
import ArticleForm from "./pages/ArticlesForm";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected area */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="weather" replace />} />
            <Route path="weather" element={<WeatherPage />} />
            <Route path="locations" element={<Locations />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="user" element={<UserPanel />} />

            {/* ✅ Admin & Guest: Semua bisa lihat, tapi tombol CRUD hanya untuk Admin */}
            <Route path="articles" element={<Articles />} />

            {/* ✅ Admin Only: Tambah dan Edit Artikel */}
            <Route path="articles/new" element={<ArticleForm />} />
            <Route path="articles/:id" element={<ArticleForm />} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="weather" replace />} />
          </Route>

          {/* Jika user tidak ditemukan */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
