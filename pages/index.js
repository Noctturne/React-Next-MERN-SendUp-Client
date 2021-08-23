import React, {useContext, useEffect} from 'react';
import Basic from '../components/Basic';
import AuthContext from '../context/auth/authContext';

import UploadFile from '../components/files/uploadFile';


const index = () => {
  const AuthContexts = useContext(AuthContext);
  const {authenticatedUser} = AuthContexts;

  useEffect(() => {
    const token = localStorage.getItem('sendup_token');
    if(token){
      authenticatedUser();
    }
  }, []);
  

  return(
      <Basic>
          <UploadFile/>
      </Basic>
  );
}

export default index;
