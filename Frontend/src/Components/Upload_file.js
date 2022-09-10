import React, { useState } from "react";
import logopdf from "../Images/PDF.png";
import "../Styles/Upload_file.css";

export default function Upload() {
  const [typeOfFile, setTypeOfFile] = useState("");

  return (
    
      <form className="formu">
        <div className="archivo">
          <label for="name">Nombre archivo</label>
          <input type={"text"} name="name" className="textos" />
          
          <span>Archivo seleccionado</span>
          
          <input type={"file"} name="file" />
   
          <label for="radios">Tipo de archivo</label>
          <div name="radios">
            <label for="public">Publico</label>
            <input
              type="radio"
              value="public"
              name="public"
              checked={typeOfFile === "public"}
              onChange={(e) => {
                setTypeOfFile(e.target.value);
              }}
            />
            <label for="private">Privado</label>
            <input
              type="radio"
              value="private"
              name="private"
              checked={typeOfFile === "private"}
              onChange={(e) => {
                setTypeOfFile(e.target.value);
              }}
            />
          </div>
          <label for="pass">contrasenia</label>
          <input type={"password"} className="textos" name="pass"/>
        </div>
        <div className="img_submit">
          <div className="img_submit_preview">
            <img src={logopdf} alt="archivo" />
            <button type="button">Subir archivo </button>
          </div>
          <div className="img_submit_buttons">
            <button type="reset">Cancelar</button>
            <button type="submit">Subir</button>
          </div>
        </div>
      </form>
    
  );
}
