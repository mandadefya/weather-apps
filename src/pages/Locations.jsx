// src/pages/Locations.jsx
import React, { useContext, useState } from "react";
import riauRegions from "../data/riau-regions.json";
import { AuthContext } from "../contexts/AuthContext";

export default function Locations() {
  const { user }  = useContext(AuthContext);
  const isAdmin   = user.user_metadata.role === "admin";
  const cities    = riauRegions[0].cities;  // ambil dari JSON
  const [expanded, setExpanded] = useState({});

  const toggleCity = (name) => {
    setExpanded((e) => ({ ...e, [name]: !e[name] }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Daftar Lokasi Provinsi Riau</h1>

      {cities.map((city) => (
        <div
          key={city.name}
          style={{
            marginTop: 16,
            border: "1px solid #ddd",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => toggleCity(city.name)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "12px",
              background: "#f7fafc",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {city.name}
          </button>

          {expanded[city.name] && (
            <div style={{ padding: "12px", background: "#fff" }}>
              <ul style={{ marginLeft: 20 }}>
                {city.villages.map((v) => (
                  <li key={v.name}>{v.name}</li>
                ))}
              </ul>

              {isAdmin && (
                <div style={{ marginTop: 8 }}>
                  <button
                    style={{
                      marginRight: 8,
                      padding: "4px 8px",
                      background: "#319795",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "4px 8px",
                      background: "#E53E3E",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}