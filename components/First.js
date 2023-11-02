import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from "../firebase"


const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '700'],
    subsets: ['latin'],
});

function First() {

    const [close, setClose] = useState(false)
    const [bannersObj, setBannersObj] = useState([])
    const lastNoticeDesc = ''
    const [fetch, setFetch] = useState(false)


    useEffect(() => {
        if (!fetch) {
            const fetchBannersObj = async () => {
                const querySnapshot = await getDocs(collection(db, 'banners'));
                const fetchBanners = [];

                querySnapshot.forEach((doc) => {
                    fetchBanners.push({ id: doc.id, banner: doc.data().banner });
                });

                setBannersObj(fetchBanners);
                setFetch(true);

            };

            fetchBannersObj();
        }
    }, [fetch]);

    return (
        <>
            {/* Homepage Dismissable notification */}
            {
                close || (
                    <div className='flex justify-center items-center p-10 md:p-0 md:mt-10'>
                        <section className='bg-[#fca5a5] w-auto max-w-[700px] py-4 px-10 h-auto rounded-xl flex space-x-6'>


                            {bannersObj.length > 0 && (
                                <h1 className={`${manrope.className} text-xl text-left md:text-center`}>
                                    Notice: {bannersObj[0].banner}
                                </h1>
                            )}
                            {/* Close icon */}
                            <Image
                                src="/close.png"
                                width={15}
                                height={15}
                                alt="close icon"
                                className='object-contain hover:cursor-pointer'
                                onClick={() => setClose(true)}
                            />
                        </section >
                    </div >
                )

            }
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className='lg:flex-row flex-col flex justify-center lg:justify-normal items-center space-y-4 md:space-y-12 lg:space-x-32 lg:space-y-20  lg:mx-28 mx-10 mt-10 lg:mt-10'>

                <div className='hidden lg:flex lg:w-1/2'>
                    <Image
                        src="/sideimage-1.jpg"
                        width={700}
                        height={800}
                        alt="sideimage"
                        className='object-contain'
                    />
                </div>
                <div className='lg:hidden flex'>
                    <Image
                        src="/sideimage-1.jpg"
                        width={700}
                        height={800}
                        alt="sideimage"
                        className='object-contain'
                    />
                </div>
                <div className={`${raleway.className} lg:w-1/2 lg:space-y-12 space-y-3 text-center`}>
                    <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide'>SIES GST Examcell</h1>
                    <h1 className={`${manrope.className} text-xl md:text-2xl lg:text-2xl font-normal `}>Examination Cell of SIESGST functions as per the guidelines provided by Controller of Examination of UoM.</h1>
                </div>
            </motion.div>
        </>
    )
}

export default First;
