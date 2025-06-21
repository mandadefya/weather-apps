// src/pages/Articles.jsx
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const { user } = useContext(AuthContext);
  const role = user?.user_metadata?.role;
  const isAdmin = role === "admin";
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal memuat artikel:", error.message);
    } else {
      setArticles(data || []);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus artikel ini?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus artikel: " + error.message);
    } else {
      fetchArticles();
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Daftar Artikel</h1>

      {isAdmin && (
        <button
          onClick={() => navigate("/articles/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
        >
          + Tambah Artikel
        </button>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel.</p>
      ) : (
        articles.map((a) => (
          <div key={a.id} className="border p-4 mb-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold">{a.title}</h2>
            <p className="text-gray-800 whitespace-pre-line mt-2">{a.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Dibuat: {new Date(a.created_at).toLocaleString()}
            </p>

            {isAdmin && (
              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => navigate(`/articles/${a.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
