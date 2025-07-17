import { diffWords } from "diff";

export default function TextDiffViewer({ oldText, newText }) {
  const diff = diffWords(oldText || "", newText || "");

  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed rounded-lg p-4 bg-[#2c2c3f] border border-white/10">
      {diff.map((part, idx) => (
        <span
          key={idx}
          className={
            part.added
              ? "bg-green-700/40 text-green-300 px-1 rounded"
              : part.removed
              ? "bg-red-700/40 text-red-300 px-1 rounded line-through"
              : ""
          }
        >
          {part.value}
        </span>
      ))}
    </div>
  );
}
