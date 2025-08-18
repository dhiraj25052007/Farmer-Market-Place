import React from 'react';
import Lottie from 'lottie-react';
import unauthorize from '../assets/lootie/unauthorize.json';

const UnauthorizedAnimation = ({ className = '' }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-gradient-to-r from-green-100 to-lime-200 min-h-screen px-4 ${className}`}
    >
      <h1 className="text-center text-red-600 font-bold 
        text-3xl sm:text-4xl lg:text-5xl mb-6">
        401: Unauthorized Access
      </h1>

      <Lottie
        animationData={unauthorize}
        loop
        autoplay
        className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px]"
      />
    </div>
  );
};

export default UnauthorizedAnimation;
