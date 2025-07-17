import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import MemberDashboard from "@/components/Dashboard/MemberDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#141322] text-white p-8">
      {user?.role === "ADMIN" ? <AdminDashboard /> : <MemberDashboard />}
    </div>
  );
}
