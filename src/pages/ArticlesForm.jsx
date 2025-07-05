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
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
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
          setImageUrl(data.image_url || "");
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

    let finalImageUrl = imageUrl;

    // Upload gambar jika ada file baru
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("article-image")
        .upload(fileName, image);

      if (uploadError) {
        setError("Gagal mengunggah gambar.");
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from("article-image")
        .getPublicUrl(fileName);

      finalImageUrl = publicUrlData.publicUrl;
    }

    if (isEditing) {
      const { error: updateError } = await supabase
        .from("articles")
        .update({ title, content, image_url: finalImageUrl })
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
          image_url: finalImageUrl,
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

        {isEditing && imageUrl && (
          <div className="mb-6 text-center">
            <img
              src={imageUrl}
              alt="Gambar Artikel"
              className="max-w-xs mx-auto rounded"
            />
          </div>
        )}

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

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Gambar Artikel
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-100 file:text-blue-700
                hover:file:bg-blue-200"
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
