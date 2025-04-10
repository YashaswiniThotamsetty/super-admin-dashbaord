
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    // Show a loading spinner or skeleton while checking authentication
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};
