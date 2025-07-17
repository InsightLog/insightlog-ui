import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LogEditor from "../pages/LogEditor";
import TeamLogs from "../pages/TeamLogs";
import Login from "../pages/Login";
import AdminRegister from "../pages/AdminRegister";
import AllTeams from "../pages/Admin/allTeams";
import AddTeam from "../pages/Admin/addTeams";
import AssignMembers from "../pages/Admin/assignMembers";
import CLIPage from "../pages/cli";
import AllUsersPage from "../pages/Admin/AllUser";
import NotFound from "../pages/NotFound";
// ✅ Route protection
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedRoute from "./ProtectedRoute"; // You should have this created
import LandingPage from "../pages/LandingPage";
import Features from "../pages/Features";
import AboutPage from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/v1/login" element={<Login />} />
      <Route path="/v1/cli-docs" element={<CLIPage />} />
      <Route path="/v1/features" element={<Features />} />
      <Route path="/v1/about" element={<AboutPage />} />
      <Route path="/v1/admin/register" element={<AdminRegister />} />
      <Route path="/v1/invite/register" element={<AdminRegister />} />

      {/* 🔐 Logged-in User Routes */}
      <Route
        path="/v1/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/v1/log/editor"
        element={
          <ProtectedRoute>
            <LogEditor />
          </ProtectedRoute>
        }
      />

      {/* 🔐 Admin-only Routes */}
      <Route
        path="/v1/admin/teams"
        element={
          <ProtectedAdminRoute>
            <AllTeams />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/v1/admin/teams/add"
        element={
          <ProtectedAdminRoute>
            <AddTeam />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/v1/admin/teams/:teamId/invite"
        element={
          <ProtectedAdminRoute>
            <AssignMembers />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/v1/admin/users"
        element={
          <ProtectedAdminRoute>
            <AllUsersPage />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}
