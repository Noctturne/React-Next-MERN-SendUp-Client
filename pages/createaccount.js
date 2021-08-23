import React, {useContext} from 'react';
import Basic from '../components/Basic';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth/authContext';
import Alert from '../components/Alert';

const createaccount = () => {
    const AuthContexts = useContext(AuthContext);
    const {msg, registerUser} = AuthContexts;

    // Validación con Formik y Yup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '****'
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required("Email is required"),
            password: Yup.string().required("Password is required").min(6, "Your password must be at least 6 characters long")
        }),
        onSubmit: data => {
            registerUser(data);
        }
    })

    return(
        <Basic>
            <form className="uk-form-horizontal uk-padding-small"
                onSubmit={formik.handleSubmit}>
                <div>
                    {msg && <Alert/>}
                    <label className="uk-form-label uk-light"> Name: </label>
                    <input className="uk-input uk-form-width-large" type="text" 
                        id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>

                    {formik.touched.name && formik.errors.name ? (
                        <div className="uk-alert">
                            <p>{formik.errors.name}</p>
                        </div>
                    ) : null}

                </div>
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
                <button type="submit" className="uk-button uk-button-default uk-margin uk-align-center uk-border-rounded uk-light"> Sign up </button>
                
            </form>
        </Basic>
    )
}

export default createaccount;