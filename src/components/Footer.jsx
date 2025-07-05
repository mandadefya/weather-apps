import { TiWeatherPartlySunny } from "react-icons/ti";

export default function Footer() {
  return (
    <footer className="bg-white border-t px-6 py-4 text-sm text-gray-500 text-center shadow-inner">
      <div className="flex justify-center items-center gap-1">
        <span>© {new Date().getFullYear()} Weather Admin Dashboard</span>
        <TiWeatherPartlySunny />
      </div>
    </footer>
  );
}
