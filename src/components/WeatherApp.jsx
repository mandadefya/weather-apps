import { useState, useEffect } from "react";
import riauRegions from "../data/riau-regions.json";

const API_KEY = "e889c3abb20ea7850e8b9d87c05f5193"; // ganti jika perlu

export default function WeatherApp() {
  const cities = riauRegions[0].cities;
  const [city, setCity]       = useState(cities[0].name);
  const [village, setVillage] = useState(cities[0].villages[0].name);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Ambil koordinat desa terpilih
  const getCoords = () => {
    const c = cities.find((c) => c.name === city);
    const v = c.villages.find((v) => v.name === village);
    return { lat: v.lat, lon: v.lon };
  };

  // Panggil OpenWeather
  const fetchWeather = async () => {
    setError("");
    setLoading(true);
    setWeather(null);

    const { lat, lon } = getCoords();
    if (lat == null || lon == null) {
      setError("Koordinat tidak ditemukan");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Cuaca Saat Ini (Provinsi Riau)</h1>

      <div>
        <label>
          Kota &nbsp;
          <select
            value={city}
            onChange={(e) => {
              const newCity = e.target.value;
              setCity(newCity);
              // reset desa
              const c = cities.find((c) => c.name === newCity);
              setVillage(c.villages[0].name);
            }}
          >
            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 16 }}>
          Desa &nbsp;
          <select
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          >
            {cities
              .find((c) => c.name === city)
              .villages.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
          </select>
        </label>

        <button onClick={fetchWeather} disabled={loading} style={{ marginLeft: 16 }}>
          {loading ? "Loading…" : "Cek Cuaca"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: 20 }}>
          <h2>Lokasi: {weather.name}</h2>
          <p>Suhu: {weather.main.temp} °C</p>
          <p>Cuaca: {weather.weather[0].description}</p>
          <p>Kelembapan: {weather.main.humidity}%</p>
          <p>Angin: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}