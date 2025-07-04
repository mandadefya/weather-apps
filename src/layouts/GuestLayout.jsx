// src/components/GuestLayout.jsx
import React from "react";
import GuestHeader from "../components/Guest/GuestHeader";
import GuestFooter from "../components/Guest/GuestFooter";

export default function GuestLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <GuestHeader />

      {/* Alert Cuaca */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 m-4 rounded">
        <p className="font-semibold text-yellow-800">⚠️ Peringatan Dini Cuaca</p>
        <p className="text-sm text-yellow-700">
          Beberapa wilayah masih berpotensi terjadi hujan dengan intensitas sedang hingga lebat.
        </p>
      </div>

      {/* Konten utama */}
      <main className="flex-1 px-6 py-4">
        {children}
      </main>

      {/* Footer */}
      <GuestFooter />
    </div>
  );
}
