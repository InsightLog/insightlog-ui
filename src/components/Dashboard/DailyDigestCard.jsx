import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
const DailyDigestCard = () => {
  const [digest, setDigest] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    // Mock digest data
    // const mock = {
    //   date: new Date().toISOString().slice(0, 10),
    //   totalLogs: 5,
    //   topContributor: { name: "Sushil R", count: 3 },
    //   topTags: ["bug", "auth", "refactor"],
    // };

    // setDigest(mock);
    let url =``
    if (user.role !== "ADMIN") {
      url = `/logs/digest?teamId=${user.teamId}`;
    }
    else {
      url = `/logs/digest`;
    }
    
    const fetchDigest = async () => {
      const res = await api.get(url);
      setDigest(res.data);
    };
    fetchDigest();
  }, []);

  if (!digest)
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow"
      >
        <h2 className="text-2xl font-bold mb-2 text-cyan-400">📅 Daily Digest</h2>
        <p className="text-gray-400">No digests available.</p>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
    >
      <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_3px_rgba(0,255,255,0.4)]">
        📅 Daily Digest
      </h2>

      <p className="text-sm text-gray-300 mb-2">
        <span className="text-white font-semibold">
          {format(new Date(digest.date), "dd MMM yyyy")}
        </span>{" "}
        — {digest.totalLogs} log{digest.totalLogs !== 1 ? "s" : ""} created today
      </p>

      <p className="text-sm text-gray-300 mb-2">
        Top Contributor:{" "}
        <span className="text-white font-medium">
          {digest.topContributor.name}
        </span>{" "}
        ({digest.topContributor.count} logs)
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {digest.topTags.map((tag, i) => (
          <Badge
            key={i}
            className="bg-gradient-to-r from-emerald-500/60 to-cyan-500/60 text-white px-3 py-1 text-sm rounded-full shadow-md hover:brightness-110"
          >
            #{tag}
          </Badge>
        ))}
      </div>

      {/* 
      <button
        className="mt-2 text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        onClick={() => alert("🔍 Show full digest dialog or redirect")}
      >
        View Full Digest
      </button> 
      */}
    </motion.div>
  );
};

export default DailyDigestCard;
