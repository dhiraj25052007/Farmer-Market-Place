
import React from 'react';
import Lottie from 'lottie-react';
import customer from '../assets/lootie/customer.json';

const CustomerAnimation= ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center  h-80 ${className}`}>
      <Lottie animationData={customer} loop autoplay className="w-[500px] h-[900px] pt-32" />
    </div>
  );
};

export default CustomerAnimation;