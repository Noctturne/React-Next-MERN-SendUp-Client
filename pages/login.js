import React, {useContext, useEffect} from 'react';
import Basic from '../components/Basic';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth/authContext';
import Alert from '../components/Alert';
import {useRouter} from 'next/router';

const login = () => {

    const AuthContexts = useContext(AuthContext);
    const {msg, login, authenticated} = AuthContexts;

    const router = useRouter();
    useEffect(() => {
        if(authenticated){
            router.push('/');
        }
    }, [authenticated]);

    // Validación con Formik y Yup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '****'
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: data => {
            login(data);
        }
    })

    return(
    <Basic>
        <form className="uk-form-horizontal uk-padding-small"
            onSubmit={formik.handleSubmit}>
            {msg && <Alert/>}
            <div className="uk-margin-small-top uk-margin-small-bottom">
                <label className="uk-form-label uk-light"> Email: </label>
                <input className="uk-input uk-form-width-large" type="email" 
                    id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>

                {formik.touched.email && formik.errors.email ? (
                    <div className="uk-alert">
                        <p>{formik.errors.email}</p>
                    </div>
                ) : null}

            </div>
            <div>
                <label className="uk-form-label uk-light"> Password: </label>
                <input className="uk-input uk-form-width-large" type="password" 
                    id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>

                {formik.touched.password && formik.errors.password ? (
                    <div className="uk-alert">
                        <p>{formik.errors.password}</p>
                    </div>
                ) : null}

            </div>
            <button type="submit" className="uk-button uk-button-default uk-margin uk-align-center uk-border-rounded uk-light"> Log in </button>
            
        </form>
    </Basic>
    )
}

export default login;