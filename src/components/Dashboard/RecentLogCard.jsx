import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
const RecentLogsCard = () => {
    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        // ✅ MOCK DATA FOR TESTING
        // const mockLogs = [
        //     {
        //         id: "log1",
        //         title: "Fixed Bug in Auth Middleware",
        //         content: "Resolved an edge case where tokens expired prematurely on refresh.",
        //         createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        //         author: { name: "Sushil R" },
        //         tags: ["auth", "bugfix", "middleware"],
        //     },
        //     {
        //         id: "log2",
        //         title: "Added Logging System",
        //         summary: "Integrated Winston logger for better observability across services.",
        //         createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        //         author: { name: "Neha A" },
        //         tags: ["observability", "logging"],
        //     },
        //     {
        //         id: "log3",
        //         title: "Improved UI Responsiveness",
        //         summary: "Updated layout and animations for smoother UX on mobile devices.",
        //         createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        //         author: { name: "Arjun V" },
        //         tags: ["UI", "performance", "animation"],
        //     },
        // ];

        // 🔄 Set mock logs instead of API call
        // setLogs(mockLogs);
        let url = ``;
        if (user.role !== 'ADMIN') {
            url = `/logs?teamId=${user.teamId}?limit=4`;
        }
        else {
            url = `/logs?limit=4`;
        }
        const fetchLogs = async () => {
            try {
                const res = await api.get(url);
                setLogs(res.data.logs);
            } catch (err) {
                console.error("❌ Error fetching recent logs:", err);
            }
        };

        fetchLogs();
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 w-full"
        >
            {/* Header with View All button */}
            <div className="flex items-center justify-between mb-2 w-full">
                <h2 className="text-2xl font-bold text-violet-400 drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]">
                    📝 Recent Logs
                </h2>
                <button
                    className="text-sm px-3 py-1 rounded-md bg-violet-700/80 hover:bg-violet-900 text-white font-semibold transition"
                    onClick={() => navigate("/v1/log/editor")}
                >
                    View all logs
                </button>
            </div>

            {/* 2-column grid for logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition duration-300"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-lg font-semibold text-white">{log.title}</h3>
                            <span className="text-xs text-gray-400">
                                {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                            </span>
                        </div>

                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                            {log.summary}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-2">
                            {log.tags.map((tag, i) => (
                                <Badge
                                    key={i}
                                    className="bg-violet-700/40 text-white text-xs px-3 py-1 rounded-full"
                                >
                                    #{tag}
                                </Badge>
                            ))}
                        </div>

                        <p className="text-xs text-gray-400">by {log.author.name}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentLogsCard;
