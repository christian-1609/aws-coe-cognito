import { ResourcesConfig } from 'aws-amplify';

export const amplifyParsedConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: import.meta.env.VITE_USER_POOL_ID || '',
            userPoolClientId: import.meta.env.VITE_APP_CLIENT_ID || '',
            loginWith: {
                oauth: {
                    domain: import.meta.env.VITE_COGNITO_DOMAIN || '',
                    scopes: [
                        "profile email openid aws.cognito.signin.user.admin"
                    ],
                    redirectSignIn: [
                        "http://localhost:5173/",
                    ],
                    redirectSignOut: [
                        "http://localhost:5173/",
                    ],
                    responseType: "code"
                },
                username: true
            }
        }
    }
}