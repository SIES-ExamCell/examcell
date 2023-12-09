"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Manrope, Raleway } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "../firebase"
import { useRouter } from 'next/navigation';


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
  const [editDepartment, setEditDepartment] = useState()
  const [hallTicketsObj, setHallTicketsObj] = useState([])
  const [fetch, setFetch] = useState(false)
  const [link, setLink] = useState()
  const [editLink, setEditLink] = useState()
  const [linkName, setLinkName] = useState()
  const [editLinkName, setEditLinkName] = useState()
  const [modal, setModal] = useState(null)

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
    "Artificial Intelligence and Machine Learning",
    "First Year", "Post Graduation"
  ]

  const addLinks = async () => {
    if (link && department && linkName) {

      try {
        const docRef = await addDoc(collection(db, "hallTickets"), {
          link: link,
          dept: department,
          linkName: linkName,
        });

        notifySuccess('Created Link for hall tickets successfully');
        setLink('');
        setLinkName('');
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
  const handleEditDepartmentDropdown = (event) => {
    setEditDepartment(event.target.value);
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
          fetchedHallTickets.push({ id: doc.id, link: doc.data().link, linkName: doc.data().linkName, dept: doc.data().dept });
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
  async function updateLink(hallTicket) {
    const docRef = doc(db, "hallTickets", hallTicket.id);

    try {
      await updateDoc(docRef, {
        link: editLink ? editLink : hallTicket.link,
        dept: editDepartment ? editDepartment : hallTicket.dept,
        linkName: editLinkName ? editLinkName : hallTicket.linkName,
      });

      notifySuccess('Updated the Link for hall tickets successfully');
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

            <h1 className={`${raleway.className} text-4xl font-bold`}>Create Links for Hall Tickets</h1>

            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="text"
              placeholder="https://siesgst.edu.in/"
              className="placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96"
            />
            <h1 className={`${raleway.className} text-4xl font-bold`}>Enter Name for the Link</h1>

            <input
              onChange={(e) => setLinkName(e.target.value)}
              value={linkName}
              type="text"
              placeholder="sem-5-hall-tickets"
              className="placeholder:text-gray-400 px-5 py-2 outline-none border border-gray-800 w-96"
            />
            <h1 className={`${raleway.className} text-4xl font-bold`}>Select Department</h1>

            <select
              value={department}
              onChange={handleDepartmentDropdown}
              className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
            >
              {departmentList.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <div type="submit" onClick={addLinks} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
              <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="relative">Submit</span>
            </div>
          </div>




          <div className='w-[400px]'>
            <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Hall Tickets</h1>
          </div>
          {
            modal && (
              <div className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                <div className="w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Hall Ticket
                      </h3>
                      <button onClick={() => setModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className='flex flex-col space-y-5 mb-20 text-white mx-12 my-5'>

                      <h1 className={`${raleway.className} text-lg font-bold`}>Edit Link</h1>

                      <input
                        onChange={(e) => setEditLink(e.target.value)}
                        value={editLink}
                        type="text"
                        placeholder="https://siesgst.edu.in/"
                        className="placeholder:text-gray-500  bg-gray-800 px-5 py-2 outline-none border border-gray-800 w-96"
                      />
                      <h1 className={`${raleway.className} text-lg font-bold`}>Edit Name of the Link</h1>

                      <input
                        onChange={(e) => setEditLinkName(e.target.value)}
                        value={editLinkName}
                        type="text"
                        placeholder="sem-5-hall-tickets"
                        className="placeholder:text-gray-500  bg-gray-800 px-5 py-2 outline-none border border-gray-800 w-96"
                      />
                      <h1 className={`${raleway.className} text-lg font-bold`}>Edit Department</h1>

                      <select
                        value={editDepartment}
                        onChange={handleEditDepartmentDropdown}
                        className="block w-96  py-2 px-5 leading-tight focus:outline-none bg-gray-800 cursor-pointer "
                      >
                        {departmentList.map((department, index) => (
                          <option key={index} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>

                      <div type="submit" onClick={() => updateLink(modal)} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3 w-20">
                    Links
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Link Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>
              {
                hallTicketsObj.map((hallTicket) => (

                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <h1>{count++}</h1>
                      </th>
                      <th scope="row" class="w-20 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {hallTicket.dept}
                      </th>
                      <td class="px-6 py-4">
                        <h1 className='truncate w-56'>{hallTicket.link}</h1>

                      </td>
                      <td class="px-6 py-4 ">
                        {hallTicket.linkName}
                      </td>
                      <td class="px-6 py-4">
                        <div className='flex justify-around items-center w-[250px] space-x-4'>
                          <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => deleteHallTicket(hallTicket)}>
                            <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                            <h1>Delete Link</h1>
                          </div>
                          <div className=' w-28 flex justify-around items-center cursor-pointer' onClick={() => setModal(hallTicket)}>
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

export default HallTickets