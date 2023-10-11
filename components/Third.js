import React from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '700'],
    subsets: ['latin'],
});
function Third() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className='flex-col flex mt-36 '>

            <div className={`${raleway.className} lg:w-screen lg:space-y-12 space-y-3 `}>
                <h1 className=' text-2xl md:text-5xl lg:text-6xl font-bold tracking-wide text-center'>Office Timings</h1>
            </div>


            <div className='flex  flex-col w-auto h-[1000px] mx-28 bg-red-600 my-20'>
                {/* First Div */}
                <div className='flex md:space-x-4 items-center justify-center bg-[#fde047] rounded-lg py-2 px-2 shadow-lg md:w-full h-20 '>
                    <Image
                        src="/icon1.png"
                        width={40}
                        height={40}
                        alt="icon-1"
                    />
                    <h1 className={`${manrope.className} text-lg text-left`}>Conducting examinations</h1>
                </div>
                <div className='flex md:space-x-4 items-center justify-center bg-[#a5b4fc] rounded-lg py-2 px-2 shadow-lg md:w-full h-20'>
                    <Image
                        src="/evaluation.png"
                        width={40}
                        height={40}
                        alt="icon-2"
                    />
                    <h1 className={`${manrope.className} text-lg  text-left`}>Evaluation Process</h1>
                </div>
                <div className='flex md:space-x-4 items-center justify-center bg-[#86efac] rounded-lg py-2 px-2 shadow-lg md:w-full h-20'>
                    <Image
                        src="/communication.png"
                        width={40}
                        height={40}
                        alt="icon-3"
                    />
                    <h1 className={`${manrope.className} text-lg  text-left`}>Communicating with UoM</h1>
                </div>
            </div>
        </motion.div>

    )
}

export default Third