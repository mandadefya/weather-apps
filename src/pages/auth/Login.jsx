import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/image.png";


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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-20 w-20" />
        </div>


        <h1 className="text-3xl mb-6 text-center font-bold text-gray-700">
          Welcome back!
        </h1>

        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

        <label className="block mb-4">
          <span className="font-medium text-gray-700">Email</span>
          <input
            type="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="font-medium text-gray-700">Password</span>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
