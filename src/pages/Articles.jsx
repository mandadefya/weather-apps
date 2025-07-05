import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">📰 Daftar Artikel</h1>

      {isAdmin && (
        <button
          onClick={() => navigate("/articles/new")}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded shadow hover:shadow-lg transition mb-8"
        >
          + Tambah Artikel
        </button>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada artikel.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              {a.image_url ? (
                <img
                  src={a.image_url}
                  alt={a.title}
                  className="h-48 w-full object-cover rounded-t-2xl"
                />
              ) : (
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 group-hover:from-yellow-200 group-hover:to-yellow-300 flex items-center justify-center text-gray-400 italic rounded-t-2xl">
                  Tidak ada gambar
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-700">
                    {a.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-4">
                    {a.content}
                  </p>
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  Dibuat: {new Date(a.created_at).toLocaleString()}
                </div>

                {isAdmin && (
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => navigate(`/articles/${a.id}`)}
                      className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="flex items-center gap-1 text-red-600 text-sm hover:underline"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
