import React, { useEffect, useRef, useState } from 'react'
import '../Styles/add.css'
import Select from 'react-select';
import useAuth from '../Auth/useAuth';
import {BrowserRouter as Router, Link} from 'react-router-dom';

function Editar() {


  const [nombre, setNombre] = useState([])
  const [files, setFiles] = useState([])
  const [newName, setNewName] = useState(null)

  const [selectedValued, setSelectedValue] = useState(null) //selectedValued es el valor que se selecciona en el filtro
  const [value, setValue] = useState(null)
  const baseUrl = 'http://semi1-g2-397791917.us-east-1.elb.amazonaws.com/api/usuario/delete/getFiles'
  const editUrl = 'http://semi1-g2-397791917.us-east-1.elb.amazonaws.com/api/usuario/editFile'
  const { username } = useAuth()
  const [visibilidad, setVisibilidad] = useState(null)
  const [password, setPassword] = useState(null)
  const handleInputChance = value => {
    setValue(value)
  }




  const handleChangeEdit = event => {
    setNewName(event.target.value);
  };
  const handleChange = event => {
    setPassword(event.target.value);
  };
  const handleChangeVisibility = event => {
    console.log(event.target.value)
    setVisibilidad(event.target.value);
  };


  useEffect(() => {
    getOperations()
  }, [])


  const getOperations = async () => {
    await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: username()
      })

    })
      .then(resp => resp.json())
      .then(respuesta => {
        console.log("WEEEEEEEEENAAAAAAASSSSSSSS")
        console.log(respuesta.archivos)
        setFiles(respuesta.archivos)

        //setLogs(respuesta)
      }).catch(console.error)
  }

  function editFile(){
    editPetition()
  }



  const editPetition = async () => {
    await fetch(editUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nuevoNombre: newName,
        archivo: value.name,
        nuevaVisibilidad:visibilidad,
        usuario:username() ,
        visibility:value.visibilidad,
        passw: password,
      })

    })
      .then(resp => resp.json())
      .then(respuesta => {
        console.log("WEEEEEEEEENAAAAAAASSSSSSSS")
        console.log(respuesta)
        setFiles(respuesta.archivos)
        alert(respuesta.message)

        //setLogs(respuesta)
      }).catch(console.error)
  }


  return (

    <div class="modal-backdrop" >
      <div class="modal" style={{width:600, height:600}}>
        <header class="modal-header"><h2>Editar Archivo</h2></header>
        <section class="modal-body" style={{width:600, height:600}}>
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'></div>
              <div className='col-md-4'>
              <Select
                  name="Objetos"
                  options={files}
                  value={value}
                  onChange={setValue}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name} // It should be unique value in the options. E.g. ID
                />
              </div>
              <div className='con-md-4'></div>
            </div>
          </div>
          <div class="img-upload">
            <div class="imgPreview">
            {value!=null &&           <div className="img-upload">
            <div className="imgPreview">
              <img src={value.imagen} />
            </div>
            <h4 className="h4-file">{value.name}</h4>
          </div>}
            </div>
            <h4 class="h4-file">{nombre}</h4>
          </div>
          <hr />
          <div class="file-info">
            <div class="nombre">
              <h4>Nuevo nombre del archivo</h4>
              <input
                id="input-nombre"
                type="text"
                v-model="nombreFinal"
                onChange={handleChangeEdit}
                value={newName}
              />
            </div>
            <h4 class="vis">Visibilidad</h4>
            <div class="labels">
              <label for="radio-yes" class="containerLab"
              >Publico
                <input
                  type="radio"
                  name="radio"
                  value="public"
                  onChange={handleChangeVisibility}
                />
                <span class="checkmark"></span>
              </label>
              <label for="radio-no" class="containerLab"
              >Privado
                <input
                  type="radio"
                  name="radio"
                  value="private"
                  id="priv"
                  onChange={handleChangeVisibility}
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </section>
        <h4>Confirmar Contraseña</h4>
        <input id="input-pass" type="password" v-model="pass"  onChange={handleChange}
        value={password} />
        <footer class="modal-footer">
          <button type="button" class="btn-green" onClick={editFile} >
            Editar Archivo
          </button>
          <Link to="/home">
        <button type="button" class="btn-green" >Cerrar</button>
        </Link>        </footer>
      </div>
    </div>
  )
}

export default Editar