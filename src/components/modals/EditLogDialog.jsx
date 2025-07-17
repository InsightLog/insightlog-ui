import { Dialog } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import api from "@/utils/api";
import "easymde/dist/easymde.min.css";

export default function EditLogDialog({ log, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (log) {
      setTitle(log.title);
      setContent(log.content);
      setTags(log.tags.join(", "));
    }
  }, [log]);

  const editorOptions = useMemo(() => ({
    placeholder: "Edit your markdown...",
    spellChecker: false,
    autofocus: true,
  }), []);

  const handleUpdate = async () => {
    if (!title || !content) return toast.error("Fill all fields");

    setLoading(true);
    try {
      await api.put(`/logs/${log.id}`, {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
      });

      toast.success("Log updated!");
      onSuccess?.();
      onClose();
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) toast.error("You're not allowed to edit this log");
      else if (status === 404) toast.error("Log not found");
      else toast.error("Failed to update log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative z-50 mx-auto mt-12 max-w-3xl w-full bg-[#1d1d2a] text-white p-6 rounded-xl shadow-xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-400">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <Dialog.Title className="text-xl font-semibold mb-4">✏️ Edit Log</Dialog.Title>

        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Log Title"
            className="w-full mb-4 bg-[#2b2b3f] p-3 rounded-md border border-gray-600 outline-none"
          />
          <SimpleMDE
            value={content}
            onChange={setContent}
            options={editorOptions}
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full mt-4 bg-[#2b2b3f] p-3 rounded-md border border-gray-600 outline-none"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-300 hover:text-red-400">Cancel</button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 px-5 py-2 rounded-md font-medium transition"
          >
            {loading ? "Saving..." : "Update Log"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
