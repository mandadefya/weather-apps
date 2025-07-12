import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TiWeatherPartlySunny } from "react-icons/ti";

export default function GuestFooter() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`w-full border-t px-6 py-4 text-sm text-center shadow-inner ${
        theme === "dark"
          ? "bg-gray-800 text-gray-300 border-gray-700"
          : "bg-white text-gray-500 border-gray-200"
      }`}
    >
      <div className="flex justify-center items-center gap-1">
        <span>© {new Date().getFullYear()} Weather Guest Dashboard</span>
        <TiWeatherPartlySunny />
      </div>
    </footer>
  );
}
