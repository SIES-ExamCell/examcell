"use client"

import React, { useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function EditNotifications() {
  const notificationRef = useRef(null);
  const notifySuccess = () => toast.success('Created notification successfully', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifyError = () => toast.error('Something went wrong', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const submit = () => {

  }
  return (
  <>
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
      <div className='w-screen  flex mx-20 my-20'>
        <div className='flex flex-col'>

          <div className='w-[400px]'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Notifications</h1>
            <h1 className={`${raleway.className} text-2xl font-normal truncate `}>SH 2022 exam Revaluation notice for IT (sem III, IV, V, Honours)</h1>
            <h1 className={`${raleway.className} text-2xl font-normal truncate`}>SH 2022 exam Revaluation notice for CE (sem III, IV, V, Honours & VI), AIDS (sem III), IOT (sem III)</h1>
          </div>
          <form className='flex flex-col space-y-5 '>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Create Notifications</h1>

            <input ref={notificationRef} type="text" placeholder="Exam has been postponed" className='placeholder:text-gray-400 px-5 py-2  outline-none border border-gray-800 w-96' />

            <div className='flex justify-center items-center w-96 bg-black text-white py-2'>
              <button type='submit' onClick={submit}>Submit</button>
            </div>
          </form>
        </div>

      </div>
    </>

  )
}

export default EditNotifications