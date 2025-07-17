import { useEffect, useState } from "react";
import UserTable from "@/components/UserTable";
import api from "@/utils/api";
import { motion } from "framer-motion";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/users");
      setUsers(res.data);

    //   const mock = [
    //     {
    //       id: "u1",
    //       name: "Sushil",
    //       email: "sushil@example.com",
    //       role: "ADMIN",
    //       team: { name: "Infra" },
    //       createdAt: "2024-06-01T10:00:00Z",
    //     },
    //     {
    //       id: "u2",
    //       name: "Alice",
    //       email: "alice@example.com",
    //       role: "MEMBER",
    //       team: { name: "Frontend" },
    //       createdAt: "2024-06-04T10:00:00Z",
    //     },
    //     {
    //       id: "u3",
    //       name: "Bob",
    //       email: "bob@example.com",
    //       role: "LEAD",
    //       team: null,
    //       createdAt: "2024-06-05T10:00:00Z",
    //     },
    //   ];

    //   setUsers(mock);
    };

    fetchUsers();
  }, []);

  const filtered = users.filter((user) => {
    if (filter === "NO_TEAM") return !user.team;
    if (filter === "ADMIN") return user.role === "ADMIN";
    if (filter === "LEAD") return user.role === "LEAD";
    if (filter === "MEMBER") return user.role === "MEMBER";
    return true;
  });

  return (
    <motion.div
      className="min-h-screen bg-[#141322] text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">👥 All Users</h1>

      <div className="mb-4 flex gap-4 flex-wrap">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-3 py-1 rounded-md ${
            filter === "ALL" ? "bg-cyan-600" : "bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("NO_TEAM")}
          className={`px-3 py-1 rounded-md ${
            filter === "NO_TEAM" ? "bg-cyan-600" : "bg-gray-700"
          }`}
        >
          No Team
        </button>
        <button
          onClick={() => setFilter("ADMIN")}
          className={`px-3 py-1 rounded-md ${
            filter === "ADMIN" ? "bg-cyan-600" : "bg-gray-700"
          }`}
        >
          Admins
        </button>
        <button
          onClick={() => setFilter("LEAD")}
          className={`px-3 py-1 rounded-md ${
            filter === "LEAD" ? "bg-cyan-600" : "bg-gray-700"
          }`}
        >
          Leads
        </button>
        <button
          onClick={() => setFilter("MEMBER")}
          className={`px-3 py-1 rounded-md ${
            filter === "MEMBER" ? "bg-cyan-600" : "bg-gray-700"
          }`}
        >
          Members
        </button>
      </div>

      <UserTable users={filtered} />
    </motion.div>
  );
}
