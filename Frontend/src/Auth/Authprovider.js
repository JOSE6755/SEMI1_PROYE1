import React from 'react'
import { createContext,useState } from "react";

export const Authcontext=createContext({})

export default function Authprovider({children}) {
    const[auth,setAuth]=useState()

    return(

        <Authcontext.Provider value={{auth,setAuth}}>
            {children}
        </Authcontext.Provider>
    )
}
