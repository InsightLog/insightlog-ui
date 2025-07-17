import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

const AllTeamsCard = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all teams from the API
    const fetchTeams = async () => {
      try {
        const res = await api.get("/teams");
        setTeams(res.data);
      } catch (err) {
        console.error("❌ Error fetching teams:", err);
      }

    }
    // Uncomment below to use mock data for testing
    // const mock = [
    //   {
    //     id: "t1",
    //     name: "Frontend",
    //     lead: { name: "Alice" },
    //     memberCount: 4,
    //   },
    //   {
    //     id: "t2",
    //     name: "Backend",
    //     lead: { name: "Bob" },
    //     memberCount: 6,
    //   },
    //   {
    //     id: "t3",
    //     name: "Infra",
    //     lead: null,
    //     memberCount: 2,
    //   },
    // ];

    // setTeams(mock);
    fetchTeams();
  }, []);

  return (
    <motion.div
      className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-[0_0_20px_rgba(0,255,255,0.05)] transition duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]">
        🏢 All Teams Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-[#2a2a3d] border border-white/10 p-4 rounded-lg shadow-inner hover:shadow-[0_0_10px_rgba(0,255,255,0.05)] transition duration-200"
          >
            <h3 className="text-lg font-semibold text-white mb-1">
              {team.name}
            </h3>
            <p className="text-sm text-gray-400">
              Lead: {team.lead?.name || "Unassigned"}
            </p>
            <p className="text-sm text-gray-500">
              Members: {team.memberCount}
            </p>
          </div>
        ))}
      </div>

      <div className="text-right mt-4">
        <button
          onClick={() => navigate("/v1/admin/teams")}
          className="text-sm text-cyan-400 hover:text-cyan-500 transition cursor-pointer"
        >
          ⚙️ Manage All Teams →
        </button>
      </div>
    </motion.div>
  );
};

export default AllTeamsCard;
