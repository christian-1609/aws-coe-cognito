import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { Input } from "../UI/Input";
import { IFormValidation } from "../Login/Login";
// Add code

const formData = {
    firstName: '',
    email: '',
    password: ''
}

const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/)

const formValidations: IFormValidation = {
    email: [(value: string) => emailRegex.test(value), 'Email is required and <b>has to be valid</b>'],
    firstName: [(value: string) => value.length > 0, 'First name is required'],
    password: [(value: string) => passwordRegex.test(value), 'Password <b>should be </b> at least 8 characters long and have at <br/> least 1 uppercase letter and 1 number'],
}

export const SignUp = () => {
    const [isSubmited, setSubmited] = useState(false);
    const navigate = useNavigate();
    const [signUpErrorMessage, setSignUpErrorMessage] = useState('');

    const {
        email,
        firstName,
        password,
        formValidation,
        isFormValid,
        onInputChange,
    } = useForm(formData, formValidations);

    useEffect(() => {
        setSubmited(false)
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmited(true);
        if (!isFormValid) return;

        try {
            // Add Code
        } catch (error) {
            setSignUpErrorMessage(`${JSON.stringify(error)}`);
            throw new Error(`${JSON.stringify(error)}`)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full">
                {
                    signUpErrorMessage ? <small className="text-red-500" >{JSON.parse(signUpErrorMessage)?.name}</small> : <small />
                }
                <div className="mb-10 space-y-3">
                    <div className="space-y-1">
                        <Input
                            id="firstName"
                            fieldName="First Name"
                            placeholder="your first name"
                            onChange={onInputChange}
                            type="text"
                            value={firstName}
                            name="firstName"
                            errorMessage={formValidation.firstNameValid || ''}
                            isSubmited={isSubmited}
                        />
                    </div>
                    <div className="space-y-1">
                        <Input
                            id="email"
                            fieldName="Email"
                            placeholder="mail@example.com"
                            onChange={onInputChange}
                            type="text"
                            value={email}
                            name="email"
                            errorMessage={formValidation.emailValid || ''}
                            isSubmited={isSubmited}
                        />
                    </div>

                    <div className="space-y-1">
                        <Input
                            type="password"
                            id="password"
                            fieldName="Password"
                            placeholder="*********"
                            onChange={onInputChange}
                            value={password}
                            name="password"
                            errorMessage={formValidation.passwordValid || ''}
                            isSubmited={isSubmited}
                        />
                    </div>

                    <button className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        type="submit">Create Account</button>
                </div>
            </form>
            <div className="text-center"> Do you have an account? <Link className="text-blue-500" to="/login">Login</Link> </div>
        </>

    )
}
