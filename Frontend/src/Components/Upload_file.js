import React, { useState } from "react";
import logopdf from "../Images/PDF.png";
import "../Styles/Upload_file.css";
import axios from "axios";
import useAuth from "../Auth/useAuth";

export default function Upload() {
  const {username}=useAuth()
  const [fileInfo, setFileInfo] = useState({propietario:username()});
  const [preview, setPreview]=useState(null)

  const getFile=(e)=>{
    const file=e.target.files[0]
    setFileInfo({...fileInfo,file:file})
    const prueba=file.name.split(".")

    switch (prueba[1]) {
      case "pdf":
        setPreview(logopdf)
        break
      
      case "txt":
        setPreview(null)
        break
    
      default:
        const reader=new FileReader()
        reader.onload=()=>{
          if(reader.readyState===2){
            setPreview(reader.result)
          }
        }
        reader.readAsDataURL(file)
        break
    }
  }


  const upload=async (e)=>{
    e.preventDefault();

    const data=new FormData()
    data.append("file",fileInfo.file)
    delete fileInfo.file
    data.append("info",JSON.stringify(fileInfo))
    console.log(data)

    try {
      const result= await axios.post("http://semi1-g2-397791917.us-east-1.elb.amazonaws.com/api/usuario/upload",data)
      console.log(result)
    } catch (ex) {
      console.log(ex)
    }
  }
  

  return (
    
      <form className="formu" onSubmit={upload}>
        <div className="archivo">
          <label for="name">Nombre archivo</label>
          <input type={"text"} name="name" className="textos" onChange={(e)=>{setFileInfo({...fileInfo,filename:e.target.value})}} />
          
          <span>Archivo seleccionado</span>
          
          <input type={"file"} name="file" onChange={getFile} />
   
          <label for="radios">Tipo de archivo</label>
          <div name="radios">
            <label for="public">Publico</label>
            <input
              type="radio"
              value="public"
              name="public"
              checked={fileInfo.visibility === "public"}
              onChange={(e) => {
                setFileInfo({...fileInfo,visibility:e.target.value});
              }}
            />
            <label for="private">Privado</label>
            <input
              type="radio"
              value="private"
              name="private"
              checked={fileInfo.visibility === "private"}
              onChange={(e) => {
                setFileInfo({...fileInfo,visibility:e.target.value});
              }}
            />
          </div>
          <label for="pass">contrasenia</label>
          <input type={"password"} className="textos" name="pass" onChange={(e)=>setFileInfo({...fileInfo,pass:e.target.value})}/>
        </div>
        <div className="img_submit">
          <div className="img_submit_preview">
            <img src={preview} alt="archivo" />
          </div>
          <div className="img_submit_buttons">
            <button type="reset">Cancelar</button>
            <button type="submit" onClick={upload}>Subir</button>
          </div>
        </div>
      </form>
    
  );
}