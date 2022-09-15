import React from 'react'
import logopdf from "../Images/PDF.png";
import "../Styles/Cards.css";

export default function Cards({data}) {
  return (
    <div className="Card_container">
      <div className="left_side_image">
        <img src={logopdf} alt="pdf"/>
      </div>
      <div className="card_right_side">
        <p>Nombre:{data.name}</p>
        <p>Propietario: {data.propietario}</p>
        <p>Fecha de creacion: {data.fecha_creacion}</p>
        <p>Fecha de modificacion: {data.fecha_modificacion}</p>
        <button>Ver</button>
      </div>
    </div>
  );
}
