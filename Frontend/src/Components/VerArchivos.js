import React, { useState } from 'react'

function VerArchivos() {

const archivo={
  nombre: "Wenas.pdf",
  fecha_subida: "2/2/1850",
  username:"dani lopes",
  tipo:"Imagen"
}




  function wenas(){

  }
  function showImage(){
    alert('nam nam nam nam')
  }


  function cerrar(){

  }
  return (
    <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <h2>Archivos Publicos De Amigos</h2>
        <hr />
      </header>

      <section class="modal-body">
        <div class="friends-list">
          <div
            id="user-info"
            v-for="file of Files"
            
            class="card-top"
          >
            <div class="card-image">
              {archivo.tipo === 'Imagen' && <img src='https://imgur.com/wvxPV9S.png'></img>} 
              <img v-else-if="file.tipo === 'Pdf'"  />
            </div>
            <div class="card-text">
              <h4>{archivo.nombre}</h4>
              <p>Propietario: {archivo.username}</p>
              <p>{ archivo.fecha_subida }</p>
              <button class="btn-gr" onClick={wenas}>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <button type="button" class="btn-green" onClick={cerrar}>Cerrar</button>
      </footer>
    </div>
  </div>
  )
}

export default VerArchivos