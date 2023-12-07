"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Manrope, Raleway } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import HallTicketsBeta from '../../../components/HallTicketsBeta'
import Left from '../../../components/Left'


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
        <div className='flex bg-gray-100'>
            <Left className='flex-none' />
            <div className='ml-10 w-[1px] h-screen bg-gray-200 drop-shadow-sm' />
            <HallTicketsBeta className="flex-auto" />
        </div>
    )
}

export default page