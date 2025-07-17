import { useAuth } from "@/context/AuthContext";
import RecentLogsCard from "./RecentLogCard";
import TrendingTagsCard from "./TrendingTagsCard";
import DailyDigestCard from "./DailyDigestCard";
import ReactionsCard from "./ReactionCard";
import LeaderboardCard from "./Leaderboard";
import KnowledgeGapsCard from "./KnowledgeGapsCard";

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div className="w-full">
      {/* 🔥 Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        {/* {user && (
          <p className="text-sm text-gray-400 mt-2 sm:mt-0">
            Logged in as:{" "}
            <span className="text-white font-medium">{user.name}</span> •{" "}
            <span className="uppercase text-cyan-400">{user.role}</span>
          </p>
        )} */}
      </div>

      {/* 🌈 Divider */}
      <div className="w-full h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-transparent mb-6 shadow-[0_0_20px_#00bcd4aa]"></div>

      {/* 📦 Member Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <div className="col-span-1 sm:col-span-2">
          <RecentLogsCard />
        </div>
        <div className="col-span-1 display flex flex-col gap-6 mt-2">
          <TrendingTagsCard />
          <ReactionsCard />
        </div>

        {/* Row 2 */}
        <div className="col-span-1">
          <DailyDigestCard />
          
        </div>
        <div className="col-span-1">
          <LeaderboardCard />
        </div>

        <div className="col-span-1">
          <KnowledgeGapsCard />
        </div>
      </div>
    </div>
  );
}
