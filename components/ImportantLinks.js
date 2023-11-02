"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from "../firebase"


const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function ImportantLinks() {
  const [linksObj, setLinksObj] = useState([])
  const [fetch, setFetch] = useState(false)
  const [link, setLink] = useState("")
  const [linkName, setLinkName] = useState("")
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState(false)
  var count = 1;

  const notifySuccess = () => toast.success('Created link successfully', {
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

  const addLinks = async () => {
    if (link) {
      try {
        await addDoc(collection(db, 'importantLinks'), {
          link: link,
          name: linkName
        });
        notifySuccess('Created important Link successfully');
        setLink('');
        setLinkName('');
        setFetch(false); 
      } catch (error) {
        notifyError('Something went wrong');
      }
    }
  };


  useEffect(() => {
    if (!fetch) {
      const fetchImportantLinksObj = async () => {
        const querySnapshot = await getDocs(collection(db, "importantLinks"));
        const fetchedLinks = [];

        querySnapshot.forEach((doc) => {
          fetchedLinks.push({ id: doc.id, link: doc.data().link, name: doc.data().name });
        });

        setLinksObj(fetchedLinks);
        setFetch(true);
      }

      fetchImportantLinksObj();
    }
  }, [fetch]);

  async function deleteLink(link) {
    var answer = window.confirm("Delete Link?");
    if (answer) {
      await deleteDoc(doc(db, "importantLinks", link.id));
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
            <h1 className={`${raleway.className} text-4xl font-bold`}>Create Important Links</h1>

            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="text"
              placeholder="https://siesgst.edu.in/"
              className="placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96"
            />
      
            <h1 className={`${raleway.className} text-4xl font-bold`}>Enter name for the link</h1>

            <input
              onChange={(e) => setLinkName(e.target.value)}
              value={linkName}
              type="text"
              placeholder="Exam Timetable update"
              className="placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96"
            />

            <div className='flex justify-center items-center w-96 bg-black text-white py-2'>
              <button type='submit' onClick={addLinks}>Submit</button>
            </div>
          </div>
          <div className='w-[500px]'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Important Links</h1>
          </div>

          <div className={`${manrope.className} select-none flex flex-col justify-center items-center space-y-12 mt-5 bg-[#c4b5fd] p-10 text-black rounded-lg`} >
          <div className='flex items-center w-full font-bold text-lg'>
              <h1 className='w-12 mr-14'>Sr.No.</h1>
              <h1 className='w-72 text-left mr-12 ml-10'>Links</h1>
              <h1 className='w-72 text-left mr-12 ml-10'>Link Name</h1>
              <h1 className=''>Actions</h1>
            </div>

            {
              linksObj.filter(link => {
                if (query === '') {
                  return link;
                } else if (link.name.toLowerCase().includes(query.toLowerCase())) {
                  return link;
                }
              }).map((link, index) => (
                <div key={link.id} className="flex justify-around items-center " >
                  <div className='w-12 text-center mr-12'>
                    <h1>{count++}</h1>
                  </div>
                  <div className='flex justify-center items-center w-64'>
                    <div className='flex flex-col items-center '>
                      <h1 className='text-left text-lg w-44 font-bold'>{link.link}</h1>
                    </div>
                  </div>
                  <div className='flex justify-center items-center w-64 ml-32'>
                    <div className='flex flex-col items-center '>
                      <h1 className='text-left text-lg w-44 font-bold'>{link.name}</h1>
                    </div>
                  </div>

                  <div className='flex justify-around items-center w-[400px]'>
                    <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => deleteLink(link)}>
                      <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                      <h1>Delete Link</h1>
                    </div>
                    <div className=' w-28 flex justify-around items-center cursor-pointer' onClick={() => setModal(true)}>
                      <img src="./edit.png" alt="edit" className='w-5 h-5' />
                      <h1>Edit Link</h1>
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

export default ImportantLinks