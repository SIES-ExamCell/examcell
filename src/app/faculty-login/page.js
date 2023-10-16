"use client"

import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/Navbar';
import { Inter, Raleway } from 'next/font/google';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from "../../../firebase"
import { useRouter } from 'next/navigation';
import { AuthContext } from "../../../contexts/AuthContext"


const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});


function page() {
  const router = useRouter();
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const { admin, setAdmin } = useContext(AuthContext);

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




  const signIn = async (e) => {
    e.preventDefault();

    if (username && password) {
      const q = query(
        collection(db, "admin"),
        where("username", "==", username),
        where("password", "==", password)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        notifyError();
      } else {
        notifySuccess();
        router.push("/admin-page");
      }
    }
    else if (!username && password) {
      notifyMissingUsername()
    }
    else if (username && !password) {
      notifyMissingPassword()
    }
    else {
      notifyMissingCredentials()
    }
  };



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
            <input onChange={(e) => setUsername(e.target.value)} required type="text" placeholder="Enter Username" className={`${inter.className} placeholder:text-gray-800 px-5 py-2  outline-none border border-gray-800 w-96`} />
            <input onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password" className={`${inter.className} placeholder:text-gray-800 px-5 py-2  outline-none border border-gray-800 w-96`} />
            <div className='flex justify-between items-center'>
              <h1 className='font-normal text-sm text-right ml-56 text-gray-500'>Forgot your Password?</h1>
            </div>
            {/* <div disabled={!usernameRef || !passwordRef} type='submit' onClick={()=> signIn('credentials',{username, password, redirect: true, callbackUrl: '/'} )} className='flex justify-center items-center w-96 bg-black text-white py-2'> */}
            <div disabled={!username || !password} type='submit' onClick={signIn} className='flex justify-center items-center w-96 bg-black text-white py-2'>
              <button>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default page