import React from "react";

export default function GuestFooter() {
  return (
    <footer className="bg-gray-100 border-t py-4 text-center text-sm text-gray-600">
      &copy; {new Date().getFullYear()} Weather App • Guest Mode
    </footer>
  );
}