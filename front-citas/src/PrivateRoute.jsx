import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const stored = localStorage.getItem("data");
    if(!stored){
        return <Navigate to="/" replace />
    }

    return children;
}