import { NavLink } from "react-router-dom";
import React from "react";
import "../Styles/Navbar.css";
export default function Navbar() {
  let activeList = {
    textDecoration: "underline",
  };
  return (
    <nav className="nav">
      <ul>
        <li className="nav_link">
          <NavLink
            to="/subir_arch"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Subir archivo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/edit_arch"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Editar Archivo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/delete_arch"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Eliminar Archivo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/add_friend"
            className="link"
            style={({ isActive }) => (isActive ? activeList : undefined)}
          >
            Agregar Amigo
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink
            to="/files"
            style={({ isActive }) => (isActive ? activeList : undefined)}
            className="link"
          >
            Ver Archivos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}