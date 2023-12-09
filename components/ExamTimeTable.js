"use client"

import React, { useEffect, useState } from 'react'
import { Manrope, Raleway } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';


const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '700'],
    subsets: ['latin'],
});



function ExamTimeTable() {
    var count = 1;
    var timetablecount = 1;
    const router = useRouter();
    const [timetableObj, setTimetableObj] = useState([])
    const [department, setDepartment] = useState("Electronics & Telecommunication")
    const [createDepartment, setCreateDepartment] = useState()
    // Timetable Modal States
    const [createTimetableDepartment, setCreateTimetableDepartment] = useState()
    const [createTimetableLinkName, setCreateTimetableLinkName] = useState()
    const [createTimetableLink, setCreateTimetableLink] = useState()

    const [editDepartment, setEditDepartment] = useState()
    const [currentTab, setCurrentTab] = useState()
    const [tabName, setTabName] = useState()
    const [fetch, setFetch] = useState(false)
    const [link, setLink] = useState()
    const [editLink, setEditLink] = useState()
    const [linkName, setLinkName] = useState()
    const [editLinkName, setEditLinkName] = useState()
    const [modal, setModal] = useState(null)
    const [newTabModal, setNewTabModal] = useState(null)
    const [timetableModal, setTimetableModal] = useState(null)

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

    const handleEditDepartmentDropdown = (event) => {
        setEditDepartment(event.target.value);
    };
    const handleCreateDepartmentDropdown = (event) => {
        setCreateDepartment(event.target.value);
    };
    const handleCreateTimetableDepartmentDropdown = (event) => {
        setCreateTimetableDepartment(event.target.value);
    };


    var isAdmin = ''
    useEffect(() => {
        if (typeof window !== 'undefined') {
            isAdmin = localStorage.getItem("isAdmin") === "true" || '';
        }
        if (!isAdmin) {
            router.push('faculty-login');
        }
    }, [])

    const [timetableTabsObj, setTimetableTabsObj] = useState([])

    useEffect(() => {
        if (!fetch) {
            const fetchTimetableTabsObj = async () => {
                const querySnapshot = await getDocs(collection(db, "timetableTabs"));
                const fetchedTimetableTabs = [];

                querySnapshot.forEach((doc) => {
                    fetchedTimetableTabs.push({ id: doc.id, name: doc.data().name });
                });

                setTimetableTabsObj(fetchedTimetableTabs);
                setFetch(true);
            }

            fetchTimetableTabsObj();
        }
    }, [fetch]);

    // Separate call for creating tab 
    async function addDoc1(docRef, data) {
        try {
            const doc = await addDoc(docRef, data);
            return doc;
        } catch (error) {
            throw error;
        }
    }
    // Separate call for creating tab

    async function addDoc2(docRef, data) {
        try {
            const doc = await addDoc(docRef, data);
            return doc;
        } catch (error) {
            throw error;
        }
    }

    async function createTab() {
        const docRef = collection(db, 'timetableTabs', 'P8pKi38JoAJj03O6C9Me', tabName);
        const docRef2 = collection(db, 'timetableTabs');

        if (link && createDepartment && linkName && tabName) {
            try {
                const doc = await addDoc1(docRef, {
                    tabName: tabName,
                    link: link,
                    linkName: linkName,
                    dept: createDepartment
                });

                const doc2 = await addDoc2(docRef2, {
                    name: tabName
                });

                notifySuccess('Created Link for Timetable successfully');
                setLink('');
                setLinkName('');
                setCreateDepartment(null);
                setTabName('');
                window.location.reload();
            } catch (error) {
                notifyError('Something went wrong');
                console.log(error);
            }
        } else {
            notifyError('Missing Details');
        }
    }


    const fetchTimetableObj = async (tab) => {
        const querySnapshot = await getDocs(collection(db, "timetableTabs", "P8pKi38JoAJj03O6C9Me", tab.name));
        const fetchedTimetable = [];

        querySnapshot.forEach((doc) => {
            fetchedTimetable.push({ id: doc.id, link: doc.data().link, linkName: doc.data().linkName, dept: doc.data().dept });
        });

        setTimetableObj(fetchedTimetable);
        setFetch(true);
    }

    const createTimetable = async () => {
        if (createTimetableLink && createTimetableDepartment && createTimetableLinkName && currentTab) {

            try {
                const docRef = await addDoc(collection(db, "timetableTabs", "P8pKi38JoAJj03O6C9Me", currentTab), {
                    link: createTimetableLink,
                    dept: createTimetableDepartment,
                    linkName: createTimetableLinkName,
                    tabName: currentTab
                });

                notifySuccess('Created Link for Timetable successfully');
                setCreateTimetableLink('');
                setCreateTimetableDepartment('');
                setCreateTimetableLinkName(null);
                window.location.reload();
            } catch (error) {
                notifyError('Something went wrong');
            }
        }

        else if (!createTimetableLink && createTimetableDepartment) {
            notifyError('Missing link');
        }
        else if (createTimetableLink && !createTimetableDepartment) {
            notifyError('Missing department');
        }
        else {
            notifyError('Missing Details');
        }

    };
    async function deleteTab(tab) {
        var answer = window.confirm("Delete Timetable Tab? [Note: This step is irreversible]");
        if (answer) {
            // Query all documents in the collection
            const querySnapshot = await getDocs(collection(db, "timetableTabs", "P8pKi38JoAJj03O6C9Me", tab.name));

            // Delete each document
            const deletePromises = querySnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
            });

            // Wait for all deletions to complete
            await Promise.all(deletePromises);


            const collectionRef = collection(db, "timetableTabs");

            const q = query(collectionRef, where("name", '==', tab.name));

            // Execute the query
            const querySnapshot2 = await getDocs(q);

            // Loop through the matching documents and delete each one
            querySnapshot2.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                notifySuccess('Document deleted:', doc.id);
            });


            window.location.reload();
        } else {
            return;
        }
    }

    async function deleteTimetable(timetable) {
        var answer = window.confirm("Delete Link for Timetable?");
        if (answer) {
            await deleteDoc(doc(db, "timetableTabs", "P8pKi38JoAJj03O6C9Me", currentTab, timetable.id));
            window.location.reload();
        }
        else {
            return;
        }
    }
    async function updateLink(timetable) {
        const docRef = doc(db, "timetableTabs", "P8pKi38JoAJj03O6C9Me", currentTab, timetable.id);


        try {
            await updateDoc(docRef, {
                link: editLink ? editLink : timetable.link,
                dept: editDepartment ? editDepartment : timetable.dept,
                linkName: editLinkName ? editLinkName : timetable.linkName,
            });

            notifySuccess('Updated the Link for Timetable Successfully');
            window.location.reload();
        } catch (error) {
            notifyError('Unable to update');
        }
    }

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
            <div className='mx-20 my-20'>
                <h1 className={`${manrope.className} `} ></h1>
                <div className='flex justify-around items-center'>

                    <div className='flex justify-center items-center mb-20'>
                        <div onClick={() => setNewTabModal(true)} class="flex flex-row max-w-xl items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-gray-100 px-10 py-4 ">
                            <Image width={50} height={50} class="" src="/hallticket-tab.png" alt="" />
                            <div class="flex flex-col justify-between p-4 leading-normal">
                                <h1 className={`${manrope.className} font-bold text-xl`} >Create Timetable Tab</h1>
                            </div>
                        </div>
                    </div>
                    {
                        currentTab && (
                            <div className='flex justify-center items-center mb-20'>
                                <div onClick={() => setTimetableModal(true)} class="flex flex-row max-w-xl items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-gray-100 px-10 py-4 ">
                                    <Image width={50} height={50} class="" src="/hallticket-tab.png" alt="" />
                                    <div class="flex flex-col justify-between p-4 leading-normal">
                                        <h1 className={`${manrope.className} font-bold text-xl`} >Add Timetable</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>

                <div className='w-[600px]'>
                    <h1 className={`${raleway.className} text-4xl font-bold`}>Existing Timetable Tabs</h1>
                </div>

                {
                    timetableModal && (
                        <div className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                            <div className="w-full max-w-2xl bg-white rounded-lg  ">
                                <div class="relative bg-white rounded-lg shadow ">
                                    <div class="flex items-start justify-between p-4 border-b  ">
                                        <h3 class="text-xl font-semibold text-black ">
                                            Create Timetable Link
                                        </h3>
                                        <button onClick={() => {
                                            setCreateTimetableDepartment('');
                                            setCreateTimetableLink('');
                                            setCreateTimetableLinkName('');
                                            setTimetableModal(null)
                                        }} type="button" class=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className='flex flex-col space-y-5 mb-20 text-black mx-12 my-5'>


                                        <h1 className={`${manrope.className} text-lg font-bold`}>Enter link name</h1>

                                        <input
                                            onChange={(e) => setCreateTimetableLinkName(e.target.value)}
                                            value={createTimetableLinkName}
                                            type="text"
                                            placeholder="sem-5-timetable"
                                            className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                        />
                                        <h1 className={`${manrope.className} text-lg font-bold`}>Enter URL</h1>

                                        <input
                                            onChange={(e) => setCreateTimetableLink(e.target.value)}
                                            value={createTimetableLink}
                                            type="text"
                                            placeholder="https://portal.siesgst.ac.in/"
                                            className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                        />
                                        <h1 className={`${manrope.className} text-lg font-bold`}>Select Department</h1>

                                        <select
                                            value={createTimetableDepartment}
                                            onChange={handleCreateTimetableDepartmentDropdown}
                                            className="block w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                        >
                                            {departmentList.map((department, index) => (
                                                <option key={index} value={department}>
                                                    {department}
                                                </option>
                                            ))}
                                        </select>

                                        <div type="submit" onClick={() => createTimetable()} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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
                {
                    newTabModal && (
                        <div className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                            <div className="w-full max-w-2xl bg-white rounded-lg  ">
                                <div class="relative bg-white rounded-lg shadow ">
                                    <div class="flex items-start justify-between p-4 border-b  ">
                                        <h3 class="text-xl font-semibold text-black ">
                                            Create Timetable Tab
                                        </h3>
                                        <button onClick={() => {
                                            setLink('');
                                            setLinkName('');
                                            setDepartment(null);
                                            setTabName('');
                                            setNewTabModal(null)
                                        }} type="button" class=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className='flex flex-col space-y-5 mb-20 text-black mx-12 my-5'>

                                        <h1 className={`${manrope.className} flex text-lg font-bold`}>Enter name for tab <section className='ml-4 text-red-600 '>(Non-Editable)</section></h1>

                                        <input
                                            onChange={(e) => setTabName(e.target.value)}
                                            value={tabName}
                                            type="text"
                                            placeholder="SH 2023 Examination Timetable"
                                            className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                        />
                                        <h1 className={`${manrope.className} text-lg font-bold`}>Enter link name</h1>

                                        <input
                                            onChange={(e) => setLinkName(e.target.value)}
                                            value={linkName}
                                            type="text"
                                            placeholder="sem-5-timetable"
                                            className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                        />
                                        <h1 className={`${manrope.className} text-lg font-bold`}>Enter URL</h1>

                                        <input
                                            onChange={(e) => setLink(e.target.value)}
                                            value={link}
                                            type="text"
                                            placeholder="https://portal.siesgst.ac.in/"
                                            className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                        />
                                        <h1 className={`${manrope.className} text-lg font-bold`}>Select Department</h1>

                                        <select
                                            value={createDepartment}
                                            onChange={handleCreateDepartmentDropdown}
                                            className="block w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                        >
                                            {departmentList.map((department, index) => (
                                                <option key={index} value={department}>
                                                    {department}
                                                </option>
                                            ))}
                                        </select>

                                        <div type="submit" onClick={() => createTab()} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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


                {
                    modal && (
                        <div className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                            <div className="w-full max-w-2xl bg-white rounded-lg  ">
                                <div class="relative bg-white rounded-lg shadow ">
                                    <div class="flex items-start justify-between p-4 border-b  ">
                                        <h3 class="text-xl font-semibold text-black ">
                                            Edit Timetable
                                        </h3>
                                        <button onClick={() => setModal(null)} type="button" class=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className='flex flex-col space-y-5 mb-20 text-black mx-12 my-5'>

                                        <h1 className={`${manrope.className} text-lg font-bold`}>Edit Link</h1>

                                        <input
                                            onChange={(e) => setEditLink(e.target.value)}
                                            value={editLink}
                                            type="text"
                                            placeholder="https://siesgst.edu.in/"
                                            className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                        />
                                        <h1 className={`${manrope.className} text-lg font-bold`}>Edit Name of the Link</h1>

                                        <input
                                            onChange={(e) => setEditLinkName(e.target.value)}
                                            value={editLinkName}
                                            type="text"
                                            placeholder="sem-5-timetable"
                                            className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                        />
                                        <h1 className={`${manrope.className} text-lg font-bold`}>Edit Department</h1>

                                        <select
                                            value={editDepartment}
                                            onChange={handleEditDepartmentDropdown}
                                            className="block w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
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
                                    Tabs
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        {
                            timetableTabsObj.map((tab) => (

                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <h1>{count++}</h1>
                                        </th>
                                        <td class="px-6 py-4">
                                            <h1 className='truncate w-96'>{tab.name}</h1>
                                        </td>

                                        <td class="px-6 py-4 ">

                                            <div className='flex justify-around items-center w-[250px] space-x-4'>
                                                <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => {
                                                    fetchTimetableObj(tab)
                                                    setCurrentTab(tab.name)
                                                }}>
                                                    <img src='./viewtab.png' alt="view" className='w-5 h-5 ' />
                                                    <h1>View Tab</h1>
                                                </div>
                                                <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => deleteTab(tab)}>
                                                    <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                                                    <h1>Delete Tab</h1>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>

                {
                    timetableObj.length > 0 && (
                        <>
                            <div className='w-[600px] mt-20'>
                                <h1 className={`${raleway.className} text-4xl font-bold`}>{currentTab}</h1>
                            </div>
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
                                        timetableObj.map((timetable) => (

                                            <tbody>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <h1>{timetablecount++}</h1>
                                                    </th>
                                                    <th scope="row" class="w-20 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {timetable.dept}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        <h1 className='truncate w-56'>{timetable.link}</h1>

                                                    </td>
                                                    <td class="px-6 py-4 ">
                                                        {timetable.linkName}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <div className='flex justify-around items-center w-[250px] space-x-4'>
                                                            <div className=' w-32 flex justify-around items-center cursor-pointer' onClick={() => deleteTimetable(timetable)}>
                                                                <img src='./delete.png' alt="remove" className='w-5 h-5 ' />
                                                                <h1>Delete Link</h1>
                                                            </div>
                                                            <div className=' w-28 flex justify-around items-center cursor-pointer' onClick={() => setModal(timetable)}>
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
                        </>
                    )
                }

            </div>


        </>


    )
}

export default ExamTimeTable