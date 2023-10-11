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
                className='mx-28 mt-20'>

                <div className={`${raleway.className} `}>
                    <h1 className=' text-2xl  lg:text-4xl font-semibold tracking-wide '>About us</h1>
                </div>
                <div className={`${manrope.className} mt-5`}>
                    <h1 className='text-lg text-[#334155]'>Examination cell at SIESGST is headed by the Exam cell In-charge with 5 supporting staff consisting three clerks, one peon and one assistant Exam Cell In-charge from faculty. Conduction of examinations and central assessment process with result preparation are the prime responsibilities of the Exam cell on behalf of University of Mumbai. Further, Exam cell coordinates with the University regarding all examination matters. The In-charge Examinations reports the Principal in all examination matters. Any information either received or required to be sent to the University is being dealt by the Exam cell in co-ordination with departments. Exam Cell is responsible to display examination timetable, coordinate and conduct external examinations, process marks, publish results and conduct convocation.</h1>
                </div>
                <div className={`${raleway.className} mt-20`}>
                    <h1 className=' text-2xl  lg:text-4xl font-semibold tracking-wide '>Roles and Responsibilities</h1>
                </div>
                <div className={`${manrope.className} mt-5 text-lg text-[#334155] my-20`}>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        <li>Examination notices received from the University are duly served to all concerned.</li>
                        <li>Notices from University indicating details regarding exam fee collection, the last date of fee collection, modalities of payment of fine etc., are displayed.</li>
                        <li>Preparation of smooth conduct of examinations, preparation of Exam Schedule, allocation of Seat Numbers, issue of Hall Tickets to the students, conduction of CAP.</li>
                        <li>After the results of various examinations received from the University, distribution of mark sheets to students, grievance redressal.</li>
                        <li>The cell analyzes all examination results and in consultation with the Principal, prepares the report thereof for submission to appropriate authorities for follow up action.</li>
                        <li>Preparation of students Transcripts, verification of academic credentials etc.</li>
                        <li>Coordination with department for exam-related matters.</li>
                    </ul>
                </div>



            </motion.div>
        </>


    )
}

export default page