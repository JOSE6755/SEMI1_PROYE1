import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
/*import Upload from "./Components/Upload_file";
import Cards from "./Components/Cards";
import Home from "./Components/Home";*/
import "./index.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute/>}>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
