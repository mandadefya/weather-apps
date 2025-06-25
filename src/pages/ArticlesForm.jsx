import { useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaSave } from "react-icons/fa";

export default function ArticleForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-800 text-center">
          {isEditing ? "✏️ Edit Artikel" : "📝 Tambah Artikel"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 font-medium">{error}</p>}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Judul Artikel
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan judul artikel"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Isi Artikel
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm min-h-[180px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tulis isi artikel di sini..."
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <FaSave /> {isEditing ? "Simpan Perubahan" : "Simpan Artikel"}
          </button>
        </form>
      </div>
    </div>
  );
}
