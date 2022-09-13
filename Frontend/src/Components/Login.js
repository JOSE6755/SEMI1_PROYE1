import axios from "axios";
import React, { useState } from "react";
//import { Redirect } from "react-router";
//import useAuth from "../Auth/UseAuth";
import "../Styles/Login.css"
//import axios from "axios";

export default function Login() {
    
    const [datos, setDatos] = useState({ user: null, pass: null })
    /*async function probando(e) {
        if (datos.userName != "admin") {
            e.preventDefault()
            let usuario = null
            await axios.get(`http://localhost:3100/login/${datos.userName}/${datos.password}`)
                .then(response => {
                    console.log(response.data, "hola")
                    usuario = response.data

                }).catch(err => {
                    console.log(err)
                })
            await login(usuario)
        }else{
            login({user:"administrador",role:"Admin"})
        }
    }*/

    const verify=async (e)=>{
        e.preventDefault()
        const encode=Buffer.from(JSON.stringify(datos)).toString("base64")
        try {
            const result=await axios.get(`http://35.209.248.219:3000/api/usuario/login/${encode}`)
        } catch (ex) {
            console.log(ex.response.data.message)
        }

    }

    return (
        <div id="CLogin">
            <form className="Login" onSubmit={verify}>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(e) => setDatos({ ...datos, user: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setDatos({ ...datos, pass: e.target.value })} />
                <input type="submit" value="Login" />
                <a href="/" color="white">¿No tienes cuenta?</a>
            </form>
            
        </div>
        

    );
}