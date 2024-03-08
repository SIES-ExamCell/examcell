"use client"

import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { Inter, Manrope, Raleway } from 'next/font/google';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from "../firebase"
import { useRouter } from 'next/navigation';
import { AuthContext } from "../contexts/AuthContext"


const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});


function Settings() {
  const router = useRouter();
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)


  var isAdmin = ''
  useEffect(() => {
    if (typeof window !== 'undefined') {
      isAdmin = localStorage.getItem("isAdmin") === "true" || '';
    }
    if (!isAdmin) {
      router.push('faculty-login');
    }
  }, [])

  const notifySuccess = () => toast.success('Logged in successfully', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const notifyError = () => toast.error('Invalid username or password', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const notifyMissingCredentials = () => toast.error('Missing Credentials', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const notifyMissingUsername = () => toast.error('Please Enter Username', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const notifyMissingPassword = () => toast.error('Please Enter Password', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });




  async function updateUser() {
    const docRef = doc(db, "admin", "o5S757766coPZFBzjTf3");

    try {
      await updateDoc(docRef, {
        username: username,
        password: password,
      });

      notifySuccess('Updated the Credentials Successfully');

      setUsername('')
      setPassword('')
      window.location.reload();
    } catch (error) {
      notifyError('Unable to update');
    }
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
          <div className='flex flex-col space-y-5 mb-20'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Reset your Credentials</h1>
            <section className={`${manrope.className} text-lg text-gray-600`}>(Leave blank if you don't want to change the field)</section>

            <h1 className={`${manrope.className} text-2xl font-medium`}>Enter Username</h1>

            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="admin"
              className={`${manrope.className} placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96`}
            />
            <h1 className={`${raleway.className} text-2xl font-medium`}>Enter Password</h1>

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="text"
              placeholder="Password"
              className={`${manrope.className} placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96`}
            />


            <div type="submit" onClick={() => updateUser()} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
              <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="relative">Submit</span>
            </div>

          </div>
        </div>
      </div >
    </>

  )
}

export default Settings