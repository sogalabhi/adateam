// src/components/BearMascot.jsx
import React from 'react';

const BearMascot = () => {
    return (
        <div className="flex flex-col items-left text-center p-8">
            <img 
                
                src="src/assets/adorable-polar-bear-wiggle-hands-89b0apn8x1ya5iyk.gif" // Adjust path accordingly
                alt="Waving Bear Mascot"
                className="absolute left-20 top-[40%] w-80 h-80 object-contain"
            />
            <h2 className="text-4xl font-bold text-black-700 mb-6 animate-fadeIn">
                Welcome to Your Learning Journey!
            </h2>
            <p className="text-2xl font-bold text-blue-600 mt-4">
                Let's explore new topics together!
            </p>
        </div>
    );
};

export default BearMascot;
