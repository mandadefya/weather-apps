import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const API_KEY = "e889c3abb20ea7850e8b9d87c05f5193";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = await supabase.auth.getUser();
      const { id: user_id } = user.data.user ?? {};

      if (!user_id) {
        setError("User tidak ditemukan.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user_id);

      if (error) {
        setError("Gagal memuat data favorit.");
        console.error(error);
      } else {
        setFavorites(data);
        data.forEach((fav) => fetchWeather(fav.lat, fav.lon, fav.region_name));
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const fetchWeather = async (lat, lon, name) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeatherData((prev) => ({ ...prev, [name]: data }));
    } catch (err) {
      console.error("Gagal mengambil data cuaca:", err.message);
    }
  };

  const handleDeleteFavorite = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus lokasi ini dari favorit?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("favorites").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus favorit.");
      console.error(error);
    } else {
      // Hapus dari state
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lokasi Favorit Anda</h2>

      {loading ? (
        <p>🔄 Memuat data...</p>
      ) : favorites.length === 0 ? (
        <p className="text-gray-500">Belum ada lokasi favorit.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((fav) => {
            const data = weatherData[fav.region_name];
            return (
              <div
                key={fav.id}
                className="relative bg-gradient-to-br from-blue-100 to-white p-4 rounded-xl shadow hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => handleDeleteFavorite(fav.id)}
                  className="absolute top-2 right-2 text-red-500 text-lg hover:text-red-700"
                  title="Hapus dari favorit"
                >
                  ❌
                </button>
                <h2 className="text-lg font-semibold">{fav.region_name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Koordinat: {fav.lat}, {fav.lon}
                </p>
                {data ? (
                  <>
                    <div className="text-4xl mt-2">{Math.round(data.main.temp)}°C</div>
                    <p className="capitalize text-sm mt-1">
                      {data.weather[0].description}
                    </p>
                  </>
                ) : (
                  <p className="text-sm mt-2 text-gray-400">Memuat cuaca...</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
