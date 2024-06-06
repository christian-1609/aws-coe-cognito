import React, { useReducer } from 'react'
import { AuthContext } from './AuthContex'
import { authReducer } from './authReducer'
import { types } from '../types/types'

const USER_KEY = 'user';
const init = () => {
    const userString = localStorage.getItem(USER_KEY);
    const user = userString ? JSON.parse(userString) : null;

    return {
        logged: !!user,
        user
    }
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [authState, dispatch] = useReducer(authReducer, {}, init);

    const login = (user: any = '') => {
        const userData = {
            ...user
        }
        const action = {
            type: types.login,
            payload: userData
        }

        localStorage.setItem(USER_KEY, JSON.stringify(userData))
        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem(USER_KEY);
        const action = {
            type: types.logout
        }

        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
