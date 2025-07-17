// src/components/modals/AddTeamDialog.jsx
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function AddTeamDialog({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [leadId, setLeadId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users/without-team")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Team name is required");

    try {
      const res = await api.post("/teams", { name, leadId: leadId || null });
      toast.success("Team created successfully!");
      onSuccess(); 
      onClose();   
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create team");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="w-full max-w-lg bg-[#1e1e2f] border border-white/10 p-8 rounded-2xl shadow-xl text-white relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Create New Team</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Name */}
          <div className="relative">
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Team Name"
              className="peer w-full px-4 py-3 rounded-md bg-gray-900 text-white placeholder-transparent border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-400"
            >
              Team Name
            </label>
          </div>

          {/* Optional Team Lead */}
          <select
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="">-- Select Team Lead (optional) --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg font-semibold text-white transition"
          >
            Create Team
          </button>
        </form>
      </motion.div>
    </div>
  );
}
