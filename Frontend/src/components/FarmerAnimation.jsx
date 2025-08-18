// File: src/components/FarmerHandshake.jsx

import React from 'react';
import Lottie from 'lottie-react';
import farmer from '../assets/lootie/farmer.json';

const FarmerAnimation= ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center  h-64 ${className} `}>
      <Lottie animationData={farmer} loop autoplay className="w-[600px] h-[600px]" />
    </div>
  );
};

export default FarmerAnimation;