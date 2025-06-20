import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
  const { signUp } = useContext(AuthContext);
  const navigate   = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("guest");
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
    const { error: signUpError } = await signUp(email, password, role);
    if (signUpError) {
      setError(signUpError.message);
    } else {
      navigate("/login", { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl mb-6 text-center font-semibold">Register</h1>

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

        <label className="block mb-4">
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

        <label className="block mb-6">
          <span className="font-medium">Daftar sebagai</span>
          <select
            className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Mendaftar..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}