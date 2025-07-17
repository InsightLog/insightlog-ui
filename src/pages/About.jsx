import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative min-h-screen w-full bg-gradient-to-b from-[#1e1e2f] via-[#1d1d30] to-[#141322] text-white px-6 sm:px-16 py-20">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-50 origin-left" style={{ scaleX }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          About InsightLog
        </h1>
        <p className="text-gray-400 text-lg">
          InsightLog is a modern platform built for technical teams to log, track, and collaborate on decisions, progress, and knowledge — all in one place.
        </p>
      </motion.div>

      {/* Sections */}
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-24"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-400">{section.title}</h2>
          <p className="text-gray-300 text-base leading-relaxed">{section.content}</p>
        </motion.div>
      ))}
    </div>
  );
}

const sections = [
  {
    title: "🌟 Our Mission",
    content:
      "Empower teams to document knowledge and decision-making in a centralized, searchable, and structured way — boosting transparency and team velocity.",
  },
  {
    title: "🔧 Built For",
    content:
      "Engineering teams, product managers, and startup founders who want to keep a living history of what was done, why it was done, and how decisions evolved.",
  },
  {
    title: "🚀 Features at a Glance",
    content:
      `- Log anything: daily standups, decision notes, experiments, tech choices\n- Versioning & diffs\n- Tag system with trending insights\n- Reactions & engagement system\n- Invite team members by email\n- Role-based access (Admin, Member)\n- Powerful search + filters\n- GitHub-style version history for logs\n- Daily digest APIs`,
  },
  {
    title: "⚙️ Tech Stack",
    content:
      "Built with MERN (MongoDB, Express, React, Node.js), Prisma ORM, JWT auth, TailwindCSS, Shadcn/UI, Recharts, Framer Motion animations — and hosted on Vercel/Render.",
  },
  {
    title: "🧠 Core Values",
    content:
      "Knowledge ownership, visibility, decision accountability, async collaboration, and continuous improvement.",
  },
  {
    title: "💡 Ready to log your next insight?",
    content:
      "Try InsightLog today and bring order to your team's brain. Invite-only registration keeps things secure and focused!",
  },
];
