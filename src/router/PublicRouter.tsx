import { useContext } from "react"
import { AuthContext } from "../context"
import { Navigate } from "react-router-dom";

export const PublicRouter = ({ children }: { children: React.ReactNode }) => {

    const { authState: { logged } } = useContext(AuthContext);

    return (!logged) ? children : <Navigate to={'/dashboard'} />
}
