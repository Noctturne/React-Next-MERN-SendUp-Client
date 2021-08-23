import React, {useCallback, useContext} from 'react';
import Link from 'next/link';
import {useDropzone} from 'react-dropzone';
import FileContext from '../../context/files/fileContext';
import AuthContext from '../../context/auth/authContext';
import Alert from '../../components/Alert';
import Form from './Form';

const UploadFile = () => {
  const FileContexts = useContext(FileContext);
  const {msg_file, loading, url, showAlert, uploadFile, createLink} = FileContexts;

  const AuthContexts = useContext(AuthContext);
  const {authenticated, user} = AuthContexts;

  // Recoger errores
  const onDropRejected = () => {
    showAlert("Limit 1MB");
  }
  // Subir archivos
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    // Pasar a form-data para poder subirlos al backend
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    uploadFile(formData, acceptedFiles[0].path);

  }, []);

    // Extraer contenido dropzone
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});
    const files = acceptedFiles.map(file => (
      <span><strong>{file.path}</strong></span>
    ));
    
  return(
    <>
      {url ? (
      <>
        <h5 className="uk-text-center"> URL: <strong>{`${process.env.FRONTEND_API_URL}/links/${url}`} </strong> </h5>
        <button className="uk-button uk-button-default uk-margin uk-align-center uk-border-rounded uk-light" uk-tooltip="Copy link"
        onClick={() => navigator.clipboard.writeText(`${process.env.FRONTEND_API_URL}/links/${url}`)}> Copy Link </button>
      </>
    ):(
      <main className="files">
        <div className="uploadFile">
            {msg_file ? (<Alert/>):(null)}
            <h4 className="uk-text-center"> You can share your files easily and privately. <small>Max. 1.Mb</small> </h4>
            {authenticated ? ('') : (            
              <p className="uk-text-center"> Increase downloads or use a private key 
                <Link href="/createaccount"><a> here</a></Link> 
              </p>
            )}
        </div>
        {loading ? (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
        ):(
          <div>
          <div {...getRootProps({className:"dropzone js-upload uk-placeholder uk-text-center"})}>
            <span className="uk-text-middle">Drop your file or </span>
            <div className="uk-form-custom">
              <input type="file" {...getInputProps()}/>
                <span className="uk-link"> select one</span>
            </div>
          </div>
          {authenticated ? <Form/> : ""}
        </div>
        )}


        <div className="uk-text-center">
          <span> File {files} </span>
          {acceptedFiles.length > 0 ? (
             <button type="button" className="uk-button uk-button-default uk-margin uk-align-center uk-border-rounded uk-light"
             onClick={() => createLink()}> Create link </button>
          ): null }
        </div>
    </main>
    )}
    </>
  );
}

export default UploadFile;