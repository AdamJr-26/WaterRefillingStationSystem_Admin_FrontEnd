import { useLocation, Navigate, Outlet } from "react-router-dom";

//
// useAuth is a custom hook returing the user's authentication
import useAuth from "../../hooks/useAuth";
import React from "react";

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
