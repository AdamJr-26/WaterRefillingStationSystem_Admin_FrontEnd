import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth";
import Admin from "../../pages/Admin";
import Loading from "../../pages/Loading";
export const ProtectRoutes = () => {
  const { isLoading, userProfile, userProfileError } = useAuth();
  const location = useLocation();

  return userProfile ? (
    <Admin />
  ) : !userProfile && !userProfileError ? (
    <Loading />
  ) : (
    <Navigate to="/login" state={{ from: location }} exact />
  );
};
