import { useState, useEffect, useRef } from "react";
import riauRegions from "../data/riau-regions.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

const API_KEY = "e889c3abb20ea7850e8b9d87c05f5193"; // ganti jika perlu

export default function WeatherApp() {
  const cities = riauRegions[0].cities;
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  const fetchWeather = async (lat, lon, name) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeatherData((prev) => ({ ...prev, [name]: data }));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleAddFavorite = async (region_name, lat, lon) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Anda harus login untuk menyimpan favorit.");
      const user_id = user.id;

      const { error } = await supabase.from("favorites").insert([
        { user_id, region_name, lat, lon },
      ]);

      if (error) throw error;
      alert("Lokasi ditambahkan ke favorit!");
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    cities.forEach((city) => {
      const firstVillage = city.villages[0];
      fetchWeather(firstVillage.lat, firstVillage.lon, city.name);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const scrollAmount = 280;
        const current = scrollRef.current;
        if (current.scrollLeft + current.offsetWidth >= current.scrollWidth) {
          current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    const firstVillage = city.villages[0];
    fetchWeather(firstVillage.lat, firstVillage.lon, firstVillage.name);
    setSelectedVillage(null);
  };

  const handleVillageClick = (village) => {
    fetchWeather(village.lat, village.lon, village.name);
    setSelectedVillage(village);
  };

  const dataList = selectedCity ? selectedCity.villages : cities;

  return (
    <div className="relative">
      <h1 className="text-xl font-semibold mb-4">
        Cuaca Saat Ini {selectedCity ? `di ${selectedCity.name}` : "(Provinsi Riau)"}
      </h1>

      {selectedCity && (
        <button
          onClick={() => {
            setSelectedCity(null);
            setSelectedVillage(null);
          }}
          className="mb-4 text-blue-600 dark:text-yellow-300 hover:underline"
        >
          ← Kembali ke daftar kota
        </button>
      )}

      <div className="relative">
        <button
          onClick={() => handleScroll("left")}
          className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-black dark:text-white shadow p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 px-10 snap-x scroll-smooth hide-scrollbar"
        >
          {dataList.map((item) => {
            const name = item.name;
            const data = weatherData[name];
            const lat = item.lat;
            const lon = item.lon;
            return (
              <div
                key={name}
                onClick={() =>
                  selectedCity ? handleVillageClick(item) : handleCityClick(item)
                }
                className="min-w-[240px] max-w-[240px] 
                           bg-gradient-to-br from-blue-100 to-white 
                           dark:from-gray-800 dark:to-gray-900 
                           text-gray-800 dark:text-gray-100 
                           p-4 rounded-xl cursor-pointer 
                           shadow hover:shadow-md 
                           transition-all duration-300"
              >
                <h2 className="text-lg font-semibold">{name}</h2>
                {!selectedCity && (
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                    18.00 WIB
                  </p>
                )}

                {data ? (
                  <>
                    <div className="text-4xl mt-2">
                      {Math.round(data.main.temp)}°C{" "}
                      {(() => {
                        const temp = data.main.temp;
                        const desc = data.weather[0].description.toLowerCase();

                        if (desc.includes("rain")) return "🌧️";
                        if (temp >= 33) return "🌞";
                        if (temp <= 24) return "❄️";
                        return "⛅";
                      })()}
                    </div>
                    <p className="capitalize text-sm mt-1 dark:text-gray-300">
                      {data.weather[0].description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddFavorite(name, lat, lon);
                      }}
                      title="Tambah ke Favorit"
                      className="mt-2 text-xl text-red-500 hover:scale-110 transition-transform duration-200"
                    >
                      ❤️
                    </button> 
                  </>
                ) : (
                  <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">
                    Loading...
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-black dark:text-white shadow p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
