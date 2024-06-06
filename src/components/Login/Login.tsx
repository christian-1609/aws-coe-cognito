import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context"
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { Input } from "../UI/Input";
// Add code

const formData = {
    email: '',
    password: ''
}

const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/);

export interface IFormValidation { [key: string]: [(value: string) => boolean, string] }

const formValidations: IFormValidation = {
    email: [(value: string) => emailRegex.test(value), 'Email is required and <b>has to be valid</b>'],
    password: [(value: string) => passwordRegex.test(value), 'Password <b>should be </b> at least 8 characters long and have at <br/> least 1 uppercase letter and 1 number'],
}

export const Login = () => {


    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSubmited, setSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const {
        email,
        password,
        formValidation,
        formState,
        isFormValid,
        onInputChange,
    } = useForm(formData, formValidations);

    useEffect(() => {
        setSubmited(false)
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmited(true);
        setIsLoading(true);

        if (!isFormValid) return;

        // Add code

        setIsLoading(false);

        const lastLocation = localStorage.getItem('lastPath') || '/dashboard';

        navigate(lastLocation, {
            replace: true
        });
    }

    const handleUserInformation = async () => {
        const user = await getCurrentUser();
        const { userId, username, signInDetails } = user;
        login({ email: formState.email, name: username, userId, signInDetails });
    }

    return (
        <>

            <form onSubmit={handleSubmit} className="w-full">
                {
                    loginErrorMessage ? <small className="text-red-500" >{JSON.parse(loginErrorMessage)?.name}</small> : <small />
                }
                <div className="mb-10 space-y-3">
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

                    <button
                        disabled={!isFormValid || isLoading}
                        className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        type="submit">Login</button>
                </div>
            </form>
            <div className="text-center"> Don't have an account? <Link className="text-blue-500" to="/signup">SignUp</Link> </div>
        </>
    )
}
