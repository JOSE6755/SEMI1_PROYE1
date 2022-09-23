import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import "../Styles/Home.css";
import pdfimg from "../Images/PDF.png";
import useAuth from "../Auth/useAuth";
import axios from "axios";
export default function Home() {
  const { username } = useAuth();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getfiles();
  }, []);

  const getfiles = async () => {
    try {
      const result = await axios.get(
        `http://semi1-g2-397791917.us-east-1.elb.amazonaws.com/api/user/${username()}`
      );
      setUserData(result.data);
      console.log(result.data)
    } catch (ex) {}
  };

  return (
    <div className="Home_container">
      <div className="left_side">
        <div className="User_info">
          <figure >
            {userData !== null ? (
              <>
                <img src={userData.userImage} alt="pdf"/>{" "}
                <figcaption>{username()}</figcaption>
              </>
            ) : (
              <>
                <img src={pdfimg} alt="pdf" />
                <figcaption>Username</figcaption>
              </>
            )}
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
          {userData !== null ? (
            userData.PubFiles.map((data) => {
              return <Cards data={data} />;
            })
          ) : (
            <h2>No hay archivos</h2>
          )}
        </div>
        <div className="bordes borde_bajo">hola </div>
        <div className="bordes">Privados</div>
        <div className="right_side_down">
          {userData !== null ? (
            userData.privFiles.map((data) => {
              return <Cards data={data} />;
            })
          ) : (
            <h2>No hay archivos</h2>
          )}
        </div>
        <div className="bordes borde_bajo">hola </div>
      </div>
    </div>
  );
}
