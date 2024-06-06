import { AuthLayout } from "../Layouts"
import { SignUp } from "../components/SignUp"

export const SignUpPage = () => {
    return (
        <AuthLayout>
            <div className="mb-8 space-y-3">
                <p className="text-xl font-semibold">Sign Up</p>
                <p className="text-gray-500">Enter your email, and we'll send a code to your inbox.</p>
            </div>

            <SignUp />
        </AuthLayout>
    )
}
