import React, { useEffect } from 'react'
import { createContext,useState } from "react";

export const Authcontext=createContext({})

export default function Authprovider({children}) {
    const[auth,setAuth]=useState(()=>{
        const data=localStorage.getItem("user")
        if(data!==undefined){
            return JSON.parse(data)
        }else{
            return undefined
        }
    })

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(auth))
    },[auth])

    const login=(credentials)=>{
        setAuth(credentials)
    }

    const logout=()=>{
        localStorage.removeItem("user")
        setAuth(null)
    }

    const username=()=>{return auth.user}

    const isLogged=()=>auth

    const contextvalues={
        auth,login,logout,username,isLogged
    }

    return(

        <Authcontext.Provider value={contextvalues}>
            {children}
        </Authcontext.Provider>
    )
}
