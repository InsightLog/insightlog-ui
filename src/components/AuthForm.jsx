// src/components/AuthForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";


export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      login({ ...user, token });

      navigate("/v1/dashboard");
    } catch (err) {
      setErrorMsg("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Email */}
      <div className="relative">
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="peer w-full px-4 py-3 rounded-md bg-gray-900 text-white placeholder-transparent border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Email"
        />
        <label
          htmlFor="email"
          className="absolute left-4 top-0 text-sm text-purple-400 transition-all
  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-base
  peer-placeholder-shown:text-gray-600
  peer-focus:top-0
  peer-focus:text-sm
  peer-focus:text-purple-400
  peer:not(:placeholder-shown):top-0
  peer:not(:placeholder-shown):text-sm
  peer:not(:placeholder-shown):text-purple-400"
        >
          Email address
        </label>
        <EnvelopeIcon className="w-5 h-5 text-gray-500 absolute right-4 top-3.5" />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer w-full px-4 py-3 rounded-md bg-gray-900 text-white placeholder-transparent border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Password"
        />
        <label
          htmlFor="password"
          className="absolute left-4 top-0 text-sm text-purple-400 transition-all
  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-base
  peer-placeholder-shown:text-gray-600
  peer-focus:top-0
  peer-focus:text-sm
  peer-focus:text-purple-400
  peer:not(:placeholder-shown):top-0
  peer:not(:placeholder-shown):text-sm
  peer:not(:placeholder-shown):text-purple-400"
        >
          Password
        </label>
        <LockClosedIcon className="w-5 h-5 text-gray-500 absolute right-4 top-3.5" />
      </div>

      {/* Error */}
      {errorMsg && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 text-center"
        >
          {errorMsg}
        </motion.p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg font-semibold text-white transition"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Signup Link */}
      <div className="text-center text-sm text-gray-400">
        Don’t have an account?{" "}
        <a href="/v1/admin/register" className="text-purple-400 hover:underline">
          Sign up
        </a>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <div className="h-px bg-gray-700 flex-1" />
        <span>OR</span>
        <div className="h-px bg-gray-700 flex-1" />
      </div>

      {/* Google Auth Placeholder */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white"
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
    </form>
  );
}

