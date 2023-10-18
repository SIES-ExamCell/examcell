"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Manrope, Raleway } from 'next/font/google';
import Navbar from '../../../../components/Navbar';
import { useRouter } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});
function DepartmentProps({ params }) {
  const [hallTicketsObj, setHallTicketsObj] = useState([]);
  const [fetch, setFetch] = useState(true);

  const router = useRouter();
  const departmentDictionary = {
    'PPT': 'Printing & Packaging Technology',
    'CE': 'Computer Engineering',
    'ECS': 'Electronics & Computer Science',
    'EXTC': 'Electronics & Telecommunication',
    'AIDS': 'Artificial Intelligence and Data science',
    'AIML': 'Artificial Intelligence and Machine Learning',
    'MECH': 'Mechanical Engineering',
    'IOT': 'IOT',
  };

  useEffect(() => {
    if (fetch && router.pathname !== '/notices') {
      const fetchHallTicketsObj = async () => {
        const querySnapshot = await getDocs(collection(db, 'hallTickets'));
        const fetchedHallTickets = [];

        querySnapshot.forEach((doc) => {
          fetchedHallTickets.push({ id: doc.id, link: doc.data().link, dept: doc.data().dept });
        });

        setHallTicketsObj(fetchedHallTickets);
      };

      fetchHallTicketsObj();
    }
  }, [fetch, router.pathname]);

  return (
    <>
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className='mx-10 md:mx-28 mt-20'>
        <div className={`${raleway.className} `}>
          <h1 className='text-2xl lg:text-4xl font-semibold tracking-wide '>{departmentDictionary[params.dept]}</h1>
        </div>
        {hallTicketsObj.map((hallTicket) => (
          hallTicket.dept === departmentDictionary[params.dept] && (
            <div className={`${manrope.className} mt-5`} key={hallTicket.id}>
              <a href={hallTicket.link} className='text-lg hover:cursor-pointer hover:underline text-blue-600'>{hallTicket.link}</a>
            </div>
          )
        ))}

        {hallTicketsObj.length === 0 && (
          <div className={`${manrope.className} mt-5`}>
            <h1 className='text-lg hover:cursor-pointer hover:underline text-blue-600'>No Hall Tickets Found</h1>
          </div>
        )}

      </motion.div>
    </>
  );
}

export default DepartmentProps;
