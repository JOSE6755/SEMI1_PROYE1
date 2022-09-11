import React, { useState } from "react";
import logopdf from "../Images/PDF.png";
import logotxt from "../Images/TXT.png"
import "../Styles/Upload_file.css";
import axios from "axios";

export default function Upload() {
  const [fileInfo, setFileInfo] = useState({});
  const [preview, setPreview]=useState(null)

  const getFile=(e)=>{
    const file=e.target.files[0]
    const prueba=file.name.split(".")

    switch (prueba[1]) {
      case "pdf":
        setPreview(logopdf)
        break
      
      case "txt":
        setPreview(logotxt)
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
    console.log(fileInfo)

    try {
      const result= await axios.post("URL",data)
      console.log(result)
    } catch (ex) {
      console.log(ex)
    }
  }
  

  return (
    
      <form className="formu" onSubmit={upload}>
        <div className="archivo">
          <label for="name">Nombre archivo</label>
          <input type={"text"} name="name" className="textos" onChange={(e)=>{setFileInfo({...fileInfo,name:e.target.value})}} />
          
          <span>Archivo seleccionado</span>
          
          <input type={"file"} name="file" onChange={getFile} />
   
          <label for="radios">Tipo de archivo</label>
          <div name="radios">
            <label for="public">Publico</label>
            <input
              type="radio"
              value="public"
              name="public"
              checked={fileInfo.type === "public"}
              onChange={(e) => {
                setFileInfo({...fileInfo,type:e.target.value});
              }}
            />
            <label for="private">Privado</label>
            <input
              type="radio"
              value="private"
              name="private"
              checked={fileInfo.type === "private"}
              onChange={(e) => {
                setFileInfo({...fileInfo,type:e.target.value});
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
            <button type="submit">Subir</button>
          </div>
        </div>
      </form>
    
  );
}
