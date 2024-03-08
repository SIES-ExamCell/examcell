"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
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
  const [editBanner, setEditBanner] = useState()
  const [notification, setNotification] = useState("")
  const [banner, setBanner] = useState("")
  const [bannersObj, setBannersObj] = useState([])
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState(null)
  const [notificationModal, setNotificationModal] = useState(null)
  const [editNotification, setEditNotification] = useState()


  var notificationCount = 1;
  var bannerCount = 1;
  const { admin, setAdmin } = useContext(AuthContext);

  const router = useRouter();

  var count = 1;

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

  async function updateBanner(banner) {
    const docRef = doc(db, "banners", banner.id);

    try {
      await updateDoc(docRef, {
        banner: editBanner ? editBanner : banner.banner,
      });

      notifySuccess('Updated the Banner successfully');
      window.location.reload();
    } catch (error) {
      notifyError('Unable to update');
    }
  }
  async function updateNotification(notification) {
    const docRef = doc(db, "notifications", notification.id);

    try {
      await updateDoc(docRef, {
        desc: editNotification ? editNotification : notification.desc,
      });

      notifySuccess('Updated the Notification successfully');
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
            <h1 className={`${raleway.className} text-4xl font-bold`}>Create Banner on HomePage</h1>
            <input
              onChange={(e) => setBanner(e.target.value)}
              value={banner}
              type="text"
              placeholder="Exam has been postponed"
              className="placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96"
            />


            <div type="submit" onClick={addBanner} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
              <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="relative">Submit</span>
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

            <div type="submit" onClick={addNotification} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
              <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="relative">Submit</span>
            </div>
          </div>
          <div className='w-[400px]'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Banners</h1>
          </div>


          {
            modal && (
              <div className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                <div className="w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Banner
                      </h3>
                      <button onClick={() => setModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className='flex flex-col space-y-5 mb-20 text-white mx-12 my-5'>

                      <h1 className={`${raleway.className} text-lg font-bold`}>Edit Banner</h1>

                      <input
                        onChange={(e) => setEditBanner(e.target.value)}
                        value={editBanner}
                        type="text"
                        placeholder="Download hall tickets"
                        className="placeholder:text-gray-500  bg-gray-800 px-5 py-2 outline-none border border-gray-800 w-96"
                      />
                      <div type="submit" onClick={() => updateBanner(modal)} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                        <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="relative">Submit</span>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            )
          }

          <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Banner
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>
              {
                bannersObj.map((banner) => (

                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <h1>{count++}</h1>
                      </th>
                      <td class="px-6 py-4">
                        <h1 className='truncate w-96'>{banner.banner}</h1>
                      </td>

                      <td class="px-6 py-4">
                        <div className='flex justify-around items-center w-[250px] space-x-4'>
                          <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => deleteBanner(banner)}>
                            <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                            <h1>Delete Link</h1>
                          </div>
                          <div className=' w-28 flex justify-around items-center cursor-pointer' onClick={() => setModal(banner)}>
                            <img src="./edit.png" alt="edit" className='w-5 h-5' />
                            <h1>Edit Link</h1>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              }
            </table>
          </div>


          <div className='w-[400px] mt-20'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Notifications</h1>
          </div>



          {
            notificationModal && (
              <div className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                <div className="w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Banner
                      </h3>
                      <button onClick={() => setNotificationModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className='flex flex-col space-y-5 mb-20 text-white mx-12 my-5'>

                      <h1 className={`${raleway.className} text-lg font-bold`}>Edit Notification</h1>

                      <input
                        onChange={(e) => setEditNotification(e.target.value)}
                        value={editNotification}
                        type="text"
                        placeholder="Download hall tickets"
                        className="placeholder:text-gray-500  bg-gray-800 px-5 py-2 outline-none border border-gray-800 w-96"
                      />
                      <div type="submit" onClick={() => updateNotification(notificationModal)} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                        <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="relative">Submit</span>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            )
          }

          <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Banner
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>
              {
                notificationsObj.map((notification) => (

                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <h1>{notificationCount++}</h1>
                      </th>
                      <td class="px-6 py-4">
                        <h1 className='truncate w-96'>{notification.desc}</h1>
                      </td>

                      <td class="px-6 py-4">
                        <div className='flex justify-around items-center w-[250px] space-x-4'>
                          <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => deleteNotification(notification)}>
                            <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                            <h1>Delete Link</h1>
                          </div>
                          <div className=' w-28 flex justify-around items-center cursor-pointer' onClick={() => setNotificationModal(notification)}>
                            <img src="./edit.png" alt="edit" className='w-5 h-5' />
                            <h1>Edit Link</h1>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              }
            </table>
          </div>

        </div>

      </div>
    </>

  )
}

export default EditNotifications