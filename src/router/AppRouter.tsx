import { Route, Routes } from "react-router-dom"
import { DashboardPage, LoginPage, SignUpPage } from "../pages"
import { PrivateRouter } from "./PrivateRouter"
import { PublicRouter } from "./PublicRouter"
import { ConfirmationPage } from "../pages/confirmation"

export const AppRouter = () => {

    return (
        <Routes>

            <Route path="/*" element={
                <PublicRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/confirmation" element={<ConfirmationPage />} />
                    </Routes>
                </PublicRouter>
            } />

            <Route path="dashboard/*" element={
                <PrivateRouter>
                    <DashboardPage />
                </PrivateRouter>}
            />

        </Routes>
    )
}