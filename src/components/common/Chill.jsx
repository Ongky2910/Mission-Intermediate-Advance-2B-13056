import React from 'react';
import clsx from 'clsx';

const Logo = ({ src, alt, text, className }) => {
  return (
    <div className={clsx('flex justify-center items-center mb-5', className)}>
      <img src={src} alt={alt} className="max-w-7xl mt-2" />
      <span className="text-center text-4xl hidden md:block mt-2 ml-1 uppercase font-londrina">{text}</span>
    </div>
  );
};

export default Logo;
