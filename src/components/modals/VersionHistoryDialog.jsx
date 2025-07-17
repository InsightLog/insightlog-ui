import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";
import TextDiffViewer from "@/components/TextDiffViewer"; // 👈 custom viewer

export default function VersionHistoryDialog({ log, onClose, onRevertSuccess }) {
    const [previousVersion, setPreviousVersion] = useState(null);

    const fetchDiff = async () => {
        try {
            const res = await api.get(`/logs/${log.id}/diff`);
            const { diff } = res.data;

            if (!diff || (!diff.title && !diff.content && !diff.tags)) {
                setPreviousVersion(null);
                return;
            }

            setPreviousVersion({
                title: diff.title?.[0] || "",
                content: diff.content?.[0] || "",
                tags: (diff.tags?.[0] || []).join(", "),
            });
        } catch (err) {
            console.error("Error fetching log changes:", err);
            toast.error(err.response?.data?.error || "Failed to fetch log changes");
        }
    };

    const handleRevert = async () => {
        try {
            await api.put(`/logs/${log.id}/revert`);
            toast.success("Log reverted");
            onClose();
            onRevertSuccess?.();
        } catch (err) {
            const status = err?.response?.status;
            if (status === 403) toast.error("You're not allowed to edit this log");
            else if (status === 404) toast.error("Log not found");
            toast.error("Failed to revert log");
        }
    };

    useEffect(() => {
        fetchDiff();
    }, [log.id]);

    return (
        <Dialog open onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
                className="relative z-50 w-full max-w-4xl bg-[#1c1c2e] text-white p-6 rounded-xl shadow-xl max-h-[80vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Dialog.Title className="text-2xl font-bold mb-4">🧠 Log Changes</Dialog.Title>

                {previousVersion ? (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-1">🔤 Title</h3>
                            <TextDiffViewer oldText={previousVersion.title} newText={log.title} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-1">📝 Content</h3>
                            <TextDiffViewer oldText={previousVersion.content} newText={log.content} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-1">🏷️ Tags</h3>
                            <TextDiffViewer oldText={previousVersion.tags} newText={log.tags.join(", ")} />
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm border border-white/10 rounded-lg bg-[#2c2c3f] p-4">
                        📭 No previous version found for this log.
                    </p>
                )}

                <div className="mt-6 flex justify-between">
                    <button onClick={onClose} className="text-gray-300 hover:text-red-400">
                        Close
                    </button>

                    <button
                        onClick={handleRevert}
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-4 py-2 rounded-md font-semibold transition"
                    >
                        🔄 Revert to Previous
                    </button>
                </div>
            </motion.div>
        </Dialog>
    );
}
