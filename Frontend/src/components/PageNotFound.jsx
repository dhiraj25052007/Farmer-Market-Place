import React from 'react';
import Lottie from 'lottie-react';
import pagenotfound from '../assets/lootie/pagenotfound.json';

const PageNotFoundAnimation = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center bg-gradient-to-r from-green-100 to-lime-200 min-h-screen ${className}`}>

      <Lottie 
        animationData={pagenotfound}
        loop
        autoplay
        className="w-[700px] h-[500px] mb-40" // ✅ control size here
      />
    </div>
  );
};

export default PageNotFoundAnimation;
