"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';


const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '700'],
    subsets: ['latin'],
});
function page() {
    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className='mx-10 md:mx-28 mt-20'>

                <div className={`${raleway.className} `}>
                    <h1 className=' text-2xl  lg:text-4xl font-semibold tracking-wide '>Sample Question Papers</h1>
                </div>
                <div className={`${manrope.className} mt-5`}>
                    <h1 className='text-lg hover:cursor-pointer hover:underline text-blue-600'>SH 2022 exam Revaluation notice for CE (sem III, IV, V, Honours & VI), AIDS (sem III), IOT (sem III)</h1>
                    <h1 className='text-lg hover:cursor-pointer hover:underline text-blue-600'>SH 2022 exam Revaluation notice for IT (sem III, IV, V, Honours)</h1>
                </div>
            </motion.div>
        </>


    )
}

export default page