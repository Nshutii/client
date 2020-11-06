import React, { useState } from 'react';
import authSvg from '../img/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Alert } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.min.css';
import Menu from '../core/Menu'

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Submit'
  });
  const { email, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/forgotPassword`, {
          email
        })
        .then(res => {

          setFormData({
            ...formData,
            email: '',
          });
          toast.success(`Please check your email`);

        })
        .catch(err => {
          console.log(err.response)
          toast.error(err.response.data.error);
        });
    } else {

      toast.error('Please fill all fields');

      // return (
      //    <Alert variant="success">Hello</Alert>
      // )
    }
  };
  return (
    <div>
      <Menu />
   
    <div className='min-h-screen bg-yellow-400 text-gray-900 flex justify-center'>
      <ToastContainer />
   
          
           
<div className="reset-container">
     <div className="header-container">
      <div className="signin-header">
      <div className="signin-title">
        <h3>Reset Password</h3>
      </div>
    </div>
    </div>
    <div className="message">
      <p>Enter your email to reset your Password</p>
    </div>
    <div className="email">
          <label for="email">Email <span>*</span></label>
          <input type="email" name="register" id="email" placeholder="Enter Email Address" 
       
                  onChange={handleChange('email')}
                  value={email}
          required/>
        </div>

        <div className="button">
          <button onClick={handleSubmit}  type="submit">Reset Password</button>
        </div>
  </div>
             
    </div>
    </div>
  );
};

export default ForgetPassword;


