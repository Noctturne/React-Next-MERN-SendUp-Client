import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_ERROR, AUTH_SUCCESS, AUTH_ERROR, USER_AUTHENTICATED, LOGOUT, CLEAN_ALERT }from '../../util/constants';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

// Next trabaja en el lado del servidor y del cliente, especificar que estamos en el cliente 
const AuthState = ({children}) => {
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('sendup_token') : '',
        authenticated: null,
        user: null,
        msg: null
    }

    const [state, dispatch ] = useReducer(authReducer, initialState);

    // 1. Registrar usuario con los datos del formulario
    const registerUser =async data => {
        try {
            const res = await axiosClient.post('/users', data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.msg
            });
        } catch (e) {
            dispatch({
                type: REGISTER_ERROR,
                payload: e.response.data.msg
            })
        }
            setTimeout(() => {
                dispatch({
                    type: CLEAN_ALERT
                })
            }, 2000);
    }

    // 2. Iniciar sesión
    const login = async data => {
        try {
            const res = await axiosClient.post('/auth', data);
            dispatch({
                type: AUTH_SUCCESS,
                payload: res.data.token
            })
        } catch (e) {
            dispatch({
                type: AUTH_ERROR,
                payload: e.response.data.msg
            })
        }
            setTimeout(() => {
                dispatch({
                    type: CLEAN_ALERT
                })
            }, 2000);
    }

    // 3. Usuario autenticado, Get pasandole el token
    const authenticatedUser = async() => {
        const token = localStorage.getItem('sendup_token');
        if(token){
            tokenAuth(token);
        }

        try {
            const res = await axiosClient.get('/auth');
            if(res.data.user){
                dispatch({
                    type: USER_AUTHENTICATED,
                    payload: res.data.user
                })
            }
        } catch (e) {
            dispatch({
                type: AUTH_ERROR,
                payload: e.response.data.msg
            })           
        }
    }

    // 4. Cerrar sesión
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }


    return(
        <AuthContext.Provider 
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                msg: state.msg,
                registerUser,
                login,
                authenticatedUser,
                logout
        }}>

            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;