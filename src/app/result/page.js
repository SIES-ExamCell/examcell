"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Manrope, Raleway } from 'next/font/google';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Image from 'next/image';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '700'],
    subsets: ['latin'],
});

function page() {

    const router = useRouter();
    const [fetch, setFetch] = useState(false)
    const [selectedTab, setSelectedTab] = useState(null)

    const departmentList = ['PPT', 'CE', 'IT', 'ECS', 'EXTC', 'AIDS', 'AIML', 'MECH', 'IOT', 'FE', 'PG'];

    const [tabsObj, setTabsObj] = useState([])


    useEffect(() => {
        if (!fetch) {
            const fetchResultTabsObj = async () => {
                const querySnapshot = await getDocs(collection(db, "resultTabs"));
                const fetchedResultTabs = [];

                querySnapshot.forEach((doc) => {
                    fetchedResultTabs.push({ id: doc.id, name: doc.data().name, selectedTab: false });
                });

                setTabsObj(fetchedResultTabs);
                setFetch(true);
            }

            fetchResultTabsObj();
        }
    }, [fetch]);

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="mx-10 lg:mx-28 mt-20 mb-20"
            >

       
                {tabsObj.map((tab) => (
                    <>
                        <div className={`${manrope.className} flex justify-center items-center space-x-6 text-center mt-10 py-8 md:px-20 md:py-10 xl:px-44 xl:py-12  border border-gray-800 rounded-lg shadow-lg hover:cursor-pointer`} onClick={() => {
                            tab.selectedTab == true ? tab.selectedTab = false : tab.selectedTab = true;
                            selectedTab ? setSelectedTab(null) : setSelectedTab(tab.name)
                        }}>
                            <h1 className="text-2xl lg:text-4xl font-semibold tracking-wide">
                                {tab.name}
                            </h1>

                            <div className=''>
                                <Image
                                    src="/down.png"
                                    width={30}
                                    height={30}
                                    alt="down icon"
                                    className='object-contain hover:cursor-pointer'
                                />
                            </div>

                        </div>
                        {
                            (tab.selectedTab === false) && (
                                <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                                    {departmentList.map((department) => (
                                        <Link
                                            key={department}
                                            href={{
                                                pathname: `/result/${department}`,
                                                query: { dept: department, tabName: tab.name },
                                            }}
                                            className="px-12 py-4 lg:px-0 lg:py-0 flex justify-center items-center lg:w-[200px] lg:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                        >
                                            <h1 className={`${manrope.className} text-center lg:text-3xl text-2xl`}>
                                                {department}
                                            </h1>
                                        </Link>
                                    )


                                    )}
                                </div>
                            )
                        }
                    </>
                ))}
            </motion.div >
        </>
    );
}

export default page;
