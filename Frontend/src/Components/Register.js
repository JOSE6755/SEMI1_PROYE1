import React, {useState } from "react";
import "../Styles/Register.css";
import logopdf from "../Images/PDF.png";
import axios from "axios";

export default function Register() {
  const [userInfo, setUserInfo] = useState({ user: "", correo: "", pass: "" });
  const [image, setImage] = useState({preview:null,imagen:null});

  const handleImage = (e) => {
    const [files] = e.target.files;
    if (files) {
      
      const reader = new FileReader();

      reader.onload = () => {
        
        if (reader.readyState === 2) {
          setImage({...image,imagen:e.target.files[0] ,preview:reader.result,});
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const upload=async (e)=>{
    e.preventDefault();
    const confirm=document.getElementById("CUpass").value
    if(confirm!==userInfo.pass){
      window.alert("Las contraseñas no coinciden")
      return
    }
    if(image.imagen===null){
      window.alert("La imagen es un campo obligatorio")
      return
    }
    const data=new FormData()
    data.append("imagen",image.imagen)
    data.append("info",JSON.stringify(userInfo))

    try{
      const res=axios.post("http://35.209.248.219:3000/api/usuario/registro",data);
      console.log(res)
    }catch(ex){
      console.log(ex)
    }
  }

  

  return (
    <div>
      <form className="Containter" onSubmit={upload}>
        <div className="DataUser">
          <label className="Datauser_Label" for="username">
            Username
            <input
              className="Datauser_Input"
              type="text"
              name="username"
              id="username"
              onChange={(e) =>
                setUserInfo({ ...userInfo, user: e.target.value })
              }
              required
            />
          </label>
          <label className="Datauser_Label" for="Umail">
            Email
            <input
              className="Datauser_Input"
              type="email"
              name="Umail"
              id="Umail"
              onChange={(e) =>
                setUserInfo({ ...userInfo, correo: e.target.value })
              }
              required
            />
          </label>
          <label className="Datauser_Label" for="Upass">
            Password
            <input
              className="Datauser_Input"
              type="password"
              name="Upass"
              id="Upass"
              onChange={(e) =>
                setUserInfo({ ...userInfo, pass: e.target.value })
              }
              required
            />
          </label>
          <label className="Datauser_Label" for="CUpass">
            Confirm Password
            <input
              className="Datauser_Input"
              type="password"
              name="CUpass"
              id="CUpass"
              required
            />
          </label>

          <div className="userImage">
            <div className="userImagePreview">
              {image.preview != null ? (
                <figure>
                  <img id="preview" src={image.preview} alt="logo" />
                </figure>
              ) : (
                <figure>
                  <img id="preview" src={logopdf} alt="logo" />
                </figure>
              )}
              <input type={"submit"} value="Submit" />
              <br />
              <label required>
                <input type={"file"} onChange={handleImage} accept="image/*"/>
                Icono
              </label>
            </div>
            <div className="userImageSubmit">
              <input type={"submit"} />
              
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
