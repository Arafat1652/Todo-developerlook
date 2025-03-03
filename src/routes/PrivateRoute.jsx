
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";




const PrivateRoute = ({children}) => {
    const {user, loading}= useAuth()
    const location = useLocation()


    if(loading){
        return <div className="text-center">
        <span className="loading loading-spinner loading-lg text-error mt-24"></span>
        </div>
    }
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;