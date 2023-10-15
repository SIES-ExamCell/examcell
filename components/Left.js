"use client"

import Link from 'next/link'
import React, { useContext, useState } from 'react'
// import Project from '../../assets/achievement.png';
// import Billing from '../../assets/bank.png';
// import Influencer from '../../assets/user.png'
// import Stats from '../../assets/bar-chart.png';
// import Settings from '../../assets/gear.png';
// import Manager from '../../assets/manager.png';
// import Schedule from '../../assets/schedule.png';
// import { EngagementContext } from "../../Contexts/EngagementContext";
// import { UserContext } from '../../Contexts/UserContext';

function Left() {


    //   const { show, setShow, data, media, userDetails } = useContext(EngagementContext);

    return (
        <div className='flex items-center flex-col mt-28  min-w-[200px]'>

            <div className='flex justify-center items-center ml-6 mb-72'>
                <div className='flex flex-col justify-center items-center space-y-8'>
                    <Link href="/admin-page" >
                        <div className='mt-2 mr-4 hover:cursor-pointer'>
                            <img src="./home.png" alt="home" className='w-6 h-6 object-contain' />
                        </div>
                    </Link>

                    <div className='mt-2 mr-4 hover:cursor-pointer'>
                        <img src="./notifications.png" alt="notifications" className='w-6 h-6 object-contain' />
                    </div>
                    <div className='mt-2 mr-4 hover:cursor-pointer'>
                        <img src="./important-links.png" alt="links" className='w-6 h-6 object-contain' />
                    </div>
                    <div className='mt-2 mr-4 hover:cursor-pointer'>
                        <img src="./results.png" alt="results" className='w-6 h-6 object-contain' />
                    </div>
                    <div className='mt-2 mr-4 hover:cursor-pointer'>
                        <img src="./timetable.png" alt="timetable" className='w-6 h-6 object-contain' />
                    </div>
                    <div className='mt-2 mr-4 hover:cursor-pointer'>
                        <img src="./hall-tickets.png" alt="hall-tickets" className='w-6 h-6 object-contain' />
                    </div>
                    <div className='mt-2 mr-4 hover:cursor-pointer'>
                        <img src="./settings.png" alt="Settings" className='w-6 h-6 object-contain' />
                    </div>
                </div>

                <div className='flex flex-col justify-center space-y-8 mt-2'>
                    <Link href="/admin-page" >
                        <div className='hover:cursor-pointer'>
                            <h1>Home</h1>
                        </div>
                    </Link>
                    <div className='hover:cursor-pointer'>
                        <Link href="/edit-notifications" className="nav-link">
                            <h1>Notifications</h1>
                        </Link>
                    </div>
                    <Link href="/important-links" >
                        <div className='hover:cursor-pointer'>
                            <h1>Important Links</h1>
                        </div>
                    </Link>
                    <Link href="/create-results" >
                        <div className='hover:cursor-pointer'>
                            <h1>Results</h1>
                        </div>
                    </Link>
                    <Link href="/create-exam-timetable" >
                        <div className='hover:cursor-pointer'>
                            <h1>Exam Timetable</h1>
                        </div>
                    </Link>
                    <Link href="/create-hall-tickets" >
                        <div className='hover:cursor-pointer'>
                            <h1>Hall Tickets</h1>
                        </div>
                    </Link>
                    <Link href="/settings" >
                        <div className='hover:cursor-pointer'>
                            <h1>Settings</h1>
                        </div>
                    </Link>

                </div>
            </div>


        </div >


    )
}

export default Left