import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utils/api";
import { motion } from "framer-motion";
import { PlusIcon, AtSymbolIcon, ClockIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import EditMemberDialog from "@/components/modals/EditMemberDialog";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";

export default function AssignMembers() {
    const { teamId } = useParams();
    const [teamName, setTeamName] = useState("Loading...");
    const [members, setMembers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [hotTags, setHotTags] = useState([]);
    const [knowledgeGaps, setKnowledgeGaps] = useState({
        totalUniqueTags: 0,
        underusedTags: [],
    });


    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    // Fetch hot-tags and logs (add inside useEffect)
    useEffect(() => {
        const fetchLogsAndTags = async () => {
            try {
                const [tagsRes, logsRes, gapsRes] = await Promise.all([
                    api.get("/logs/hot-tags?teamId=" + teamId),
                    api.get(`/logs?teamId=${teamId}`),
                    api.get(`/logs/gaps/${teamId}`),
                ]);

                setHotTags(tagsRes.data || []); 
                setLogs(logsRes.data.logs?.slice(0, 3) || []); 
                setKnowledgeGaps(gapsRes.data || { totalUniqueTags: 0, underusedTags: [] });
            } catch (err) {
                toast.error("Failed to load logs/tags/gaps");
            }
        };

        fetchLogsAndTags();
    }, [teamId]);


    const fetchMembers = async () => {
        try {
            const res = await api.get(`/teams/${teamId}/members`);
            setTeamName(res.data.teamName || "Team");
            setMembers(res.data.members || []);
            setInvites(res.data.invites || []);
        } catch (err) {
            toast.error("Failed to load members");
        }
    };

    const sendInvite = async () => {
        if (!inviteEmail) return toast.error("Enter an email");
        setSending(true);
        try {
            await api.post(`/teams/${teamId}/invite`, { email: inviteEmail, userId: user.id });
            toast.success("Invite sent!");
            setInviteEmail("");
            fetchMembers();
        } catch (err) {
            if(err.status === 400) {
                toast.error("Invite already sent or invalid email");
            }
            else{
                toast.error(err.error? err.error :"Failed to send invite");
            }
            
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [teamId]);

    return (
        <motion.div
            className="min-h-screen bg-[#141322] text-white p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="grid grid-cols-1 xl:grid-cols-[3fr_1.2fr] gap-10">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">{teamName} - Members</h1>

                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <input
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="Invite email"
                                className="bg-gray-800 ml-2 text-sm px-2 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-purple-600"
                            />
                            <button
                                onClick={sendInvite}
                                disabled={sending}
                                className="flex items-center ml-2 gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-4 py-2 rounded-lg font-semibold transition"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Invite
                            </button>
                        </div>
                    </div>

                    {/* Members */}
                    <h2 className="text-xl font-semibold mb-4">👥 Current Members</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="relative bg-[#1e1e2f] p-4 rounded-xl border border-white/10"
                            >
                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <p className="text-sm text-gray-400">{member.email}</p>
                                <span className="inline-block mt-2 px-3 py-1 text-xs bg-purple-600/20 text-purple-300 rounded-full">
                                    {member.role}
                                </span>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => setSelectedMember(member)}
                                        className="text-sm text-purple-400 hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* Invites */}
                    <h2 className="text-xl font-semibold mb-4">📬 Pending Invites</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {invites.map((invite) => (
                            <div
                                key={invite.id}
                                className="bg-[#2a2a3f] p-4 rounded-xl border border-white/10"
                            >
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <AtSymbolIcon className="w-4 h-4" />
                                    {invite.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                                    <ClockIcon className="w-4 h-4" />
                                    Invited at: {new Date(invite.sentAt).toLocaleString()}
                                </div>
                                <span className="inline-block mt-3 px-3 py-1 text-xs bg-yellow-600/20 text-yellow-400 rounded-full">
                                    {invite.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    {selectedMember && (
                        <EditMemberDialog
                            member={selectedMember}
                            onClose={() => setSelectedMember(null)}
                            onSuccess={fetchMembers}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-6">
                    {/* Team Activity Box */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 70 }}
                        className="bg-[#1e1e2f] border border-white/10 rounded-xl p-6 shadow-lg h-fit"
                    >
                        <h2 className="text-xl font-semibold mb-4">📝 Team Activity</h2>

                        <div className="mb-6">
                            <p className="text-sm text-gray-400 mb-2">🔥 Trending Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {hotTags.map(({ tag, count }, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-purple-800/20 text-purple-300 text-xs px-3 py-1 rounded-full"
                                    >
                                        #{tag} ({count})
                                    </span>
                                ))}

                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <p className="text-sm text-gray-400">📌 Recent Logs</p>
                            {logs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-[#2a2a3f] p-3 rounded-lg border border-white/10"
                                >
                                    <h3 className="font-medium text-sm">{log.title}</h3>
                                    <p className="text-xs text-gray-400 line-clamp-2">
                                        {log.content}
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        {new Date(log.createdAt).toLocaleDateString()}
                                    </p>
                                </motion.div>
                            ))}

                        </div>

                        <button
                            onClick={() => navigate(`/v1/log/editor`)}
                            className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-4 py-2 rounded-lg font-semibold text-sm transition"
                        >
                            View All Logs
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Knowledge Gaps Box (matches the same design) */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 70 }}
                        className="bg-[#1e1e2f] border border-white/10 rounded-xl p-6 shadow-lg h-fit"
                    >
                        <h2 className="text-xl font-semibold mb-4">🧠 Knowledge Gaps</h2>

                        <p className="text-xs text-gray-500 mb-2">
                            Out of {knowledgeGaps.totalUniqueTags} tags,{" "}
                            {knowledgeGaps.underusedTags.length} are underused.
                        </p>

                        {knowledgeGaps.underusedTags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {knowledgeGaps.underusedTags.map(({ tag, count }, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-red-800/20 text-red-300 text-xs px-3 py-1 rounded-full"
                                    >
                                        #{tag} ({count} contributor{count > 1 ? "s" : ""})
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-500">
                                No current gaps – good coverage!
                            </p>
                        )}

                    </motion.div>
                </div>



            </div>
        </motion.div>
    );
}
