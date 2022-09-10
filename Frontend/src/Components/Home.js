import React from 'react'
import Cards from "./Cards";
import "../Styles/Home.css";
import pdfimg from "../Images/PDF.png";
export default function Home() {
  return (
    <div className="container">
      <div className="left_side">
        <div className="User_info">
          <figure>
            <img src={pdfimg} alt="pdf" />
            <figcaption>Username</figcaption>
          </figure>
        </div>
        <div className="buttons">
          <button>Subir Archivo</button>
          <button>Editar Archivo</button>
          <button>Eliminar Archivo</button>
          <button>Agregar Amigo</button>
          <button>Ver Archivos</button>
        </div>
      </div>
      <div className="right_side">
      <div className="bordes">Publicos</div>
        <div className="right_side_up">
          
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          
        </div>
        <div className="bordes borde_bajo">hola </div>
        <div className="bordes">Privados</div>
        <div className="right_side_down">
          
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          
        </div>
        <div className="bordes borde_bajo">hola </div>
      </div>
    </div>
  );
}
