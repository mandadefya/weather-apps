import { TiWeatherPartlySunny } from "react-icons/ti";

export default function GuestFooter() {
  return (
      <footer className="bg-white border-t px-6 py-4 text-sm text-gray-500 text-center shadow-inner">
        <div className="flex justify-center items-center gap-1">
          <span>© {new Date().getFullYear()} Weather Guest Dashboard</span>
          <TiWeatherPartlySunny />
        </div>
      </footer>
    );
}