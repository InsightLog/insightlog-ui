import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
const TrendingTagsCard = () => {
  const [tags, setTags] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    // Mock data for testing
    // const mock = [
    //   { tag: "refactor", count: 12 },
    //   { tag: "bug", count: 9 },
    //   { tag: "feature", count: 7 },
    //   { tag: "performance", count: 5 },
    //   { tag: "testing", count: 3 },
    //   { tag: "ui", count: 2 },
    // ];

    // setTags(mock);

    // -- Replace with real API call later --
    const fetchTrendingTags = async () => {
      let url = ``;
      if (user.role !== "ADMIN") {
        url = `/logs/hot-tags?teamId=${user.teamId}`;
      } else {
        url = `/logs/hot-tags`;
      }
      const res = await api.get(url);
      setTags(res.data);
    };
    fetchTrendingTags();
  }, []);

  const getTextSize = (count) => {
    if (count >= 10) return "text-xl";
    if (count >= 7) return "text-lg";
    if (count >= 4) return "text-base";
    return "text-sm";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
    >
      <h2 className="text-2xl font-bold text-orange-400 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] mb-4">
        🔥 Trending Tags
      </h2>

      <div className="flex flex-wrap gap-3">
        {tags.map((t, i) => (
          <Badge
            key={i}
            className={`bg-indigo-600/60 text-white border border-indigo-400/30 shadow-inner shadow-indigo-700/20 ${getTextSize(
              t.count
            )} px-3 py-1 rounded-full transition-all`}
          >
            #{t.tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
};

export default TrendingTagsCard;
