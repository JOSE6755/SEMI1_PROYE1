import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Auth/useAuth";

export default function PrivateRoute() {
  const { isLogged } = useAuth();
  const location = useLocation();
  return isLogged()?<Outlet /> : <Navigate to="/login" replace />;
}
