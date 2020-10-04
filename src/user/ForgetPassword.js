import React, { useState } from 'react';
import authSvg from '../img/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Alert } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.min.css';

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
    <div className='min-h-screen bg-yellow-400 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 my-20 pt-12 flex flex-col items-center'>
            <h1 className='text-4xl xl:text-3xl font-extrabold'>
              Forget Password
            </h1>
            <div className='w-full w-32 flex-1 mt-8 text-current'>

              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full text-2xl  px-8 py-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <button
                  type='submit'
                  className='mt-5  tracking-wide font-semibold bg-yellow-500 text-gray-100 w-full py-4 rounded-lg hover:bg-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3 text-2xl'>Submit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default ForgetPassword;
