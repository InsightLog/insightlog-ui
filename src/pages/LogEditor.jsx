import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import AddLogDialog from "@/components/modals/AddLogDialog";
import VersionHistoryDialog from "@/components/modals/VersionHistoryDialog";
import { toast } from "react-hot-toast";
import EditLogDialog from "@/components/modals/EditLogDialog";
import ViewLogDialog from "@/components/modals/ViewLogDialog";
import { Heart } from "lucide-react";

export default function LogEditor() {
  const { user } = useAuth();
  const [team, setTeam] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [editingLog, setEditingLog] = useState(null);
  const [viewingLog, setViewingLog] = useState(null);
  const [filterMine, setFilterMine] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const [crossTeam, setCrossTeam] = useState(false);
  const [selectedSingleTeam, setSelectedSingleTeam] = useState("");
  const [likedLogs, setLikedLogs] = useState(new Set());

  const fetchData = async () => {
    try {
      // ✅ Fetch all teams (for everyone)
      const teamsRes = await api.get("/teams");
      setUserTeams(teamsRes.data);

      // ✅ Default team selection logic
      if (user.role === "ADMIN") {
        // Admin: allow all teams selected
        setSelectedTeamIds(teamsRes.data.map((t) => t.id));
      } else if (user.teamId) {
        // Member: restrict to their team only
        setTeam(teamsRes.data.find((t) => t.id === user.teamId));
        setSelectedTeamIds([user.teamId]);
      }

      // ✅ Now fetch logs based on selectedTeamIds (already role-aware)
      await fetchLogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load logs");
    }
  };


  const handleLike = async (logId) => {
    try {
      await api.post(`/like/logs/${logId}/like`);
      toast.success("❤️ Liked the log!");
      fetchData();
    } catch {
      toast.error("Failed to like log");
    }
  };

  const handleDislike = async (logId) => {
    try {
      await api.delete(`/like/logs/${logId}/dislike`);
      toast.success("💔 Disliked the log!");
      fetchData();
    } catch {
      toast.error("Failed to dislike log");
    }
  };

  const handleDelete = (logId) => {
    toast.custom((t) => (
      <div
        className={`bg-[#1e1e2f] text-white px-4 py-3 rounded-lg shadow-lg border border-white/10 w-[300px] ${t.visible ? "animate-enter" : "animate-leave"}`}
      >
        <p className="text-sm">Are you sure you want to delete this log?</p>
        <div className="mt-3 flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await api.delete(`/logs/${logId}`);
                toast.success("Log deleted!");
                fetchData();
              } catch (err) {
                const status = err?.response?.status;
                if (status === 403) toast.error("You're not allowed to delete this log");
                else if (status === 404) toast.error("Log not found");
                else toast.error("Failed to delete log");
              }
            }}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    ));
  };

  const fetchLogs = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (user.role === "ADMIN") {
        // Admin filters
        if (crossTeam && selectedSingleTeam) {
          queryParams.set("teamId", selectedSingleTeam);
        } else if (!crossTeam) {
          selectedTeamIds.forEach((id) => queryParams.append("teamId", id));
        } else {
          // Cross team is ON and no single team selected → fetch all teams
          userTeams.forEach((t) => queryParams.append("teamId", t.id));
        }
      } else {
        // Member filters
        if (crossTeam && selectedSingleTeam) {
          queryParams.set("teamId", selectedSingleTeam);
        } else if (crossTeam) {
          // Cross team ON, no specific selected → fetch all teams
          userTeams.forEach((t) => queryParams.append("teamId", t.id));
        } else {
          queryParams.set("teamId", user.teamId);
        }
      }


      if (filterMine) queryParams.set("authorId", user.id);
      if (searchQuery) queryParams.set("keyword", searchQuery);
      if (queryParams.toString() === "") return;

      const res = await api.get(`/logs/search?${queryParams.toString()}&userId=${user.id}`);
      setLogs(res.data.logs);
    } catch (err) {
      toast.error("Failed to fetch logs");
    }
  };


  useEffect(() => {
    if (user?.teamId) fetchData();
  }, [user]);

  useEffect(() => {
    if ((selectedTeamIds.length || crossTeam) && user?.teamId) fetchLogs();
  }, [filterMine, searchQuery, selectedTeamIds, crossTeam, selectedSingleTeam]);

  return (
    <motion.div
      className="min-h-screen p-8 bg-[#141322] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            📒 {crossTeam
              ? selectedSingleTeam
                ? userTeams.find((t) => t.id === selectedSingleTeam)?.name || "All Logs"
                : "All Logs"
              : team?.name || "All Logs"}
          </h1>
          <p className="text-sm text-gray-400 mt-2">Manage and view your logs</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3">
            <input
              type="text"
              placeholder="🔍 Search logs by title, content or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 px-3 py-2 rounded-lg text-sm bg-[#2a2a3f] border border-gray-600 focus:outline-none focus:ring focus:ring-purple-600"
            />
            <div className="flex items-center gap-2 sm:ml-4 mt-2 sm:mt-0">
              <motion.div
                className={`w-10 h-5 flex items-center bg-gray-700 rounded-full p-1 cursor-pointer ${crossTeam ? "justify-end bg-green-700" : "justify-start"}`}
                onClick={() => setCrossTeam(!crossTeam)}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.div>
              <span className="text-sm text-gray-400">Enable cross team logs</span>
              {crossTeam && (
                <select
                  value={selectedSingleTeam}
                  onChange={(e) => setSelectedSingleTeam(e.target.value)}
                  className="ml-2 w-50 px-2 py-1 rounded-md text-sm bg-[#2a2a3f] border border-gray-600"
                >
                  <option value="">All Teams</option>
                  {userTeams.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
          <button
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-slate-800 to-violet-700 hover:from-slate-900 hover:to-violet-800 px-4 py-2 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            ➕ Add Log
          </button>

          <button
            onClick={() => setFilterMine((prev) => !prev)}
            className={`px-4 py-2 rounded-lg font-semibold transition border ${filterMine ? "bg-green-600 border-green-500 text-white" : "bg-[#2a2a3f] border-gray-600 text-gray-300 hover:text-white"}`}
          >
            {filterMine ? "🔍 Showing: Created by Me" : "Filter: Created by Me"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {logs.length > 0 ? (
          logs
            .filter((log) => !filterMine || log.authorId === user.id)
            .map((log) => (
              <motion.div
                key={log.id}
                className="relative bg-[#1f1f2e] p-5 rounded-xl border border-white/10 shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-3 right-3 flex items-center gap-1 cursor-pointer">
                  {log.liked ? (
                    <Heart
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                      onClick={() => handleDislike(log.id)}
                    />
                  ) : (
                    <Heart
                      className="w-5 h-5 text-gray-500 hover:text-red-400"
                      onClick={() => handleLike(log.id)}
                    />
                  )}
                  <span className="text-xs text-gray-400">{log.likeCount ?? 0}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{log.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {log.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Created by {log.author?.name || "-"} ({log.author?.email || "-"}) on {new Date(log.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-3 flex justify-between items-center gap-2 flex-wrap">
                  <button onClick={() => setSelectedLog(log)} className="text-sm text-cyan-400 hover:text-cyan-300 transition">
                    🔁 Version History
                  </button>
                  <button onClick={() => setEditingLog(log)} className="text-sm text-yellow-400 hover:text-yellow-300 transition">
                    ✏️ Edit
                  </button>
                  <button onClick={() => setViewingLog(log)} className="text-sm text-gray-300 hover:text-white transition">
                    📖 View More
                  </button>
                  <button onClick={() => handleDelete(log.id)} className="text-sm text-red-500 hover:text-red-400 transition">
                    ❌ Delete
                  </button>
                </div>
              </motion.div>
            ))
        ) : (
          <p className="text-gray-500 mt-4">No logs found for this team.</p>
        )}
      </div>

      {showAddDialog && (
        <AddLogDialog onClose={() => setShowAddDialog(false)} onSuccess={fetchData} />
      )}

      {selectedLog && (
        <VersionHistoryDialog log={selectedLog} onClose={() => setSelectedLog(null)} onSuccess={fetchData} />
      )}

      {editingLog && (
        <EditLogDialog log={editingLog} onClose={() => setEditingLog(null)} onSuccess={fetchData} />
      )}

      {viewingLog && <ViewLogDialog log={viewingLog} onClose={() => setViewingLog(null)} />}
    </motion.div>
  );
}