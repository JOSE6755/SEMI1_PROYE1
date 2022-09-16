import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../Styles/add.css'
import useAuth from '../Auth/useAuth';


function AddFriends() {

  const { username } = useAuth()
  const [friends, setFriends] = useState([])
  const [newFriend, setNewFriend] = useState(null)
  const [query, setQuery] = useState("")

  const baseUrl = `http://35.209.248.219:3000/api/usuario/getAllUsers/${username()}`
  const newFriendUrl = 'http://35.209.248.219:3000/api/usuario/addFriend'



  const listItems = friends.map(({ username, avatar, archivosPublicos }) =>
    <div>
      <div class="card-image">
        <img src={avatar} />
      </div>
      <div class="card-text">
        <h4>Nombre: {username}</h4>
        <p>Archivos Publicos:{archivosPublicos}</p>
        <button class="btn-gr" value={[username]} onClick={agregarAmigue} >
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );


  useEffect(() => {
    getOperations()
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
        // console.log("WEEEEEEEEENAAAAAAASSSSSSSS")
        console.log(respuesta)
        console.log(respuesta.usuarios)
        setFriends(respuesta.usuarios)
        // wenas()

        //setLogs(respuesta)
      }).catch(console.error)
  }



  function agregarAmigue(val) {
    setNewFriend(val.currentTarget.value)
    console.log(val.currentTarget.value)
    const addFriendPetition = async () => {
      const a = {
        username: username(),
        newFriend: val.currentTarget.value
      }
      console.log("======================SADSAD==========================")
      console.log(a)
      await fetch(newFriendUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username(),
          newFriend: val.currentTarget.value
        })

      })
        .then(resp => resp.json())
        .then(respuesta => {
          console.log("WEEEEEEEEENAAAAAAASSSSSSSS")
          console.log(respuesta)
          alert(respuesta.message)


          //setLogs(respuesta)
        }).catch(console.error)
    }

    addFriendPetition()
  }


  console.log(query)

  return (
    <div class="modal-backdrop" >
      <div class="modal" style={{ height: 600 }} >
        <header class="modal-header">
          <h2>Agregar Amigos</h2>
          <hr />
          <input
            class="searchBar"
            placeholder="Busca un Usuario"
            type="text"
            v-model="busqueda"
            onChange={event => setQuery(event.target.value)}
          />
          <button class="btn-green" id="searchButton"  >
            Buscar
          </button>
        </header>

        <section class="modal-body" style={{ height: 400 }}>
          <div class="friends-list" >
            <div
              id="user-info"
              v-for="user of filteredUsers"
              class="card-top"
            >
              {
                friends.filter(post => {
                  if (query === '') {
                    return post;
                  } else if (post.username.toLowerCase().includes(query.toLowerCase())) {
                    return post;
                  }
                }).map((post, index) => (
                  <div className="box" key={index}>
                    <div>
                      <div class="card-image">
                        <img src={post.avatar} />
                      </div>
                      <div class="card-text">
                        <h4>Nombre: {post.username}</h4>
                        <p>Archivos Publicos:{post.archivosPublicos}</p>
                        <button class="btn-gr" value={[post.username]} onClick={agregarAmigue} >
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
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </section>

        <footer class="modal-footer">
          <Link to="/home">
            <button type="button" class="btn-green" >Cerrar</button>
          </Link>

        </footer>
      </div>
    </div>
  )
}

export default AddFriends