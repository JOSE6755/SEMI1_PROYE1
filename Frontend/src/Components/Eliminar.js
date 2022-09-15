import React, { useEffect, useRef, useState } from 'react'
import '../Styles/estilos.css'
import Select from 'react-select';
import useAuth from '../Auth/useAuth';
import Combobox from "react-widgets/Combobox";








function Eliminar() {

  const [files, setFiles] = useState([])
  const [viewPic, setViewPic] = useState([])
  
  const { username } = useAuth()
  const baseUrl = 'http://35.209.248.219:3000/api/usuario/delete/getFiles'
  const eliminarUrl='http://35.209.248.219:3000/api/usuario/deleteFile'
  console.log('------------------')
  console.log(username())
  console.log('------------------')

  const [nombre, setNombre] = useState([])
  const [value, setValue] = useState(null)
  //const [visibilidad, setVisibilidad] = useState(null)
  const [password, setPassword] = useState(null)

  const [selectedValued, setSelectedValue] = useState(null) //selectedValued es el valor que se selecciona en el filtro
  const handleInputChance = value => {
    setValue(value)
  }

  const handleChange = event => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    getOperations()
    console.log(value)
   
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
        console.log(respuesta)
        setFiles(respuesta.archivos)

        //setLogs(respuesta)
      }).catch(console.error)
  }


  function eliminar(){

    if (value!=null){
      //alert(value.visibilidad)
      deletePetition()
    }else{
      alert("NO HAS SELECCIONADO UN ARCHIVO")
    }
  }


  const deletePetition = async () => {
    const a={
      archivo: value.name,
      visibility: value.visibilidad,
      usuario:username(),
      pass: password
    }
    console.log("======================SADSAD==========================")
    console.log(a)
    await fetch(eliminarUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        archivo: value.name,
        visibility: value.visibilidad,
        usuario:username(),
        pass: password
      })

    })
      .then(resp => resp.json())
      .then(respuesta => {
        console.log("WEEEEEEEEENAAAAAAASSSSSSSS")
        console.log(respuesta)
       

        //setLogs(respuesta)
      }).catch(console.error)
  }

  console.log("ARCHIVOS")
  console.log(files)

  return (
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header"><h2>ELIMINAR ARCHIVO</h2></header>
        <section class="modal-body">
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
          </div>{value!=null &&           <div class="img-upload">
            <div class="imgPreview">
              <img src={value.imagen} />
            </div>
            <h4 class="h4-file">{value.name}</h4>
          </div>}
          <hr />
        </section>
        <h4>Confirmar Contraseña</h4>
        <input id="pass" type="password" v-model="pass"     name='pass'    onChange={handleChange}
        value={password}/>
        <footer class="modal-footer">
          <button type="button" class="btn-green" onClick={eliminar}>
            Eliminar
          </button>
          <button type="button" class="btn-green" >Cerrar</button>
        </footer>
      </div>
    </div>
  )
}

export default Eliminar