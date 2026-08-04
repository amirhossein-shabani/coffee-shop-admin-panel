import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ allowedRoles, children }) {
  const { loading, profile, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-coffee-light/50 text-coffee-dark">
        درحال بارگذاری...
      </div>
    );
  }

  // 🔒 not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 🔐 role check (admin + viewer supported)
  const role = profile?.role ?? "none";

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute;
