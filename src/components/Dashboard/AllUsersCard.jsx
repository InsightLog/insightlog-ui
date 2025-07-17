import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

const AllUsersCard = () => {
  const [withTeam, setWithTeam] = useState([]);
  const [withoutTeam, setWithoutTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [res1, res2] = await Promise.all([
          api.get("/users"),
          api.get("/users/without-team"),
        ]);
        setWithTeam(res1.data);
        setWithoutTeam(res2.data);

      } catch (err) {
        console.error("❌ Error fetching users:", err);
      }
    }

    // const mockWithTeam = [
    //   {
    //     id: "u1",
    //     name: "Sushil",
    //     email: "sushil@example.com",
    //     role: "ADMIN",
    //     team: { name: "Infra Team" },
    //     createdAt: "2024-06-01T10:00:00Z",
    //   },
    //   {
    //     id: "u2",
    //     name: "Alice",
    //     email: "alice@example.com",
    //     role: "MEMBER",
    //     team: { name: "Frontend" },
    //     createdAt: "2024-06-05T14:00:00Z",
    //   },
    // ];

    // const mockWithoutTeam = [
    //   {
    //     id: "u3",
    //     name: "Bob",
    //     email: "bob@example.com",
    //     role: "MEMBER",
    //     team: null,
    //     createdAt: "2024-06-07T11:30:00Z",
    //   },
    // ];

    // setWithTeam(mockWithTeam);
    // setWithoutTeam(mockWithoutTeam);
    fetchUsers();
  }, []);

  const UserRow = ({ user }) => (
    <div className="border-b border-white/10 py-2">
      <div className="text-white font-semibold">{user.name}</div>
      <div className="text-xs text-gray-400">{user.email}</div>
      <div className="text-xs text-gray-500">
        Role: <span className="text-cyan-400">{user.role}</span> | Team:{" "}
        <span className={user.team ? "text-green-400" : "text-yellow-400"}>
          {user.team?.name || "Unassigned"}
        </span>
      </div>
      <div className="text-xs text-gray-600">
        Joined: {format(new Date(user.createdAt), "MMM d, yyyy")}
      </div>
    </div>
  );

  return (
    <motion.div
      className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 mt-10 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-3 text-cyan-400 drop-shadow-[0_0_3px_rgba(0,255,255,0.4)]">
        👥 Users Overview
      </h2>

      <div className="mb-4">
        <h3 className="text-lg text-purple-300 font-semibold mb-2">
          With Teams
        </h3>
        <div className="max-h-40 overflow-y-scroll pr-2 space-y-3 custom-scrollbar">
          {withTeam.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg text-red-400 font-semibold mb-2">
          Without Teams
        </h3>
        <div className="max-h-32 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {withoutTeam.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      </div>

      <div className="text-right mt-4">
        <button
          onClick={() => navigate("/v1/admin/users")}
          className="text-sm text-cyan-400 hover:text-cyan-600 transition cursor-pointer"
        >
          ➕ View All Users →
        </button>
      </div>
    </motion.div>
  );
};

export default AllUsersCard;
