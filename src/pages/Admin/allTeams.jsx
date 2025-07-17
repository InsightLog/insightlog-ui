import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import api from "@/utils/api";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import AddTeamDialog from "@/components/modals/AddTeamDialog";

export default function AllTeams() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    //Fetch teams from backend (use real API later)
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await api.get("/teams"); // Replace with actual API
                setTeams(res.data);
            } catch (err) {
                toast.error("Failed to load teams");
            }
        };

        fetchTeams();
    }, []);
    // useEffect(() => {
    //     const mock = [
    //         { id: "1", name: "Frontend Team", lead: { name: "Alice" }, memberCount: 4 },
    //         { id: "2", name: "Backend Team", lead: { name: "Bob" }, memberCount: 6 },
    //     ];
    //     setTeams(mock);
    // }, []);

    const handleRefresh = async () => {
        try {
            const res = await api.get("/teams"); 
            setTeams(res.data);
        } catch (err) {
            toast.error("Failed to load teams");
        }
    };


    return (
        <motion.div
            className="min-h-screen bg-[#141322] text-white p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">All Teams</h1>
                <>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-4 py-2 rounded-lg font-semibold transition"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Add Team
                        </button>
                    </div>

                    {/* Team Grid here */}

                    {showModal && (
                        <AddTeamDialog onClose={() => setShowModal(false)} onSuccess={handleRefresh} />
                    )}
                </>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="bg-[#1e1e2f] border border-white/10 rounded-xl p-5 shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-2">{team.name}</h2>
                        <p className="text-sm text-gray-400 mb-1">
                            Lead: {team.lead?.name || "Unassigned"}
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                            Members: {team.memberCount || 0}
                        </p>

                        <button
                            onClick={() => navigate(`/v1/admin/teams/${team.id}/invite`)}
                            className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg"
                        >
                            <UsersIcon className="w-4 h-4" />
                            Assign Members
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
