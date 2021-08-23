import Basic from '../../components/Basic';
import axiosClient from '../../config/axios';
import React, {useState, useContext} from 'react';
import FileContext from '../../context/files/fileContext';
import Alert from '../../components/Alert';

// Respuesta 
export async function getServerSideProps({params}) {
    const { link } = params;

   const resultado = await axiosClient.get(`/links/${link}`);

    return {
        props: {
            link: resultado.data
        }
    }
}

// Rutas
export async function getServerSidePaths() {
        const links = await axiosClient.get('/links');
        return {
            paths: links.data.links.map( link => ( {
                params: { link : link.url }
            })),
            fallback: false
        }
}

export default ({link}) => {
    const FileContexts = useContext(FileContext);
    const {msg_file, showAlert} = FileContexts;

    const [havePass, setHavePass] = useState(link.password);
    const [password, setPassword] = useState('');

    const verifyPass = async e => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const res = await axiosClient.post(`/links/${link.link}`, data);
            setHavePass(res.data.password);
        } catch (error) {
            showAlert(error.res.data.msg);
        }
        

    }

    return (
        <Basic>
            {havePass ? (
                <>
                    <p> This file is already protected </p>

                    { msg_file && <Alert /> }
                    <div className="linkForm">
                        <form onSubmit={e => verifyPass(e)}>
                            <div>
                                <label className="uk-form-label uk-light"> Password: </label>
                                <input className="uk-input uk-form-width-small" type="password" 
                                    id="password" value={password} onChange={ e => setPassword(e.target.value) }/>
                            </div>
                            <button type="submit" className="uk-button uk-button-default uk-margin uk-align-center uk-border-rounded uk-light"> Verify </button>
                        </form>
                    </div>
                </>

            ) : (
                <h2> Download file <a className="uk-link" href={`${process.env.NEXT_API_URL}/files/${link.file}`} > here </a> </h2>
            )}             
        </Basic>
    )
}