import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Auth/useAuth";

export default function PrivateRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    auth.user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    )
  ) : (
    <Navigate to="/login" replace />
  );
}
