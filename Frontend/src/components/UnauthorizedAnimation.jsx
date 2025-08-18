import React from 'react';
import Lottie from 'lottie-react';
import unauthorize from '../assets/lootie/unauthorize.json';

const UnauthorizedAnimation= ({ className = '' }) => {
  return (<>
    <div className={`flex justify-center items-center bg-gradient-to-r from-green-100 to-lime-200 min-h-screen ${className}`}>
      <ul>
        <li><h1 className='flex justify-center text-5xl text-red-600 font-bold '>401:Unauthorized access</h1></li>
      <li><Lottie animationData={unauthorize} loop autoplay className="w-[500px] h-[500px]" /></li>
      </ul>
    </div>
     </>
  );
};

export default UnauthorizedAnimation;