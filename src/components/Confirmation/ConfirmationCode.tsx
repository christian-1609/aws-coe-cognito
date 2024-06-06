import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { IFormValidation } from "../Login/Login";
import { Input } from "../UI/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
// Add code

const formData = {
    confirmationCode: ''
}

const codeConfirmed = new RegExp(/^[0-9]{6}$/);

const formValidations: IFormValidation = {
    confirmationCode: [(value: string) => codeConfirmed.test(value), 'Code is required and <b>has to be valid</b>'],
}
export const ConfirmationCode = () => {

    const navigate = useNavigate();
    const [isSubmited, setSubmited] = useState(false);
    const [codeConfirmed, setCodeConfirmed] = useState<any>(null);

    const [searchParams] = useSearchParams();
    const username = String(searchParams.get('username'));

    const {
        confirmationCode,
        formValidation,
        isFormValid,
        onInputChange }
        = useForm(formData, formValidations);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmited(true);
        if (!isFormValid) return null;
        handleSignUpConfirmation({ confirmationCode, username })
    }

    // Add code

    const handleResendCode = async () => {
        try {
            await resendSignUpCode({ username });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {
                codeConfirmed ? <small className="text-red-500" >{JSON.parse(codeConfirmed)?.name}</small> : <small />
            }
            <div className="mb-10 space-y-3">
                <div className="space-y-1">
                    <Input
                        id="confirmationCode"
                        fieldName="Confirmation Code"
                        placeholder="Enter the code"
                        onChange={onInputChange}
                        type="number"
                        value={confirmationCode}
                        name="confirmationCode"
                        errorMessage={formValidation.confirmationCodeValid || ''}
                        isSubmited={isSubmited}
                    />
                </div>

                <button onClick={handleResendCode} type="button" className="text-[12px] text-blue-400">Resend confirmation code</button>
            </div>
            <button className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                type="submit">Confirm</button>
        </form>
    )
}
