import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

const ReactionsCard = () => {
  const [logs, setLogs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        let url=``
        if (user.role !== "ADMIN") { 
          url = `/like/logs/reactions?authorId=${user.id}`;
        }
        else{
          url = `/like/logs/top`
        }
        const res = await api.get(url);
        setLogs(res.data);

      } catch (err) {

        console.error("❌ Error fetching logs:", err);
      }
    };
    // ✅ Mock data for testing
    // const mock = [
    //   { id: "log1", title: "Refactor Auth", likes: 5 },
    //   { id: "log2", title: "Improve Logging", likes: 2 },
    //   { id: "log3", title: "Fix Cache Bug", likes: 8 },
    // ];

    // setLogs(mock);


    fetchLogs();
  }, [user?.id]);

  return (
    <motion.div
      className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,0,122,0.1)] transition duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-pink-400 drop-shadow-[0_0_4px_rgba(255,0,122,0.6)]">
        ❤️ Reactions on Your Logs
      </h2>

      {logs.length === 0 ? (
        <p className="text-gray-400 text-sm">No logs or reactions yet.</p>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-[#2a2a3d] border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-[#34324c] transition duration-200"
            >
              <p className="text-white text-sm font-medium">{log.title}</p>
              <div className="flex items-center gap-1 text-pink-400 text-sm font-semibold">
                <HeartIcon className="w-4 h-4" />
                {log.likes}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ReactionsCard;
