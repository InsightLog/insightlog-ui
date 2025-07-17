import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

const LeaderboardCard = () => {
  const [leaders, setLeaders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaders = async () => {
      let url = ``;
      if (user.role !== 'ADMIN') {
        url = `/logs/leaderboard?teamId=${user.teamId}`;
      } else {
        url = `/logs/leaderboard`;
      };
      const res = await api.get(url);
      setLeaders(res.data);
    }
    // const mock = [
    //   { name: "Sushil R", count: 12 },
    //   { name: "Alice", count: 8 },
    //   { name: "Bob", count: 6 },
    // ];
    // setLeaders(mock);

    fetchLeaders();
  }, [user?.teamId]);

  return (
    <motion.div
      className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(0,255,180,0.1)] transition duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-emerald-400 drop-shadow-[0_0_3px_rgba(0,255,180,0.6)]">
        🏆 Team Leaderboard (This Week)
      </h2>

      {leaders.length === 0 ? (
        <p className="text-gray-400 text-sm">No logs this week yet.</p>
      ) : (
        <div className="space-y-3">
          {leaders.map((user, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-[#2a2a3d] border border-white/10 px-4 py-2 rounded-md hover:bg-[#32324a] transition duration-200"
            >
              <span className="text-sm text-white font-medium flex items-center gap-2">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                {user.name}
              </span>
              <span className="text-sm text-emerald-400 font-semibold">
                {user.count} logs
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default LeaderboardCard;
