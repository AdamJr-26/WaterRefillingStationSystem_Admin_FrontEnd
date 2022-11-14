import { Outlet, Navigate,useLocation } from "react-router-dom";
import { useAuth } from "../auth";
import Admin from "../../pages/Admin";

export const ProtectRoutes = () => {
  const location = useLocation();

  const { cookies } = useAuth();

  return cookies?.user ? <Admin /> : <Navigate to="/login" state={{ from: location }} replace />;;
};
