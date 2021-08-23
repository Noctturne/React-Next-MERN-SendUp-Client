import '../styles/globals.css'
import AuthState from '../context/auth/authState'
import FileState from '../context/files/fileState';

const MyApp = ({Component, pageProps}) => {
  
  return(
    <AuthState>
      <FileState>
          <Component {...pageProps}/>
      </FileState>
    </AuthState>
  )
}

export default MyApp
