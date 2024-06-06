import { useContext } from "react"
import { AuthContext } from "../context"
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/Dashboard";
import { signOut } from "@aws-amplify/auth";

export const DashboardPage = () => {
    const { authState, logout } = useContext(AuthContext);

    const { user } = authState;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        logout();
        navigate('/', { replace: true });
    }

    return (
        <>
            <NavBar />
            <div className="bg-white p-4 w-full">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl text-center">Welcome {user?.name} !!</h1>

                    <div className="mt-8">
                        <button onClick={handleLogout} className="bg-red-200 p-2 text-red-500 rounded-[10px] hover:bg-red-50 px-[36px]">
                            LogOut
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

