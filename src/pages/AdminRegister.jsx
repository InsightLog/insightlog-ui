import { useState, useEffect } from "react";
import { LockClosedIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "@/utils/api";
import MotionWrapper from "@/components/MotionWrapper";
import { useAuth } from "@/context/AuthContext";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user } = useAuth();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const teamId = query.get("teamId");
  const inviteEmail = query.get("email");

  useEffect(() => {
    if (inviteEmail) {
      setForm((prev) => ({ ...prev, email: inviteEmail }));
    }
  }, [inviteEmail]);

  useEffect(() => {
    if (user) {
      navigate("/v1/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (form.password !== form.confirm) {
      return setErrorMsg("Passwords do not match");
    }

    // Protect member registration without invite
    // if (!window.location.pathname.includes("/admin") && !form.teamId) {
    //   toast.error("You need to be invited by an admin to register.");
    //   return;
    // }

    try {
      setLoading(true);
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        ...(teamId && { teamId }),
      };

      const res = await api.post("/auth/register", payload);
      const { token, user } = res.data;

      login({ ...user, token });
      navigate("/v1/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionWrapper>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#290c27] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-8">
        <div className="flex flex-col md:flex-row bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden max-w-6xl -mt-2">
          {/* Left Illustration */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-b from-[#1e1e2f] to-[#1d1d30]">
            <img
              src="/lock-3d.png"
              alt="Register"
              className="w-3/4 object-contain drop-shadow-2xl scale-110"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-10 flex items-center justify-center text-white bg-[#21213d]">
            <div className="w-full max-w-md space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">
                {teamId && inviteEmail ? "Create Member Account (Invited)" : "Create Admin Account"}
              </h2>
              <p className="text-sm text-center text-gray-400">
                {teamId && inviteEmail
                  ? `You've been invited to join a team on InsightLog`
                  : "Register to start using InsightLog"}
              </p>
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400 text-center"
                >
                  {errorMsg}
                </motion.p>
              )}

              <form onSubmit={handleRegister} className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="peer w-full px-4 py-3 rounded-md bg-gray-900 text-white placeholder-transparent border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-0 text-sm text-purple-400 transition-all
  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-base
  peer-placeholder-shown:text-gray-600
  peer-focus:top-0
  peer-focus:text-sm
  peer-focus:text-purple-400
  peer:not(:placeholder-shown):top-0
  peer:not(:placeholder-shown):text-sm
  peer:not(:placeholder-shown):text-purple-400"
                  >
                    Full Name
                  </label>
                  <UserIcon className="w-5 h-5 text-gray-500 absolute right-4 top-3.5" />
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    readOnly={!!inviteEmail}
                    className={`peer w-full px-4 py-3 rounded-md bg-gray-900 text-white placeholder-transparent border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 
  ${inviteEmail ? "grayscale opacity-70 cursor-not-allowed" : ""}`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-0 text-sm text-purple-400 transition-all
  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-base
  peer-placeholder-shown:text-gray-600
  peer-focus:top-0
  peer-focus:text-sm
  peer-focus:text-purple-400
  peer:not(:placeholder-shown):top-0
  peer:not(:placeholder-shown):text-sm
  peer:not(:placeholder-shown):text-purple-400"
                  >
                    Email address
                  </label>
                  <EnvelopeIcon className="w-5 h-5 text-gray-500 absolute right-4 top-3.5" />
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="peer w-full px-4 py-3 rounded-md bg-gray-900 text-white placeholder-transparent border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-0 text-sm text-purple-400 transition-all
  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-base
  peer-placeholder-shown:text-gray-600
  peer-focus:top-0
  peer-focus:text-sm
  peer-focus:text-purple-400
  peer:not(:placeholder-shown):top-0
  peer:not(:placeholder-shown):text-sm
  peer:not(:placeholder-shown):text-purple-400"
                  >
                    Password
                  </label>
                  <LockClosedIcon className="w-5 h-5 text-gray-500 absolute right-4 top-3.5" />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    required
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="peer w-full px-4 py-3 rounded-md bg-gray-900 text-white placeholder-transparent border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="confirm"
                    className="absolute left-4 top-0 text-sm text-purple-400 transition-all
  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-base
  peer-placeholder-shown:text-gray-600
  peer-focus:top-0
  peer-focus:text-sm
  peer-focus:text-purple-400
  peer:not(:placeholder-shown):top-0
  peer:not(:placeholder-shown):text-sm
  peer:not(:placeholder-shown):text-purple-400"
                  >
                    Confirm Password
                  </label>
                  <LockClosedIcon className="w-5 h-5 text-gray-500 absolute right-4 top-3.5" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg font-semibold text-white transition"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {/* Redirect + Toast CTA */}
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <a href="/v1/login" className="text-purple-400 hover:underline">
                    Sign in
                  </a>
                </div>

                {!inviteEmail && <div className="text-center text-sm text-gray-400 mt-1">
                  Want to register as a member?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      toast("Please contact your admin to invite you to a team.", {
                        icon: "📩",
                        style: {
                          background: "#1e1e2f",
                          color: "#fff",
                          border: "1px solid #555",
                        },
                      })
                    }
                    className="text-purple-400 hover:underline"
                  >
                    Click here
                  </button>
                </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}
