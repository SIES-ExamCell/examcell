"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Manrope, Raleway } from 'next/font/google';
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

function HallTickets() {

  const [department, setDepartment] = useState("Electronics & Telecommunication")
  const [hallTicketsObj, setHallTicketsObj] = useState([])
  const [fetch, setFetch] = useState(false)
  const [link, setLink] = useState()
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState(false)
  
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


  var count = 1;
  const departmentList = [
    "Electronics & Telecommunication",
    "Computer Engineering",
    "Information Technology",
    "Printing & Packaging Technology",
    "Mechanical Engineering",
    "Electronics & Computer Science",
    "IOT",
    "Artificial Intelligence and Data science",
    "Artificial Intelligence and Machine Learning"
  ]

  const addLinks = async () => {
    if (link && department) {

      try {
        const docRef = await addDoc(collection(db, "hallTickets"), {
          link: link,
          dept: department,
        });

        notifySuccess('Created Link for hall tickets successfully');
        setLink('');
        setDepartment(null);
        setFetch(false);
        window.location.reload();
      } catch (error) {
        notifyError('Something went wrong');
      }
    }

    else if (!link && department) {
      notifyError('Missing link');
    }
    else if (link && !department) {
      notifyError('Missing department');
    }
    else {
      notifyError('Missing Details');
    }

  };

  const handleDepartmentDropdown = (event) => {
    setDepartment(event.target.value);
  };

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


  useEffect(() => {
    if (!fetch) {
      const fetchHallTicketsObj = async () => {
        const querySnapshot = await getDocs(collection(db, "hallTickets"));
        const fetchedHallTickets = [];

        querySnapshot.forEach((doc) => {
          fetchedHallTickets.push({ id: doc.id, link: doc.data().link, dept: doc.data().dept });
        });

        setHallTicketsObj(fetchedHallTickets);
        setFetch(true);
      }

      fetchHallTicketsObj();
    }
  }, [fetch]);


  async function deleteHallTicket(hallTicket) {
    var answer = window.confirm("Delete Link for Hall Ticket?");
    if (answer) {
      await deleteDoc(doc(db, "hallTickets", hallTicket.id));
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

            <h1 className={`${raleway.className} text-4xl font-bold`}>Create Links for Hall Tickets</h1>

            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="text"
              placeholder="https://siesgst.edu.in/"
              className="placeholder:text-gray-400 px-5 py-2 Uoutline-none border border-gray-800 w-96"
            />
            <h1 className={`${raleway.className} text-4xl font-bold`}>Select Department</h1>

            <select
              value={department}
              onChange={handleDepartmentDropdown}
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
            >
              {departmentList.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <div className='flex justify-center items-center w-96 bg-black text-white py-2'>
              <button type='submit' onClick={addLinks}>Submit</button>
            </div>
          </div>
          <div className='w-[400px]'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Hall Tickets</h1>
          </div>

          <div className={`${manrope.className} select-none flex flex-col justify-center items-center space-y-12 mt-5 bg-[#c4b5fd] p-10 text-black rounded-lg`} >
            <div className='flex items-center w-full font-bold text-lg'>
              <h1 className='w-12 mr-14'>Sr.No.</h1>
              <h1 className='w-72 text-left mr-12 ml-10'>Dept</h1>
              <h1 className='w-72 text-left mr-12 ml-10'>Links</h1>
            </div>
            {
              hallTicketsObj.map((hallTicket) => (
                <div className="flex justify-around items-center  cursor-pointer " >
                  <div className='w-12 text-center mr-12'>
                    <h1>{count++}</h1>
                  </div>
                  <div className='flex justify-center items-center w-64'>
                    <div className='flex flex-col items-center '>
                      <h1 className='text-left text-lg w-44 font-bold'>{hallTicket.dept}</h1>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center '>


                    <div className='flex justify-evenly items-center my-10'>
                      <div className='flex flex-col items-center '>
                        <h1 className='text-left text-lg w-44 font-bold truncate '>{hallTicket.link}</h1>
                      </div>
                      <div className='flex justify-around items-center w-[400px]'>
                        <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => deleteHallTicket(hallTicket)}>
                          <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                          <h1>Delete Link</h1>
                        </div>
                        <div className=' w-28 flex justify-around items-center cursor-pointer' onClick={() => setModal(true)}>
                          <img src="./edit.png" alt="edit" className='w-5 h-5' />
                          <h1>Edit Link</h1>
                        </div>
                      </div>
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

export default HallTickets