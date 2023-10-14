import React from 'react';
import { Inter, Manrope, Raleway } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const raleway = Raleway({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

function Footer() {
  return (
    <div className="bg-[#312e81] text-white  pt-32 ">

      <div className='flex flex-col md:flex-row md:justify-evenly md:items-center'>

        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className={`${raleway.className} text-4xl font-bold`}>Examcell SIES GST</h1>
          <h1 className={`${raleway.className} text-xl font-normal`}>© 2023 All Rights Reserved</h1>
        </div>

        <div className='flex flex-col mx-20 md:mx-0 md:flex-row  md:justify-center  md:space-x-16 space-y-16 md:space-y-0 mt-20 md:mt-0'>
          <div className='flex flex-col text-left space-y-4'>
            <h1 className={`${manrope.className} text-2xl font-semibold`}>Useful Links</h1>

            <Link href="/hall-tickets" >
              <h1 className={`${manrope.className} text-lg font-normal  hover:text-blue-600 hover:ease-in-out hover:duration-300`}>Download Hall Tickets</h1>
            </Link>
            <Link href="/result" >
              <h1 className={`${manrope.className} text-lg font-normal  hover:text-blue-600 hover:ease-in-out hover:duration-300`}>View Results</h1>
            </Link>
            <Link href="/notifications" >
              <h1 className={`${manrope.className} text-lg font-normal  hover:text-blue-600 hover:ease-in-out hover:duration-300`}>Latest Notifications</h1>
            </Link>
            <Link href="/sample-question-papers" >
              <h1 className={`${manrope.className} text-lg font-normal  hover:text-blue-600 hover:ease-in-out hover:duration-300`}>Sample Question Papers</h1>
            </Link>
          </div>

          <div className='flex flex-col text-left space-y-4'>
            <h1 className={`${manrope.className} text-2xl font-semibold `}>Contact</h1>
            <a href="tel:02261082410" className={`${manrope.className} text-lg font-normal hover:text-blue-600 hover:ease-in-out hover:duration-300`}>+022 61082410</a>
            <a href="mailto:examcell_ic@siesgst.ac.in" className={`${manrope.className} text-lg font-normal  hover:text-blue-600 hover:ease-in-out hover:duration-300`}>examcell_ic@siesgst.ac.in</a>
          </div>
          <div className='flex flex-col text-left space-y-4'>
            <h1 className={`${manrope.className} text-2xl font-semibold`}>Location</h1>
            <h1 className={`${manrope.className} text-lg font-normal `}>
              Examination cell,<br />
              Room No. 315, 3rd Floor,<br />
              SIES Graduate School of Technology,<br />
              Sri Chandrasekarendra Saraswati Vidyapuram,<br />
              Sector-V, Nerul, Navi Mumbai,<br />
              Maharashtra 400706<br /><br /></h1>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className='flex justify-center items-center space-x-10 py-20'>
        <a href='https://www.instagram.com/siesgstevents/?hl=en' className={`${raleway.className} cursor-pointer transition ease-in-out  hover:-translate-y-2 hover:scale-105 duration-300`} >
          <Image
            src='/instagram.png'
            width={40}
            height={40}
            alt="instagram icon"
          />
        </a>
        <a href='https://www.facebook.com/SIESGSTNerul/' className={`${raleway.className} cursor-pointer transition ease-in-out  hover:-translate-y-2 hover:scale-105 duration-300`} >
          <Image
            src='/facebook.png'
            width={40}
            height={40}
            alt="facebook icon"
          />
        </a>
        <a href='https://www.linkedin.com/school/sies-graduate-school-of-technology/' className={`${raleway.className} cursor-pointer transition ease-in-out  hover:-translate-y-2 hover:scale-105 duration-300`} >
          <Image
            src='/linkedin.png'
            width={40}
            height={40}
            alt="linkedin icon"
          />
        </a>
      </div>


    </div>
  );
}

export default Footer;
