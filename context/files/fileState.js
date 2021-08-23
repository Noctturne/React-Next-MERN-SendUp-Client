import React, { useReducer } from 'react';
import {UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, CREATE_LINK_SUCCESS, 
    SHOW_ALERT, CLEAN_STATE, ADD_PASS, ADD_DOWNLOADS }from '../../util/constants';
import FileContext from './fileContext';
import FileReducer from './fileReducer';
import axiosClient from '../../config/axios';

const FileState = ({children}) => {
    const initialState = {
        msg_file: '',
        name: '',
        sourceName: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: ''
    }

    const [state, dispatch] = useReducer(FileReducer, initialState);

    // 1. Mostrar alertas
    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        })
    }

    // 2. Subir archivo
    const uploadFile = async (formData, fileName) => {
        dispatch({
            type: UPLOAD_FILE,
        });

        try {
            const res = await axiosClient.post('/files', formData);

            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: res.data.file,
                    sourceName: fileName
                }
            })
        } catch (e) {
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: e.response.data.msg
            })
        }  
    }

    // 3. Crear el link
    const createLink = async () => {
        const data = {
            name: state.name,
            sourceName: state.sourceName,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const res = await axiosClient.post('/links', data);
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: res.data.msg
            })
        } catch (e) {
            console.log(e);
        }
    }

    // 4. Limpiar el state
    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE,
        })
    }

    // 5. Añadir contraseña
    const addPass = (pass) => {
        dispatch({
            type: ADD_PASS,
            payload: pass
        })
    }

    // 6. Añadir descargas
    const addDownloads = numDownloads => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: numDownloads
        })  
    }

    return(
        <FileContext.Provider 
            value={{
                msg_file: state.msg_file,
                name: state.name,
                sourceName: state.sourceName,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                cleanState,
                addPass,
                addDownloads
        }}>

            {children}
        </FileContext.Provider>
    )
}

export default FileState;