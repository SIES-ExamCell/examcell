"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Navbar from '../../../components/Navbar';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from "../../../firebase"

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '700'],
    subsets: ['latin'],
});
function page() {
    const [notificationsObj, setNotificationsObj] = useState([])
    const [fetch, setFetch] = useState(false)
    const [notification, setNotification] = useState("")
    const [query, setQuery] = useState("")
    const [modal, setModal] = useState(false)
    var count = 1;
    const [linksObj, setLinksObj] = useState([])


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
          const fetchImportantLinksObj = async () => {
            const querySnapshot = await getDocs(collection(db, "importantLinks"));
            const fetchedLinks = [];
    
            querySnapshot.forEach((doc) => {
              fetchedLinks.push({ id: doc.id, link: doc.data().link , name: doc.data().name });
            });
    
            setLinksObj(fetchedLinks);
            setFetch(true);
          }
    
          fetchImportantLinksObj();
        }
      }, [fetch]);

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className='mx-10 md:mx-28 mt-20'>

                <div className={`${raleway.className} `}>
                    <h1 className=' text-2xl  lg:text-4xl font-semibold tracking-wide '>Important Notices</h1>
                </div>

                {notificationsObj.map((notification) => (
                    <div className={`${manrope.className} mt-5`} key={notification.id}>
                        <h1 className='text-lg hover:cursor-pointer  text-blue-600'>{notification.desc}</h1>
                    </div>
                ))}
                {linksObj.map((link) => (
                    <div className={`${manrope.className} mt-5`} key={link.id}>
                        <a href={link.link} className='text-lg hover:cursor-pointer hover:underline text-blue-600'>{link.name}</a>
                    </div>
                ))}

            </motion.div>
        </>


    )
}

export default page