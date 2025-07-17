import RecentLogsCard from "./RecentLogCard";
import TrendingTagsCard from "./TrendingTagsCard";
import DailyDigestCard from "./DailyDigestCard";
import LogsGrowthChart from "./LogsGrowthChart";
import ReactionsCard from "./ReactionCard";
import LeaderboardCard from "./Leaderboard";
import KnowledgeGapsCard from "./KnowledgeGapsCard";
import AllUsersCard from "./AllUsersCard";
import AllTeamsCard from "./AllTeamsCard";
import { useAuth } from "@/context/AuthContext";
export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="w-full">
      {/* 🔥 Dashboard Title */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          📊 Dashboard
        </h1>

        {/* {user && (
          <p className="text-sm text-gray-400 mt-2 sm:mt-0">
            Logged in as:{" "}
            <span className="text-white font-medium">{user.name}</span> •{" "}
            <span className="uppercase text-cyan-400">{user.role}</span>
          </p>
        )} */}
      </div>
      <div className="w-full h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-transparent mb-6 shadow-[0_0_20px_#00bcd4aa]"></div>
      {/* 📦 Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1: Graph + Leaderboard */}
        <div className="h-full flex flex-col lg:col-span-2 sm:col-span-2 col-span-1">
          <LogsGrowthChart />
        </div>
        <div className="h-full flex flex-col">
          <LeaderboardCard />
        </div>

        {/* Row 2: Logs + Knowledge Gaps + Tags */}
        <div className="h-full flex flex-col lg:col-span-2 sm:col-span-2 col-span-1">
          <RecentLogsCard />
        </div>
        <div className="h-full flex flex-col gap-6">
          <KnowledgeGapsCard />
          <TrendingTagsCard />
        </div>

        {/* Row 3: Reactions + Digest */}
        <div className="h-full flex flex-col">
          <ReactionsCard />
          <AllUsersCard />
        </div>
        <div className="h-full flex flex-col">
          <DailyDigestCard />
        </div>

        {/* Row 4: Teams */}
        <div className="h-full flex flex-col">
          <AllTeamsCard />
        </div>
      </div>
    </div>
  );
}
