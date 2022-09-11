import { useContext } from "react";
import {Authcontext} from "./Authprovider";


export default function useAuth() {
    return useContext(Authcontext)
}
