import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action)=> {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null }
        case 'SIGNUP': 
            return {};
        default: 
            return state;
    }
}

export const AuthContextProvider = ( { children } )=> {

    const [state, dispatch] = useReducer(authReducer,{ user: null })
    console.log('Auth State: ',state)
    return(
        <createContext.Provider value={ {...state, dispatch} } >
            { children }
        </createContext.Provider>
    )
}