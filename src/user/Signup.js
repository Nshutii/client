import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import Menu from '../core/Menu';
import Footer from '../core/Footer'



const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: ' ',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="register-container">
            <div className="header-container">
                <div className="register-header">
                    <div className="register-title">
                        <h3>Register</h3>
                    </div>
                </div>
            </div>

            <div className="register-info">
                <div className="register-details">
                    <p>Create new account today to reap the benefits of a personalized shopping experience.</p>
                    <p><span>*</span> Stands for Required Informations.</p>
                </div>

                <form className="register-form">
                    <div className="fullName">
                        <label htmlFor="fullName">Full Name <span>*</span></label>
                        <input onChange={handleChange('name')} type="text" name="register" id="fullName" placeholder="Enter Full Name" className="validate" autoComplete="off" value={name} required />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email <span>*</span></label>
                        <input onChange={handleChange('email')} type="email" name="register" id="email" placeholder="Enter Email Address" required value={email} />
                    </div>
                    <div class="password">
                        <label htmlFor="password">Password <span>*</span></label>
                        <input onChange={handleChange('password')} type="password" name="register" id="password" placeholder="Enter Password" value={password} required />
                    </div>
                    <div className="privacy-policy">
                        <p>Your personal data will be used to support your experience throughout this website, to manage your account, and for other purposes described in our <Link to="/">privacy policy</Link>.</p>
                    </div>

                    <div className="button">
                        <button onClick={clickSubmit} type="submit">Register</button>
                    </div>

                    <div className="more-info">
                        <p>Sign up today and you will be able to :</p>
                        <ul>
                            <li><i className="fas fa-check"></i>Speed your way through checkout</li>
                            <li><i className="fas fa-check"></i>Track your orders easily</li>
                            <li><i className="fas fa-check"></i>Keep a record of all your purchases</li>
                        </ul>

                    </div>
                </form>
            </div>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <div>
            <Menu />

            <div className='registerPage'>

                <div className="auth-alert">

                    {showSuccess()}
                    {showError()}
                </div>

                <div className="container-register">

                    {signUpForm()}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;