import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
/*import Upload from "./Components/Upload_file";
import Cards from "./Components/Cards";
import Home from "./Components/Home";*/
import "./index.css";
import AddFriends from "./Components/AddFriends";
import Editar from "./Components/Editar";
import VerArchivos from "./Components/VerArchivos";
import Eliminar from "./Components/Eliminar";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute/>}>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Navigate to="/login" replace/>}/>
          <Route path="/add" element={<AddFriends/>}/>
          <Route path="/edit" element={<Editar/>}/>
          <Route path="/seeFiles" element={<VerArchivos/>}/>
          <Route path="/delete" element={<Eliminar/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
