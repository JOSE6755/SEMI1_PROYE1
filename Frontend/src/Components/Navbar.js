import { NavLink } from "react-router-dom";
import React from "react";
import "../Styles/Navbar.css";
import useAuth from "../Auth/useAuth";
export default function Navbar() {

  //sssscons

  const {logout}=useAuth()
  let activeList = {
    textDecoration: "underline",
  };
  return (
    <nav className="nav">
      <ul>
        <li className="nav_link">
          <NavLink
            to="/upload"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Subir archivo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/edit"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Editar Archivo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/delete"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Eliminar Archivo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/add"
            className="link"
            style={({ isActive }) => (isActive ? activeList : undefined)}
          >
            Agregar Amigo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/seeFiles"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Ver Archivos


          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
            onClick={logout}
           >
           LogOut
          </NavLink>
        </li>
      </ul>
    </nav>
  );
  
}