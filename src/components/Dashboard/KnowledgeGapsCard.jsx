import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

const KnowledgeGapsCard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchGaps = async () => {
      try {
        // For admin: global gaps
        // For others: team-level gaps
        const url =
          user?.role === "ADMIN"
            ? "/logs/gaps"
            : `/logs/gaps?${user?.teamId}`;

        const res = await api.get(url);
        setData(res.data);

        // Mock data
        // setData({
        //   totalUniqueTags: 12,
        //   underusedTags: [
        //     { tag: "CI/CD", count: 1 },
        //     { tag: "testing", count: 1 },
        //     { tag: "sockets", count: 2 },
        //     { tag: "caching", count: 2 },
        //     { tag: "security", count: 3 },
        //   ],
        // });
      } catch (err) {
        console.error("❌ Failed to fetch knowledge gaps:", err);
      }
    };

    if (user) fetchGaps();
  }, [user]);

  if (!data) return null;

  return (
    <motion.div
      className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition duration-300 hover:shadow-[0_0_30px_rgba(255,105,180,0.15)] mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-pink-400 drop-shadow-[0_0_3px_rgba(255,105,180,0.5)]">
        🧠 Knowledge Gap Highlights
      </h2>

      <p className="text-sm text-gray-400 mb-4">
        Out of {data.totalUniqueTags} total tags, these are the least used:
      </p>

      <div className="flex flex-wrap gap-2">
        {data.underusedTags.map(({ tag, count }) => (
          <span
            key={tag}
            className="bg-gradient-to-r from-pink-700/40 to-pink-500/30 text-pink-200 border border-pink-400/30 px-3 py-1 text-xs rounded-full font-medium shadow-sm hover:brightness-110 transition"
          >
            #{tag} ({count})
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default KnowledgeGapsCard;
