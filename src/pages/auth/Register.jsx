import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/image.png";
import Particles from "../../components/ReactBits/Particles";
import DropdownRole from "../../components/DropdownRole";

export default function Register() {
  const { signUp } = useContext(AuthContext); // ⬅️ GUNAKAN signUp
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp(email, password, role);

    if (signUpError) {
      setError("Registrasi gagal: " + signUpError.message);
    } else {
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Particles />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-sm rounded-3xl p-10 shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <label className="block mb-4">
          <span className="text-white font-medium">Email</span>
          <input
            type="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>

        <label className="block mb-4">
          <span className="text-white font-medium">Password</span>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>

        <label className="block mb-6">
          <span className="font-medium text-white">Daftar sebagai</span>
          <DropdownRole role={role} setRole={setRole} />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>

        <p className="text-center text-white text-sm mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-300 hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
