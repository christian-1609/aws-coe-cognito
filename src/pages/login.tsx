import { AuthLayout } from '../Layouts';
import { Login } from '../components/Login';

export const LoginPage = () => {


    return (
        <AuthLayout>
            <div className="mb-8 space-y-3">
                <p className="text-xl font-semibold">Login</p>
                <p className="text-gray-500">Enter your email and your password, and we can access</p>
            </div>
            <Login />
        </AuthLayout>
    )
}
