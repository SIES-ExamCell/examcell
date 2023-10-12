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

function Fourth() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="flex-col flex mt-36"
    >
      <div className={`${raleway.className} lg:w-screen lg:space-y-12 space-y-3`}>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide text-center">
          Contact Us
        </h1>
      </div>

      <div className="flex justify-center items-center bg-center bg-cover w-screen">
        <div className="flex flex-col md:flex-row justify-center items-center my-8 ">
          <Image
            src="/contact-us.jpg"
            width={700}
            height={800}
            alt="sideimage"
            className="object-contain"
          />
          <div className={`${manrope.className} text-left flex justify-center items-center text-xl xl:mx-36 lg:mx-20 mx-14 my-10 md:my-0`}>
            <div>
              Examination cell,<br />
              Room No. 315, 3rd Floor,<br />
              SIES Graduate School of Technology,<br />
              Sri Chandrasekarendra Saraswati Vidyapuram,<br />
              Sector-V, Nerul, Navi Mumbai,<br />
              Maharashtra 400706<br /><br />
              Contact No. 022 61082410<br />
              Email: examcell_ic@siesgst.ac.in
            </div>
          </div>
        </div>
      </div>

      <div>{/* Additional content goes here */}</div>
    </motion.div>
  );
}

export default Fourth;
