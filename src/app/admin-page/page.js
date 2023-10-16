"use client"

import React, { useState, useEffect, useContext } from 'react'
import Left from '../../../components/Left';
import Middle from '../../../components/Middle';
import { authGuard } from "../../../auth"
// import { AuthContext } from "../../../contexts/AuthContext"

function page() {

  // useEffect(() => {
  //   authGuard();
  // }, []);

  // const { admin, setAdmin } = useContext(AuthContext);

  // console.log(admin)
  return (
    <div className='flex bg-gray-100'>
      <Left className='flex-none' />
      <div className='ml-10 w-[1px] h-screen bg-gray-200 drop-shadow-sm' />
      <Middle className="flex-auto" />
    </div>
  )
}

export default page

