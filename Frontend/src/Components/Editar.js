import React, { useEffect, useRef, useState } from 'react'
import '../estilos.css'
import Select from 'react-select';

function Editar() {


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
    alert('has elegido editar '+value.label)
  }
  useEffect(() => {
    setNombre('ola dani')
  }, [])






  return (

    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header"><h2>Editar Archivo</h2></header>
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
          <div class="file-info">
            <div class="nombre">
              <h4>Nuevo nombre del archivo</h4>
              <input
                id="input-nombre"
                type="text"
                v-model="nombreFinal"

              />
            </div>
            <h4 class="vis">Visibilidad</h4>
            <div class="labels">
              <label for="radio-yes" class="containerLab"
              >Publico
                <input
                  type="radio"
                  name="radio"
                  value="Publico"
                  v-model="selectedVisibilidad"
                />
                <span class="checkmark"></span>
              </label>
              <label for="radio-no" class="containerLab"
              >Privado
                <input
                  type="radio"
                  name="radio"
                  value="Privado"
                  id="priv"

                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </section>
        <h4>Confirmar Contraseña</h4>
        <input id="input-pass" type="password" v-model="pass" />
        <footer class="modal-footer">
          <button type="button" class="btn-green" >
            Editar Archivo
          </button>
          <button type="button" class="btn-green" >Cerrar</button>
        </footer>
      </div>
    </div>
  )
}

export default Editar