# AWS Cognito & Amplify integration 

## Initial Setup

So, first of all, we need to install the ```npm``` dependencies (currently the project uses NodeJs version: ```v18.18.2```)

1. Execute 
    ```bash
    $npm install
    ```
2. Setup Environment Variables

    On Windows Powershel
    ```cmd
    copy example.env .env
    ```
    On Git Bash terminal
    ```bash
    cp example.env .env
    ```

3. Replace environment varibles values in file ``.env`` with your AWS Cognito credentials
4. In file ``` scr/Providers/amplifyClientSide.tsx ``` add the next code in line 2
    ```js
    import { Amplify } from 'aws-amplify';
    import { amplifyParsedConfig } from './utils/AmplifyConfig';
    ```
    and this snipped in line 10.
    ```js
            try {
                Amplify.configure(amplifyParsedConfig);
            } catch (err) {
                console.error('Error configuring Amplify:', err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
    ```
    Basically this code allow us to initialize the Amplify Configuration, as same as
    the ``src/Providers/utils/AmplifyConfig.ts `` file

5. Import the Amplify ClientSide component in ``src/main.tsx``,adding in line 9 the follow snipped:

    ```js
    import { AmplifyClientSide } from './Providers/amplifyClientSide.tsx';
    ```
    and in line 14:

    ```tsx
    <AmplifyClientSide />
    ```
    This code will be propagating the AWS Cognito configuration throughout the application.

## SignUp and SignIn Functionality

1. Import the signUp method, adding the next code in ``` src/components/SignUp/SignUp.tsx``` line: 6. This method will allow us to register a user, using a username, email and password.

    ```js
    import { signUp } from 'aws-amplify/auth';
    ```

2. Implement ```signUp``` method, in the same file (``` src/components/SignUp/SignUp.tsx```), in line 47.

    ```js
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: firstName, password, options: {
                userAttributes: {
                    email,
                    name: firstName
                },
                autoSignIn: true
            }
        });

        console.log({ isSignUpComplete, userId, nextStep });
        navigate(`/confirmation?username=${firstName}`);
    ```
3. The next Step is to confirmation code, that is a code that you will receive through your email after the signUp process, add the next code in line 6, in file 
```src/components/Confirmation/ConfirmationCode.tsx```

    ```js
    import { confirmSignUp, type ConfirmSignUpInput, resendSignUpCode } from 'aws-amplify/auth';
    ```
    and the next code enables the functionality, add in line 40

    ```js
        async function handleSignUpConfirmation({
            username,
            confirmationCode
        }: ConfirmSignUpInput) {
            try {
                const { isSignUpComplete, nextStep } = await confirmSignUp({
                    username,
                    confirmationCode
                });
                console.log({ isSignUpComplete, nextStep });
                navigate('/login', { replace: true });

            } catch (error) {
                setCodeConfirmed(`${JSON.stringify(error)}`);
                throw new Error(`${JSON.stringify(error)}`);
            }
        }
    ```
4. In order to enable signIn functionality, in the file ```src/components/Login/Login.tsx``` add the next code in line 7.

    ```js
    import { getCurrentUser, signIn } from 'aws-amplify/auth';
    ```
    And Finally in line 53, add the signIn functionality.

    ```js
        try {
            await signIn({
                username: email,
                password,
            });
            handleUserInformation();
        } catch (error) {
            setIsLoading(false);
            setLoginErrorMessage(`${JSON.stringify(error)}`);
            throw new Error(`${JSON.stringify(error)}`);
        }
    ```

Finally the aplication must be able to register, and login users with valid emails accounts.

Please, execute the next command and test the application:

```bash
$ npm run dev
```

That's it, if you have any coment or question, please let me know!

Happy Coding!!

# About the React project

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
