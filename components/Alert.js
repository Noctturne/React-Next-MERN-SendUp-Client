import React, {useContext} from 'react';
import AuthContext from '../context/auth/authContext';
import FileContext from '../context/files/fileContext';

const Alert = () => {
    // Para usuarios 
    const AuthContexts = useContext(AuthContext);
    const {msg} = AuthContexts;

    // Para archivos
    const FileContexts = useContext(FileContext);
    const {msg_file} = FileContexts;
    
    return(
        <div className="uk-alert">
            <p className="text-center">{msg || msg_file}</p>
        </div>
    )
}

export default Alert;