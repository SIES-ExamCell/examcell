import React from 'react';
import { motion } from 'framer-motion';
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
            className="flex-col flex mt-36"
        >
            <div className={`${raleway.className} lg:w-screen lg:space-y-12 space-y-3`}>
                <h1 className="text-3xl  lg:text-6xl font-bold tracking-wide text-center">
                    Office Timings
                </h1>
            </div>

            <div
                className="flex justify-center items-center bg-center bg-cover w-screen "
            >
                <div className=' flex flex-col md:flex-row justify-center items-center'>
                    <Image
                        src="/office-timings-image.png"
                        width={700}
                        height={800}
                        alt="sideimage"
                        className='object-contain flex md:hidden'
                    />

                    <div className={`${manrope.className} text-left flex justify-center items-center text-xl xl:mx-36 lg:mx-20 mx-14`}>
                        <ul className="list-disc space-y-4">
                            <li>Location: Room No. 315 on 3rd Floor</li>
                            <li>The working hours will be 9.30 am to 4.30 pm (Monday to Friday and 2nd and 4th Saturday)</li>
                            <li>Lunch: 1.30 pm to 2.00 pm</li>
                            <li>It will be closed on 1st and 3rd Saturday and bank holidays.</li>
                            <li>For any urgent work, put a mail on examcellgst@sies.edu.in</li>
                        </ul>
                    </div>

                    <Image
                        src="/office-timings-image.png"
                        width={700}
                        height={800}
                        alt="sideimage"
                        className='object-contain hidden md:flex'
                    />
                </div>

            </div>

            <div>{/* Additional content goes here */}</div>
        </motion.div>
    );
}

export default Third;
