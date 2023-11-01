"use client"

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Manrope, Raleway } from 'next/font/google';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

    const departmentList = ['PPT', 'CE', 'ECS', 'EXTC', 'AIDS', 'AIML', 'MECH', 'IOT'];


    
    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="mx-10 lg:mx-28 mt-20"
            >
                <div className={`${manrope.className} text-center `}>
                    <h1 className="text-2xl lg:text-4xl font-semibold tracking-wide">
                        SE DSE Hall tickets of SH 2022 Exam
                    </h1>
                </div>
                {/* List of dept */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {departmentList.map((department) => (
                        <Link
                            key={department}
                            href={{
                                pathname: `/hall-tickets/${department}`,
                                query: { dept: department },
                            }}

                            // href={`/hall-tickets/${department.toLowerCase()}`}
                            className="px-12 py-4 lg:px-0 lg:py-0 flex justify-center items-center lg:w-[200px] lg:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                        >
                            <h1 className={`${manrope.className} text-center lg:text-3xl text-2xl `}>
                                {department}
                            </h1>
                        </Link>
                    ))}
                </div>
                <div className={`${manrope.className} mt-20 text-center  `}>
                    <h1 className="text-2xl lg:text-4xl font-semibold tracking-wide"> FE Hall tickets of SH 2022 exam</h1>
                </div>
                {/* List of dept */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-10 my-20">
                    {departmentList.map((department) => (
                        <Link
                            key={department}
                            href={{
                                pathname: `/hall-tickets/${department}`,
                                query: { dept: department },
                            }} className="px-12 py-4 lg:px-0 lg:py-0 flex justify-center items-center lg:w-[200px] lg:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                        >
                            <h1 className={`${manrope.className} text-center lg:text-3xl text-2xl`}>{department}</h1>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </>
    );
}

export default page;
