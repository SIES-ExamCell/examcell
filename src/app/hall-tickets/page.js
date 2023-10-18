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
                    <h1 className=' text-2xl  lg:text-4xl font-semibold tracking-wide '>SE DSE Hall tickets of SH 2022 Exam</h1>
                </div>
                {/* List of dept */}

                <div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-10'>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>PPT</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>CE</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>ECS</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>EXTC</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>AIDS</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>AIML</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>MECH</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl `}>IOT</h1>
                    </Link>
                </div>

                <div className={`${manrope.className} mt-20 text-center  `}>
                    <h1 className=' text-2xl lg:text-4xl font-semibold tracking-wide '> FE Hall tickets of SH 2022 exam</h1>
                </div>
                {/* List of dept */}
                <div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 my-20'>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>PPT</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>CE</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>ECS</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>EXTC</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>AIDS</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>AIML</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>MECH</h1>
                    </Link>
                    <Link href='/result' className='px-12 py-4 md:px-0 md:py-0 flex justify-center items-center md:w-[200px] md:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300'>
                        <h1 className={`${manrope.className} text-center md:text-3xl text-2xl`}>IOT</h1>
                    </Link>
                </div>

            </motion.div>
        </>


    )
}

export default page