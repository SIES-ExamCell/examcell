import React from 'react';
import { Inter, Manrope, Raleway } from 'next/font/google';

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
    <div className="bg-gray-200 py-4 text-center">
      <div className="container mx-auto">
        <p className={`${raleway.className} text-sm`}>
          &copy; 2023 Your Examcell Name
        </p>
      </div>
    </div>
  );
}

export default Footer;
