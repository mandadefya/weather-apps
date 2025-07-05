import React, { useContext } from "react";
import GuestHeader from "../components/Guest/GuestHeader";
import GuestFooter from "../components/Guest/GuestFooter";
import { ThemeContext } from "../contexts/ThemeContext";

export default function GuestLayout({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-800"
      }`}
    >
      <GuestHeader />

      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 m-4 rounded dark:bg-yellow-200 dark:text-yellow-900">
        <p className="font-semibold text-yellow-800 dark:text-yellow-900">
          ⚠️ Peringatan Dini Cuaca
        </p>
        <p className="text-sm text-yellow-700 dark:text-yellow-800">
          Beberapa wilayah masih berpotensi terjadi hujan dengan intensitas sedang hingga lebat.
        </p>
      </div>

      <main className="flex-1 px-6 py-4">{children}</main>
      <GuestFooter />
    </div>
  );
}
