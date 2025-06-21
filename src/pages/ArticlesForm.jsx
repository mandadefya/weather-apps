// src/pages/ArticleForm.jsx
import { useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ArticleForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Cek apakah sedang edit
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Jika sedang edit, ambil data artikel dari Supabase
  useEffect(() => {
    if (isEditing) {
      const fetchArticle = async () => {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setError("Artikel tidak ditemukan.");
        } else {
          setTitle(data.title);
          setContent(data.content);
        }
      };

      fetchArticle();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user?.id) {
      setError("User belum login atau tidak valid.");
      return;
    }

    if (isEditing) {
      // UPDATE
      const { error: updateError } = await supabase
        .from("articles")
        .update({ title, content })
        .eq("id", id);

      if (updateError) {
        setError(updateError.message);
      } else {
        navigate("/articles");
      }
    } else {
      // INSERT
      const { error: insertError } = await supabase.from("articles").insert([
        {
          title,
          content,
          created_by: user.id,
        },
      ]);

      if (insertError) {
        setError(insertError.message);
      } else {
        navigate("/articles");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-xl font-bold mb-4">
        {isEditing ? "Edit Artikel" : "Tambah Artikel"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block font-semibold">Judul</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Konten</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Simpan Perubahan" : "Simpan"}
        </button>
      </form>
    </div>
  );
}
