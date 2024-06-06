import { types } from "../types/types"

const initialState = {
    logged: false,
    user: null
}

export const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case types.login:
            return { ...state, logged: true, user: action.payload }
        case types.logout:
            return { ...state, logged: false, user: null }
        default:
            return state
    }
}