import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function ViewLogDialog({ log, onClose }) {
  if (!log) return null;

  return (
    <Dialog open onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        className="relative z-50 max-w-3xl mx-auto mt-16 bg-[#1d1d2a] text-white rounded-xl shadow-xl p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <Dialog.Title className="text-2xl font-bold mb-4">📄 Log Details</Dialog.Title>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
          <div>
            <h2 className="text-lg font-semibold mb-1">📝 Title</h2>
            <p className="text-white/90">{log.title}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">📚 Content</h2>
            <pre className="whitespace-pre-wrap bg-[#2b2b3f] p-4 rounded-md text-sm text-white/90 border border-white/10">
              {log.content}
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">🏷️ Tags</h2>
            <div className="flex flex-wrap gap-2">
              {log.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">👤 Author</h2>
            <p className="text-white/80">
              {log.author?.name || "-"} ({log.author?.email || "-"})
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">🕒 Created At</h2>
            <p className="text-white/80">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </Dialog>
  );
}
