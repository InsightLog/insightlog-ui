// src/components/modals/AddLogDialog.tsx
import { Dialog } from "@headlessui/react";
import { useState, useEffect, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import { toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "easymde/dist/easymde.min.css";
import api from "@/utils/api";
import "@/styles/markdown.css";
import { useAuth } from "@/context/AuthContext";

export default function AddLogDialog({ onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [hotTags, setHotTags] = useState([]);
  const { user } = useAuth();

  const simpleMdeOptions = useMemo(
    () => ({
      placeholder: "Write your markdown content here...",
      spellChecker: false,
      theme: "dark",
    }),
    []
  );


  const handleSubmit = async () => {
    if (!title || !content) return toast.error("Fill all fields");
    setLoading(true);
    try {
      await api.post("/logs", {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        teamId: user?.teamId,
        authorId: user?.id
      });
      toast.success("Log created!");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error("Failed to add log");
    } finally {
      setLoading(false);
    }
  };

  const fetchHotTags = async () => {
    try {
      const res = await api.get(`/logs/hot-tags?teamId=${user?.teamId}`);
      setHotTags(res.data || []);
    } catch (err) {
      console.error("Failed to fetch hot tags", err);
    }
  };

  const handleHotTagClick = (tag) => {
    const existing = tags.split(",").map((t) => t.trim());
    if (!existing.includes(tag)) {
      const updated = [...existing, tag].filter(Boolean).join(", ");
      setTags(updated);
    }
  };
  // Fetch hot tags when the component mounts or teamId changes
  useEffect(() => {
    if (user?.teamId) fetchHotTags();
  }, [user?.teamId]);

  return (
    <Dialog open onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative z-50 mx-auto mt-12 max-w-3xl w-full bg-[#1d1d2a] text-white p-6 rounded-xl shadow-xl overflow-hidden">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <Dialog.Title className="text-xl font-semibold mb-4">📝 New Log</Dialog.Title>

        {/* Scrollable content */}
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Log Title"
            className="w-full mb-4 bg-[#2b2b3f] p-3 rounded-md border border-gray-600 outline-none"
          />
          <SimpleMDE
            value={content}
            onChange={setContent}
            options={simpleMdeOptions}
          />

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full mt-4 bg-[#2b2b3f] p-3 rounded-md border border-gray-600 outline-none"
          />

          {/* 🔥 Hot Tags */}
          {hotTags.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-400 mb-1">🔥 Popular Tags:</p>
              <div className="flex flex-wrap gap-2">
                {hotTags.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHotTagClick(item.tag)}
                    className="text-xs px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 hover:bg-purple-700/30 transition"
                  >
                    #{item.tag}
                  </button>
                ))}

              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-300 hover:text-red-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-5 py-2 rounded-md font-medium transition"
          >
            {loading ? "Saving..." : "Add Log"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
