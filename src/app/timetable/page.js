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

                <div className={`${manrope.className} text-center `}>
                    <h1 className=' text-2xl  lg:text-4xl font-semibold tracking-wide p-10'>Launching soon...</h1>
                </div>
{/* 
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 my-20">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-700">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Department
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Link to download
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Computer Engineering
                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    CE SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Electronics & Telecommunication

                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    EXTC SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Information Technology

                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    IT SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Electronics & Computer Science

                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    ECS SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Mechanical Engineering


                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    MECH SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    CSE IOT

                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    CSE IOT SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    CSE AIDS

                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    CSE AIDS SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    CSE AIML

                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    CSE AIML SEM III-C SCHEME-R19
                                </td>

                            </tr>
                            <tr class="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    FE

                                </th>
                                <td class="px-6 py-4 hover:cursor-pointer text-blue-600 hover:underline">
                                    FE SEM III-C SCHEME-R19
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div> */}




            </motion.div>
        </>


    )
}

export default page