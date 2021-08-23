import React, {useContext, useEffect} from 'react';
import Link from 'next/link';
import AuthContext from '../context/auth/authContext';
import FileContext from '../context/files/fileContext';
import {useRouter} from 'next/router';

const Header = () => {
    const router = useRouter();

    const AuthContexts = useContext(AuthContext);
    const {user, authenticatedUser, logout} = AuthContexts;
  
    const FileContexts = useContext(FileContext);
    const {cleanState} = FileContexts;

    useEffect(() => {
      authenticatedUser();
    }, []);

    const redirect = () => {
        router.push('/');
        cleanState();
    }

    return(
        <nav className="uk-navbar uk-navbar-container uk-navbar-transparent uk-light uk-margin uk-padding-small">
        <div className="uk-navbar-left">
            <a onClick={() => redirect()} className="uk-navbar-item uk-logo" aria-expanded="false"> SendUp! </a>
        </div>
        {user ? (            
            <div className="uk-navbar-right">
                <a className="uk-navbar-toggle uk-text-uppercase"><strong>{user.name}</strong></a>
                <a className="uk-navbar-toggle uk-text-uppercase" onClick={() => logout()}> Log out </a>
            </div>) 
        : (
            <div className="uk-navbar-right">
                <Link href="/login"><a className="uk-navbar-toggle uk-text-uppercase"> Log in </a></Link>  
                <Link href="/createaccount"><a className="uk-navbar-toggle uk-text-uppercase"> Sign up </a></Link>    
            </div>
            )
        }

	</nav>
    )
}

export default Header;