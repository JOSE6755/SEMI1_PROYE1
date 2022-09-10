import { useContext } from "react";
import Authcontext from "./Authprovider";
export default function useAuto() {
    return useContext(Authcontext)
}
