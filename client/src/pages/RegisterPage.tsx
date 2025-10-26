import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { useAuthStore } from "../store/useAuthStore";
import type { User } from "../types/auth";

interface RegisterResponse {
  access_token: string;
  user: User;
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post<RegisterResponse>("/auth/register", { email, password });
      setAuth(res.data.user, res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-80 gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Register
        </button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
