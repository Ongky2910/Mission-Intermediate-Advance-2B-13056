import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Logo from "../common/Chill";
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const Footer = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleGenres = () => setShowGenres(prev => !prev);
  const toggleHelp = () => setShowHelp(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-input py-8 flex flex-col md:flex-row justify-between items-start border-t-[1px] border-gray-700">
      {/* Logo Section */}
      <div className="flex flex-col items-start py-20 mx-10 md:py-10">
        <Logo src="src/assets/Logo (1).png" className="mt-0 md:mt-5 " />
        <p className="text-gray-400 whitespace-nowrap">© 2024 Ongky Permana All Rights Reserved.</p>
      </div>

      {/* Desktop View */}
      {!isMobile && (
        <div className="flex-grow mx-20 flex justify-between">
          <div className="flex flex-col items-start">
            <h3 className="font-medium mb-2">Genre</h3>
            <ul className="list-none grid grid-cols-4 gap-3">
              <li><a href="#">Aksi</a></li>
              <li><a href="#">Anime</a></li>
              <li><a href="#">Fantasi</a></li>
              <li><a href="#">Komedi</a></li>
              <li><a href="#">Anak-anak</a></li>
              <li><a href="#">Drama</a></li>
              <li><a href="#">Petualangan</a></li>
              <li><a href="#">Romantis</a></li>
              <li><a href="#">Kejahatan</a></li>
              <li><a href="#">Perang</a></li>
              <li><a href="#">Dokumenter</a></li>
              <li><a href="#">Sains & Alam</a></li>
              <li><a href="#">Thriller</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-start mx-10">
            <h3 className="font-medium mb-2">Bantuan</h3>
            <ul className="list-none p-0">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Kontak Kami</a></li>
              <li><a href="#">Privasi</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>
      )}

      {/* Mobile View Toggles */}
      {isMobile && (
        <div className="flex flex-col items-start mx-8">
          {/* Genre Toggle on Mobile */}
          <div className="flex flex-col mb-4 text-left">
      <h3 className="flex items-center justify-between w-full text-white cursor-pointer" onClick={toggleGenres}>
      <span>Genre</span>
    <span style={{ marginLeft: '16em' }}>
    {showHelp ? (<RiArrowDownSLine size={25} /> ) : ( <RiArrowUpSLine size={25} /> )}</span>
  </h3>
      {showGenres && (
        <ul className="list-none grid grid-cols-3 gap-1">
          <li><a href="#">Aksi</a></li>
          <li><a href="#">Anime</a></li>
          <li><a href="#">Fantasi</a></li>
          <li><a href="#">Komedi</a></li>
          <li><a href="#">Anak-anak</a></li>
          <li><a href="#">Drama</a></li>
          <li><a href="#">Petualangan</a></li>
          <li><a href="#">Romantis</a></li>
          <li><a href="#">Kejahatan</a></li>
          <li><a href="#">Perang</a></li>
          <li><a href="#">Dokumenter</a></li>
          <li><a href="#">Sains & Alam</a></li>
          <li><a href="#">Thriller</a></li>
        </ul>
      )}
    </div>

          <div className="flex flex-col text-left">
  <h3 className="flex items-center font-medium cursor-pointer text-white" onClick={toggleHelp}>
    <span>Bantuan</span>
    <span style={{ marginLeft: '15em' }}>
    {showHelp ? (<RiArrowDownSLine size={25} /> ) : ( <RiArrowUpSLine size={25} /> )}</span>
  </h3>
  {showHelp && (
    <ul className="list-none p-0">
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Kontak Kami</a></li>
      <li><a href="#">Privasi</a></li>
      <li><a href="#">Syarat & Ketentuan</a></li>
    </ul>
  )}
</div>


        </div>
      )}
    </div>
  );
};

export default Footer;
