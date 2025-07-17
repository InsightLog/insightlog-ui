
import { motion } from "framer-motion";

const features = [
    {
        title: "🧠 Intelligent Logs",
        desc: "Capture knowledge, decisions, and insights with rich markdown, tags, and version history."
    },
    {
        title: "👥 Team Collaboration",
        desc: "Invite members to your team, assign roles (Admin, Member), and track contributions easily."
    },
    {
        title: "📨 Email Invites",
        desc: "Admins can invite team members by email. Invited users are auto-joined and registered securely."
    },
    {
        title: "🔍 Powerful Search",
        desc: "Find logs using title, content, tags, author, or even team name using fuzzy keyword search."
    },
    {
        title: "📊 Reactions + Leaderboards",
        desc: "Like logs, view top contributors and trending logs across teams with real-time leaderboards."
    },
    {
        title: "📬 Daily Digest API",
        desc: "Custom daily digest emails using a simple API — stay informed without visiting the dashboard."
    },
    {
        title: "🔄 Version History",
        desc: "Track changes with version control on every log entry — perfect for auditing or rollback."
    },
    {
        title: "⚙️ RBAC + Auth",
        desc: "Secure login with JWT and role-based access control for Admins and Members."
    },
    {
        title: "🌐 Cross-Team View",
        desc: "View logs across teams or filter logs from specific teams using the elegant dropdown control."
    },
    {
        title: "🧪 CLI Support",
        desc: "Install the `insightlog-cli` package, log in securely, and create logs directly from your terminal with clean UX."
    }
];

export default function Features() {
    return (
        <motion.div
            className="min-h-screen bg-[#141322] text-white p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.h1
                className="text-4xl font-bold mb-10 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                🚀 Project Features
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        className="bg-[#1f1f2e] border border-white/10 rounded-xl p-6 shadow hover:shadow-xl transition"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
                        <p className="text-sm text-gray-300">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
