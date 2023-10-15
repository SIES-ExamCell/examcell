"use client"

import React, { useState, useEffect } from 'react'
import Left from '../../../components/Left';
import Middle from '../../../components/Middle';
// import { EngagementContext } from "../../Contexts/EngagementContext";

function page() {

    const [show, setShow] = useState({ showPost: false, id: "" });

    return (
        <div className='flex bg-gray-100'>
            {/* <EngagementContext.Provider value={{ show, setShow, IMG, userDetails }}> */}
                <Left className='flex-none' />
                <div className='ml-10 w-[1px] h-screen bg-gray-200 drop-shadow-sm' />
                <Middle className="flex-auto" />
            {/* </EngagementContext.Provider> */}
        </div>
    )
}

export default page