import React, { useState } from "react";
// import Layout from "../core/Layout";
import { Link, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Menu from '../core/Menu';
import Footer from '../core/Footer'

import { signin, authenticate, isAuthenticated } from "../auth";


const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="login-container">
            <div className="header-container">
                <div className="signin-header">
                    <div className="signin-title">
                        <h3>Login</h3>
                    </div>
                </div>
            </div>
            <div className="welcome-msg">
                <p>Welcome back! Sign in to your account.</p>
                <p><span>*</span> Stands for Required Informations.</p>
            </div>


            <form className="signin-form">
                <div className="email">
                    <label htmlFor="email">Email <span>*</span></label>
                    <input onChange={handleChange('email')} type="email" name="register" id="email" className="validate" placeholder="Enter Email Address" value={email} required />
                </div>
                <div className="password">
                    <label htmlFor="password">Password <span>*</span></label>
                    <input onChange={handleChange('password')} type="password" name="register" id="password" placeholder="Enter Password" className="validate" autoComplete="off" value={password} required />
                </div>

                <div className="login-footer">
                    <div className="button">
                        <button onClick={clickSubmit} type="submit">Login</button>
                    </div>
                    <div className="password-reset">
                        <Link to="/users/password/forget">Lost Your Password ?</Link>
                    </div>
                </div>

            </form>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className='sr-only'>Loading...</div>
            // // <Spinner animation='border' role='status'>
            // {/* </Spinner> */}
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <div>
            <Menu />

            <div className='registerPage'>

                <div className="auth-alert">


                    {showLoading()}
                    {showError()}
                </div>


                <div className="container-signin">

                    {signUpForm()}
                    {redirectUser()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signin;