// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t px-6 py-4 text-sm text-gray-500 text-center shadow-inner">
      © {new Date().getFullYear()} Weather Admin Dashboard. Dibuat oleh Masnur Ahmad Rifal Saputra.
    </footer>
  );
}
