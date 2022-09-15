import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import Navbar from "../Components/Navbar";

export default function PrivateRoute() {
  const { isLogged } = useAuth();
  const location = useLocation();
  return isLogged()?<><Navbar/><Outlet /></> : <Navigate to="/login" replace />;
}
