import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate   = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

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
    <div className="flex items-center justify-center min-h-screen bg-sky-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl mb-6 text-center font-semibold">Login</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label className="block mb-4">
          <span className="font-medium">Email</span>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="font-medium">Password</span>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}