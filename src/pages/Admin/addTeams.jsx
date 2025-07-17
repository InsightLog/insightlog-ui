import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AddTeam() {
  const [name, setName] = useState("");
  const [leadId, setLeadId] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch list of users to optionally assign as lead
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = "/users/without-team";
        console.log("Fetching users without team from:", url);
        const res = await api.get(url);
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users without team");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Team name is required");

    try {
      const res = await api.post("/teams", {
        name,
      });

      const userResult = await api.put(`/users/${leadId}`, {
        teamId: res.data.team.id,
        role: "LEAD",
      });

      toast.success("Team created successfully!");
      navigate("/v1/admin/teams");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create team");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#141322] text-white px-6 py-10 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-lg bg-[#1e1e2f] border border-white/10 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Create New Team</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Name */}
          <div className="relative">
            <input
              id="name"
              type="text"
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

          {/* Team Lead Dropdown */}
          <div className="relative">
            <select
              id="lead"
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="">-- Select Team Lead (optional) --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg font-semibold text-white transition"
          >
            Create Team
          </button>
        </form>
      </div>
    </motion.div>
  );
}
