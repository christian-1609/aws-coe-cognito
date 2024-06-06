import { AuthLayout } from '../Layouts'
import { ConfirmationCode } from '../components/Confirmation'

export const ConfirmationPage = () => {
    return (
        <AuthLayout>
            <div className="mb-8 space-y-3">
                <p className="text-xl font-semibold">Cofirmation Sign Up</p>
                <p className="text-gray-500">Enter the code that you received by email, and we can access</p>
            </div>

            <ConfirmationCode />
        </AuthLayout>
    )
}
