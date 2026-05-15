import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";

const ProtectedRoute = ({ children }) => {
  const { booting, isAuthenticated } = useAuth();

  if (booting) {
    return (
      <div className="min-h-screen bg-stone-50 p-6 dark:bg-gray-950">
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
