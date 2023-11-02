"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from "../firebase"
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';


const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function EditNotifications() {
  const [notificationsObj, setNotificationsObj] = useState([])
  const [fetch, setFetch] = useState(false)
  const [notification, setNotification] = useState("")
  const [banner, setBanner] = useState("")
  const [bannersObj, setBannersObj] = useState([])
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState(false)
  var notificationCount = 1;
  var bannerCount = 1;
  const { admin, setAdmin } = useContext(AuthContext);

  const router = useRouter();

  var isAdmin = ''
  useEffect(() => {
      if (typeof window !== 'undefined') {
        isAdmin = localStorage.getItem("isAdmin") === "true" || '';
      }
      if (!isAdmin) {
          router.push('faculty-login');
      }
  }, [])

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

  const addNotification = async () => {
    if (notification) {
      try {
        await addDoc(collection(db, 'notifications'), {
          desc: notification,
        });
        notifySuccess('Created notification successfully');
        setNotification('');
        setFetch(false); // Set fetch to false to trigger re-fetch of notifications
      } catch (error) {
        notifyError('Something went wrong');
      }
    }
  };
  const addBanner = async () => {
    if (banner) {
      try {
        await addDoc(collection(db, 'banners'), {
          banner: banner,
        });
        notifySuccess('Created banner successfully');
        setBanner('');
        setFetch(false); // Set fetch to false to trigger re-fetch of notifications
      } catch (error) {
        notifyError('Something went wrong');
      }
    }
  };

  // async function addNotification(e) {
  //   await addDoc(collection(db, "influencers"), {
  //     name: name,
  //     username: username,
  //     password: password,
  //     managers: []
  //   });
  //   alert("Added Influencer successfully!")
  //   window.location.reload();
  // }


  useEffect(() => {
    if (!fetch) {
      const fetchNotificationsObj = async () => {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const fetchedNotifications = [];

        querySnapshot.forEach((doc) => {
          fetchedNotifications.push({ id: doc.id, desc: doc.data().desc });
        });

        setNotificationsObj(fetchedNotifications);
        setFetch(true);
      }

      fetchNotificationsObj();
    }
  }, [fetch]);

  useEffect(() => {
    if (!fetch) {
      const fetchBannersObj = async () => {
        const querySnapshot = await getDocs(collection(db, "banners"));
        const fetchBanners = [];

        querySnapshot.forEach((doc) => {
          fetchBanners.push({ id: doc.id, banner: doc.data().banner });
        });

        setBannersObj(fetchBanners);
        setFetch(true);
      }

      fetchBannersObj();
    }
  }, [fetch]);

  async function deleteNotification(notification) {
    var answer = window.confirm("Delete Notification?");
    if (answer) {
      await deleteDoc(doc(db, "notifications", notification.id));
      window.location.reload();
    }
    else {
      return;
    }
  }
  async function deleteBanner(banner) {
    var answer = window.confirm("Delete Banner?");
    if (answer) {
      await deleteDoc(doc(db, "banners", banner.id));
      window.location.reload();
    }
    else {
      return;
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
            <h1 className={`${raleway.className} text-4xl font-bold`}>Create Banner on HomePage</h1>

            <input
              onChange={(e) => setBanner(e.target.value)}
              value={banner}
              type="text"
              placeholder="Exam has been postponed"
              className="placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96"
            />

            <div className='flex justify-center items-center w-96 bg-black text-white py-2'>
              <button type='submit' onClick={addBanner}>Submit</button>
            </div>
          </div>
          <div className='flex flex-col space-y-5 mb-20'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Create Notifications</h1>

            <input
              onChange={(e) => setNotification(e.target.value)}
              value={notification}
              type="text"
              placeholder="Exam has been postponed"
              className="placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96"
            />

            <div className='flex justify-center items-center w-96 bg-black text-white py-2'>
              <button type='submit' onClick={addNotification}>Submit</button>
            </div>
          </div>
          <div className='w-[400px]'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Banners</h1>
          </div>

          <div className={`${manrope.className} mb-20 select-none flex flex-col justify-center items-center space-y-12 mt-5 bg-[#c4b5fd] p-10 text-black rounded-lg`} >
            <div className='flex items-center w-full font-bold text-lg'>
              <h1 className='w-12 mr-14'>Sr.No.</h1>
              <h1 className='w-72 text-left mr-12 ml-10'>Description</h1>
              <h1 className=''>Actions</h1>
            </div>

            {
              bannersObj.filter(banner => {
                if (query === '') {
                  return banner;
                } else if (banner.name.toLowerCase().includes(query.toLowerCase())) {
                  return banner;
                }
              }).map((banner, index) => (
                <div key={banner.id} className="flex justify-around items-center " >
                  <div className='w-12 text-center mr-12'>
                    <h1>{bannerCount++}</h1>
                  </div>
                  <div className='flex justify-center items-center w-64'>
                    <div className='flex flex-col items-center '>
                      <h1 className='text-left text-lg w-44 font-bold'>{banner.banner}</h1>
                    </div>
                  </div>

                  <div className='flex justify-around items-center w-[400px]'>
                    <div className=' w-44 flex justify-around items-center cursor-pointer' onClick={() => deleteBanner(banner)}>
                      <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                      <h1>Delete Banner</h1>
                    </div>
                    <div className=' w-36 flex justify-around items-center cursor-pointer' onClick={() => setModal(true)}>
                      <img src="./edit.png" alt="edit" className='w-5 h-5' />
                      <h1>Edit Banner</h1>
                    </div>
                  </div>

                </div>
              ))
            }
          </div >


          <div className='w-[400px]'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Notifications</h1>
          </div>

          <div className={`${manrope.className} flex flex-col justify-center items-center space-y-12 mt-5 bg-[#c4b5fd] p-10 text-black rounded-lg`} >
            <div className='flex items-center w-full font-bold text-lg'>
              <h1 className='w-12 mr-14'>Sr.No.</h1>
              <h1 className='w-72 text-left mr-12 ml-10'>Description</h1>
              <h1 className=''>Actions</h1>
            </div>

            {
              notificationsObj.filter(notification => {
                if (query === '') {
                  return notification;
                } else if (notification.name.toLowerCase().includes(query.toLowerCase())) {
                  return notification;
                }
              }).map((notification, index) => (
                <div key={notification.id} className="flex justify-around items-center " >
                  <div className='w-12 text-center mr-12'>
                    <h1>{notificationCount++}</h1>
                  </div>
                  <div className='flex justify-center items-center w-64'>
                    <div className='flex flex-col items-center '>
                      <h1 className='text-left text-lg w-44 font-bold select-auto'>{notification.desc}</h1>
                    </div>
                  </div>

                  <div className='flex justify-around items-center w-[400px]'>
                    <div className=' w-44 flex justify-around items-center cursor-pointer' onClick={() => deleteNotification(notification)}>
                      <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                      <h1>Delete Notification</h1>
                    </div>
                    <div className=' w-36 flex justify-around items-center cursor-pointer' onClick={() => setModal(true)}>
                      <img src="./edit.png" alt="edit" className='w-5 h-5' />
                      <h1>Edit Notification</h1>
                    </div>
                  </div>

                </div>
              ))
            }
          </div >


        </div>

      </div>
    </>

  )
}

export default EditNotifications