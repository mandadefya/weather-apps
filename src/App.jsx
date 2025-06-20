import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Login       from "./pages/auth/Login";
import Register    from "./pages/auth/Register";
import WeatherPage from "./pages/Weather";
import Locations   from "./pages/Locations";
import Favorites   from "./pages/Favorites";
import UserPanel   from "./pages/UserPanel";
import Articles    from "./pages/Articles";
import ArticleForm from "./pages/ArticlesForm";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<Login />} />
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
            <Route path="weather"   element={<WeatherPage />} />
            <Route path="locations" element={<Locations />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="user"      element={<UserPanel />} />

            {/* Admin only */}
            <Route path="articles"      element={<Articles />} />
            <Route path="articles/new"  element={<ArticleForm />} />
            <Route path="articles/:id"  element={<ArticleForm />} />

            <Route path="*" element={<Navigate to="weather" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}