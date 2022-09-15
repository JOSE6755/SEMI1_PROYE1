import React from 'react'
import '../add.css'

function AddFriends() {


  const numbers = [{
    name: 'Jason ',
    age: 74,
    hasKilled: true,
    birthday: 'June 13, 1946',
  },
  {
    name: 'Juan',
    age: 74,
    hasKilled: true,
    birthday: 'June 13, 1946',
  },
  {
    name: 'Dani',
    age: 74,
    hasKilled: true,
    birthday: 'June 13, 1946',
  }]


  const listItems = numbers.map(({ name, age }) =>
  <div>
  <div class="card-image">
  <img src='https://i.imgur.com/wvxPV9S.png'/>
</div>
<div class="card-text">
  <h4>Nombre: {name}</h4>
  <p>Archivos Publicos:{age}</p>
  <button class="btn-gr" onClick={agregarAmigue}>
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



  function agregarAmigue(){
    alert('holaAmigue jsjs')
  }

  return (
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <h2>Agregar Amigos</h2>
          <hr />
          <input
            class="searchBar"
            placeholder="Busca un Usuario"
            type="text"
            v-model="busqueda"
          />
          <button class="btn-green" id="searchButton">
            Buscar
          </button>
        </header>

        <section class="modal-body">
          <div class="friends-list">
            <div
              id="user-info"
              v-for="user of filteredUsers"
              class="card-top"
              
            >
              {listItems}
            </div>
          </div>
        </section>

        <footer class="modal-footer">
          <button type="button" class="btn-green">Cerrar</button>
        </footer>
      </div>
    </div>
  )
}

export default AddFriends