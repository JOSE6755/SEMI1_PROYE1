import useAuto from "../Auth/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const {auth}=useAuto()
    const location=useLocation()

    return(
        auth?.user ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace/>
    )
}