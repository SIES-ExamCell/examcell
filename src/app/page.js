"use client"

import Image from 'next/image'
import { Inter, Manrope, Raleway } from 'next/font/google';
import { motion } from "framer-motion"
import Homepage from '../../components/Homepage';
import { JellyTriangle } from '@uiball/loaders'
import { useEffect, useState } from 'react';

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay, replace this with your actual data loading process
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Change 2000 to your desired loading time
  }, []);

  return (
    <div className='w-screen h-screen bg-white'>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <JellyTriangle color="black" size={100} />
        </div>
      ) : (
        <Homepage />
      )}
    </div>
  );
}
