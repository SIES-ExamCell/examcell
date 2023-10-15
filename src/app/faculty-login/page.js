"use client"

import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/Navbar';
import { motion } from 'framer-motion';
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});


function page() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const notifySuccess = () => toast.success('Logged in successfully', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifyError = () => toast.error('Invalid email or password', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const signIn = (e) => {
    e.preventDefault();
    
  }

  return (
    <>
    <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <div className='flex flex-col justify-center items-center w-screen mt-20 space-y-5'>
          <h1 className={`${raleway.className} text-4xl font-bold mb-10`}>Login in to your account </h1>
          <form className='flex flex-col justify-center items-center space-y-5 '>
            <input ref={emailRef} type="email" placeholder="Email address" className='placeholder:text-gray-800 px-5 py-2  outline-none border border-gray-800 w-96' />
            <input ref={passwordRef} type="password" placeholder="Password" className='placeholder:text-gray-800 px-5 py-2  outline-none border border-gray-800 w-96' />
            <div className='flex justify-between items-center'>
              <h1 className='font-normal text-sm text-right ml-56 text-gray-500'>Forgot your Password?</h1>
            </div>
            <div className='flex justify-center items-center w-96 bg-black text-white py-2'>
              <button type='submit' onClick={signIn}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default page