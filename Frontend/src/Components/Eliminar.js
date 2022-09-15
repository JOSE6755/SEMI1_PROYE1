import React, { useEffect, useRef, useState } from 'react'
import '../estilos.css'
import Select from 'react-select';








function Eliminar() {

  const baseUrl='http://35.209.248.219/imagenes/'

  let list = [{ label: "hola.png", value: 1 },{ label: "So2.pdf", value: 2 },{ label: "mmm.txt", value: 3 }];
  const [nombre, setNombre] = useState([])
  const [inputvalue, setValue] = useState('')
  const [selectedValued, setSelectedValue] = useState(null) //selectedValued es el valor que se selecciona en el filtro
  const handleInputChance = value => {
    setValue(value)
  }

  const handleChange = value => {
    setSelectedValue(value)
    console.log(value)
    alert('Se eliminara '+value.label)
  }
  useEffect(() => {
    getOperations()
    setNombre('ola dani')
  }, [])


  const getOperations = async () => {
    await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
    })
        .then(resp => resp.json())
        .then(respuesta => {
          console.log("WEEEEEEEEENAAAAAAASSSSSSSS")
            console.log(respuesta)
            //setLogs(respuesta)
        }).catch(console.error)
}

  return (
    <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header"><h2>ELIMINAR ARCHIVO</h2></header>
      <section class="modal-body">
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>
              <Select options={list} value={selectedValued} OnInputChange={handleChange} onChange={handleChange} />
            </div>
            <div className='con-md-4'></div>
          </div>
        </div>
        <div class="img-upload">
          <div class="imgPreview">
            <img />
          </div>
          <h4 class="h4-file">{nombre}</h4>
        </div>
        <hr />
      </section>
      <h4>Confirmar Contraseña</h4>
      <input id="input-pass" type="password" v-model="pass" />
      <footer class="modal-footer">
        <button type="button" class="btn-green" >
          Eliminar
        </button>
        <button type="button" class="btn-green" >Cerrar</button>
      </footer>
    </div>
  </div>
  )
}

export default Eliminar