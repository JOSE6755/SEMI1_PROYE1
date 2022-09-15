import React, { useEffect, useRef, useState } from 'react'
import '../Styles/estilos.css'
import useAuth from '../Auth/useAuth';


function VerArchivos() {
  const [files, setFiles] = useState([])
  const [component, setComponent] = useState([])
  const [selectedFile, setSelectedFile] = useState([])
  

  const { username } = useAuth()
  const baseUrl = `http://35.209.248.219:3000/api/usuario/seeAllFiles/${username()}`

  useEffect(() => {
    getOperations()
  }, [])



  function wenas(val) {
   // setSelectedFile(val.currentTarget.value)
    console.log(val.currentTarget.value)
    const myarray=val.currentTarget.value.split(',')
    setSelectedFile(myarray)
    console.log("+++++++++++++++++00")
    console.log(selectedFile)
  }

  const listItems = files.map(({ nombre, ext, fechaCreacion, propietario, image, url }) =>
      <div class="friends-list">
        <div
          id="user-info"
          v-for="file of Files"

          class="card-top"
        >
          <div class="card-image">
            {image != '' && <img src={image}></img>}
          </div>
          <div class="card-text">
            <h4>{nombre}</h4>
            <p>Propietario: {propietario}</p>
            <p>{fechaCreacion}</p>

            <button class="btn-gr" value={[url,image,ext]} onClick={wenas}>
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
  );




  function cerrar() {

  }





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
        console.log(respuesta.archivos)
        setFiles(respuesta.archivos)
        wenas()

        //setLogs(respuesta)
      }).catch(console.error)
  }
  return (


    <div class="modal-backdrop">
      <div class="modal" style={{ height:600}}>
        <header class="modal-header" >
          <h2>Archivos Publicos De Amigos</h2>
          <hr />
        </header>
        <section class="modal-body" style={{ height:600}}>
        {listItems}
        </section>
        <footer class="modal-footer" style={{ height:100}}>
          <button type="button" class="btn-green" onClick={cerrar}>Cerrar</button>
        </footer>
      </div>

      <div class="modal" style={{width:600, height:600}}>
        <header class="modal-header" style={{width:900}}>
          <h2>VISUALIZADOR</h2>
          <hr />
        </header>
        <section class="modal-body" style={{width:900, height: 600}}>
          {selectedFile!=null && <>

          {selectedFile[2]==='.pdf' && <embed type="application/pdf" style={{width:700, height:600}} src={'https://docs.google.com/viewer?url=' + selectedFile[0] +'&embedded=true'} />}
          {selectedFile[2]==='.txt' && <embed type="application/pdf" style={{width:700, height:600}}  src={'https://docs.google.com/viewer?url=' + selectedFile[0] +'&embedded=true'} />}
          {selectedFile[2]!=='.pdf' && <img className='img2' src={selectedFile[0]}></img>}
         
          </>}
        </section>
        <footer class="modal-footer">
        </footer>
      </div>
    </div>
  )
}

export default VerArchivos