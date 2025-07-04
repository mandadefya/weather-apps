import React from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function GuestFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
  &copy; {new Date().getFullYear()} Weather App • Guest Mode
</footer>
  );
}