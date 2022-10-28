import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/contextHooks";

export default function ProtectedRoutes() {
  const auth = useAuth();
  const location = useLocation();

  return !!auth?.bearerToken ? (
    <Outlet />
  ) : !auth?.authenticationPending ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : null;
}
