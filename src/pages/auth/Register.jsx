import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/image.png";

export default function Register() {
  const { signUp } = useContext(AuthContext);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-20 w-20" />
        </div>

        <h1 className="text-3xl mb-6 text-center font-bold text-gray-700">
          Create Account
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

        <label className="block mb-4">
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

        <label className="block mb-6">
          <span className="font-medium text-gray-700">Daftar sebagai</span>
          <select
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Mendaftar..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
