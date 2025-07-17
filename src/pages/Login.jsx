
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import MotionWrapper from "@/components/MotionWrapper";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate("/v1/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);
  return (
    <MotionWrapper>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#290c27] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-0 overflow-y-hidden">
        <div className="flex flex-col md:flex-row bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden w-full max-w-6xl mb-10">
          {/* Left Illustration */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-b from-[#1e1e2f] to-[#1d1d30]">
            <img
              src="/lock-3d.png"
              alt="Secure Login"
              className="w-3/4 object-contain drop-shadow-2xl scale-110"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-10 flex items-center justify-center text-white bg-[#21213d]">
            <div className="w-full max-w-md space-y-6">
              <h2 className="text-4xl font-extrabold text-center tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-center text-gray-400">
                Sign in to your account
              </p>
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}
