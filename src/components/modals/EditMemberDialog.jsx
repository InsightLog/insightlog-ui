import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import api from "@/utils/api";

export default function EditMemberDialog({ member, onClose, onSuccess }) {
    const [role, setRole] = useState(member.role);
    const [teamId, setTeamId] = useState(member.teamId || null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await api.get("/teams");
                setTeams(res.data);
            } catch {
                toast.error("Failed to fetch teams");
            }
        };
        fetchTeams();
    }, []);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            await api.put(`/users/${member.id}`, { role, teamId });
            toast.success("User updated!");
            onSuccess();
            onClose();
        } catch {
            toast.error("Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        try {
            setLoading(true);
            await api.put(`/users/${member.id}`, { teamId: null });
            toast.success("User removed from team");
            onSuccess();
            onClose();
        } catch {
            toast.error("Failed to remove user");
            const status = err?.response?.status;
            if (status === 403) toast.error("You're not allowed to edit this log");
            else if (status === 404) toast.error("Log not found");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center px-2">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="bg-[#1e1e2f] text-white p-4 sm:p-6 rounded-xl w-full max-w-xs sm:max-w-sm z-50 border border-white/10 relative">
                <Dialog.Title className="text-lg font-bold mb-4 flex justify-between items-center">
                    Edit Member
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-xl font-bold focus:outline-none"
                    >
                        &times;
                    </button>
                </Dialog.Title>

                <p className="mb-4 text-gray-400 text-sm break-words">
                    {member.name} ({member.email})
                </p>

                <label className="block text-sm text-gray-300 mb-1">Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-2 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm mb-4"
                >
                    <option value="LEAD">Lead</option>
                    <option value="MEMBER">Member</option>
                </select>

                <label className="block text-sm text-gray-300 mb-1">Team</label>
                <select
                    value={teamId || ""}
                    onChange={(e) => setTeamId(e.target.value === "" ? null : e.target.value)}
                    className="w-full px-2 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm mb-4"
                >
                    <option value="">-- Select a Team --</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleRemove}
                        className="text-red-400 hover:text-red-300 text-sm"
                        disabled={loading}
                    >
                        Remove from team
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
