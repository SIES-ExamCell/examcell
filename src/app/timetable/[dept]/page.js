"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Manrope, Raleway } from 'next/font/google';
import Navbar from '../../../../components/Navbar';
import { useRouter } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useSearchParams } from 'next/navigation'

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});


function DepartmentProps({ params }) {
  const [timetableObj, setTimetableObj] = useState([]);
  const [tabTimetable, setTabTimetable] = useState([]);
  const [fetch, setFetch] = useState(true);
  const searchParams = useSearchParams()

  const tabName = searchParams.get('tabName')
  const router = useRouter();

  const departmentDictionary = {
    'PPT': 'Printing & Packaging Technology',
    'CE': 'Computer Engineering',
    'IT': 'Information Technology',
    'ECS': 'Electronics & Computer Science',
    'EXTC': 'Electronics & Telecommunication',
    'AIDS': 'Artificial Intelligence and Data science',
    'AIML': 'Artificial Intelligence and Machine Learning',
    'MECH': 'Mechanical Engineering',
    'IOT': 'IOT',
  };



  // Dynamic fetching wrt to tabs 
  useEffect(() => {
    if (fetch && tabName) {
      const fetchTimetableObj = async () => {
        const querySnapshot = await getDocs(collection(db, "timetableTabs", "P8pKi38JoAJj03O6C9Me", tabName));
        const fetchedTimetable = [];

        querySnapshot.forEach((doc) => {
          fetchedTimetable.push({ id: doc.id, link: doc.data().link, linkName: doc.data().linkName, dept: doc.data().dept });
          console.log(doc.data())

        });

        setTabTimetable(fetchedTimetable);
        setFetch(true);
      }
      fetchTimetableObj();

    }
  }, [fetch, router.pathname]);

  return (
    <>
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className='mx-10 md:mx-28 mt-20'>
        <div className={`${raleway.className} `}>
          <h1 className='text-2xl lg:text-4xl font-semibold tracking-wide '>{departmentDictionary[params.dept]}</h1>
        </div>

        {
          tabName ?
            <>

              {
                tabTimetable ?

                  tabTimetable.map((timetable) => (
                    timetable.dept === departmentDictionary[params.dept] && (
                      <div className={`${manrope.className} mt-5`} key={timetable.id}>
                        <a href={timetable.link} className='text-lg hover:cursor-pointer hover:underline text-blue-600'>{timetable.linkName || timetable.link}</a>
                      </div>
                    )
                  ))

                  :
                  tabTimetable.dept != params.dept && (
                    <div className={`${manrope.className} mt-5`}>
                      <h1 className='text-lg hover:cursor-pointer hover:underline text-blue-600'>No Timetable Found</h1>
                    </div>
                  )
              }
            </>

            :

            <>

              {timetableObj.map((timetable) => (
                timetable.dept === departmentDictionary[params.dept] && (
                  <div className={`${manrope.className} mt-5`} key={timetable.id}>
                    <a href={timetable.link} className='text-lg hover:cursor-pointer hover:underline text-blue-600'>{timetable.linkName || timetable.link}</a>
                  </div>
                )
              ))}

              {timetableObj.length === 0 && (
                <div className={`${manrope.className} mt-5`}>
                  <h1 className='text-lg hover:cursor-pointer hover:underline text-blue-600'>No Timetable Found</h1>
                </div>
              )}

            </>

        }

      </motion.div>
    </>
  );
}

export default DepartmentProps;
