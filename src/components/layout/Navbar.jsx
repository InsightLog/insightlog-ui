import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import TryDemoDialog from "@/components/modals/TryDemoDialog";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDemoDialog, setShowDemoDialog] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#1e1e2f]/80 text-white px-6 py-4 shadow-md border-b border-white/10">
      <div className="flex justify-between items-center">
        {/* 🔰 Logo + App Name */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          <span className="text-cyan-400">Insight</span>Log
        </Link>

        {/* 🕹️ Mobile Toggle */}
        <button className="sm:hidden" onClick={toggleMenu}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* 🧭 Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/v1/dashboard" className="hover:text-cyan-400">Dashboard</Link>
              <Link to="/v1/log/editor" className="hover:text-cyan-400">Logs</Link>
              {user.role === "ADMIN" && <Link to="/v1/admin/teams" className="hover:text-cyan-400">Teams</Link>}
              {user.role === "ADMIN" && <Link to="/v1/admin/users" className="hover:text-cyan-400">Users</Link>}
              <Link to="/v1/cli-docs" className="hover:text-cyan-400">CLI</Link>

              <span className="bg-cyan-700/20 px-3 py-1 rounded-full text-xs font-medium uppercase">
                {user.role}
              </span>

              <div className="relative group">
                {/* Avatar Trigger */}
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold cursor-pointer">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-0 bg-[#2a2a3d] rounded-md shadow-lg p-2 hidden group-hover:block z-10 w-40 text-sm">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/settings")}
                    className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded"
                  >
                    Settings
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-red-400 hover:bg-white/10 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>

            </>
          ) : (
            <>
              <button
                onClick={() => setShowDemoDialog(true)}
                className="hover:text-cyan-400"
              >
                Try Demo
              </button>

              <TryDemoDialog open={showDemoDialog} onClose={() => setShowDemoDialog(false)} />
              <Link to="/v1/cli-docs" className="hover:text-cyan-400">CLI</Link>
              <Link to="/v1/features" className="hover:text-cyan-400">Features</Link>
              <Link to="/v1/about" className="hover:text-cyan-400">About</Link>

              <Link to="/v1/login" className="px-4 py-2 rounded-lg border border-cyan-400 hover:bg-cyan-400 hover:text-black transition">
                Log In
              </Link>
              <Link to="/v1/admin/register" className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-600 transition">
                Admin Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 📱 Mobile Nav */}
      {open && (
        <div className="sm:hidden mt-4 flex flex-col gap-3">
          {user ? (
            <>
              <Link to="/v1/dashboard" onClick={toggleMenu}>Dashboard</Link>
              <Link to="/v1/log/editor" onClick={toggleMenu}>Logs</Link>
              {user.role === "ADMIN" && <Link to="/v1/admin/teams" onClick={toggleMenu}>Teams</Link>}
              {user.role === "ADMIN" && <Link to="/v1/admin/users" onClick={toggleMenu}>Users</Link>}
              <Link to="/v1/cli-docs" onClick={toggleMenu}>CLI</Link>
              <hr className="border-white/10" />
              <div className="flex items-center justify-between px-1">
                <span className="uppercase text-xs bg-cyan-700/20 px-2 py-1 rounded-full">
                  {user?.role}
                </span>
                <button onClick={logout} className="text-red-400 text-sm hover:underline">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/v1/cli-docs" onClick={toggleMenu}>CLI</Link>
              <Link to="/v1/features" onClick={toggleMenu}>Features</Link>
              <Link to="/v1/about" onClick={toggleMenu}>About</Link>
              <Link to="/v1/login" onClick={toggleMenu} className="border border-cyan-400 rounded px-4 py-2 text-center">Log In</Link>
              <Link to="/v1/admin/register" onClick={toggleMenu} className="bg-cyan-500 rounded px-4 py-2 text-center text-black font-semibold">Admin Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
