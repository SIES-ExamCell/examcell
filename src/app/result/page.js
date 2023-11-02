"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';


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

                <div className={`${manrope.className} text-center `}>
                    <h1 className=' text-2xl  lg:text-4xl font-semibold tracking-wide p-10'>Launching soon...</h1>
                </div>
             
                {/* <div className='mt-16 grid grid-cols-4 gap-10'>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>PPT</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>CE</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>ECS</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>EXTC</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>AIDS</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>AIML</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>MECH</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>IOT</h1>
                    </Link>
                </div>

                <div className={`${manrope.className} mt-20 text-center  `}>
                    <h1 className=' text-2xl lg:text-4xl font-semibold tracking-wide '>SH 2021 Exam Result (Nov 2021 - Dec 2021)</h1>
                </div>
                <div className='mt-16 grid grid-cols-4 gap-10 my-20'>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>PPT</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>CE</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>ECS</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>EXTC</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>AIDS</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>AIML</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>MECH</h1>
                    </Link>
                    <Link href='/result' className='flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center text-3xl `}>IOT</h1>
                    </Link>
                </div> */}

            </motion.div>
        </>


    )
}

export default page