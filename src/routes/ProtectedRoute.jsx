import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx"; 

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/v1/login" replace />;
  }

  return children;
}
