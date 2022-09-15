import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../Auth/useAuth";
//import { Redirect } from "react-router";
//import useAuth from "../Auth/UseAuth";
import "../Styles/Login.css"
//import axios from "axios";

export default function Login() {
    const navegador=useNavigate()
    const {login}=useAuth()
    const [datos, setDatos] = useState({ user: null, pass: null })


    const verify=async (e)=>{
        e.preventDefault()
        const encode=Buffer.from(JSON.stringify(datos)).toString("base64")
        try {
            const result=await axios.get(`http://35.209.248.219:3000/api/usuario/login/${encode}`)
            login(result.data)
            console.log(result)
            navegador("/seeFiles",{replace:true})
            navegador("/delete",{replace:true})
            navegador("/edit",{replace:true})
        } catch (ex) {
            console.log(ex)
        }

    }

    return (
        <div id="CLogin">
            <form className="Login" onSubmit={verify}>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(e) => setDatos({ ...datos, user: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setDatos({ ...datos, pass: e.target.value })} />
                <input type="submit" value="Login" />
                <a href="/register" color="white">¿No tienes cuenta?</a>
            </form>
            
        </div>
        

    );
}