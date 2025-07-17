import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1e1e2f] to-[#0f0f1a] flex items-center justify-center px-6">
      <motion.div
        className="flex flex-col items-center text-center text-white max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Illustration */}
        <img
          src="https://www.shutterstock.com/shutterstock/videos/3638520131/thumb/1.jpg"
          alt="Not Found"
          className="w-80 mb-6 drop-shadow-lg"
        />

        {/* Message */}
        <h1 className="text-4xl font-extrabold mb-2 text-purple-400">404 — Page Not Found</h1>
        <p className="text-gray-400 text-base mb-4">
          Oops! This page doesn’t exist yet, or we're still working on it.
        </p>

        {/* CTA */}
        <Link
          to="/v1/dashboard"
          className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-full font-semibold"
        >
          Go back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
