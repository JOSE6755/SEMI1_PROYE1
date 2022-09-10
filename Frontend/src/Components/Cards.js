import React from 'react'
import logopdf from "../Images/PDF.png";
import "../Styles/Cards.css";

export default function Cards() {
  return (
    <div className="Card_container">
      <div className="left_side_image">
        <img src={logopdf} alt="pdf"/>
      </div>
      <div className="card_right_side">
        <p>Nombre: Jose</p>
        <p>Propietario: Jose</p>
        <p>Fecha: 20/05/2022</p>
        <button>Ver</button>
      </div>
    </div>
  );
}
