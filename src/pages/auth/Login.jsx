import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/image.png";
import Particles from "../../components/ReactBits/Particles";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    const { data, error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
    } else {
      navigate("/weather", { replace: true });
    }
    setLoading(false);
  };

  return (
    <div
    className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden"
    style={{ padding: 0, margin: 0 }} >
    <Particles className="absolute inset-0 w-full h-full z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-sm backdrop-saturate-150 rounded-3xl p-10 shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-20 w-20" />
        </div>

        <h1 className="text-3xl mb-6 text-center font-bold text-white">
          Welcome back!
        </h1>

        {error && (
          <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
        )}

        <label className="block mb-4">
          <span className="font-medium text-white">Email</span>
          <input
            type="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="font-medium text-white">Password</span>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p className="mt-4 text-sm text-center text-white/80">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
