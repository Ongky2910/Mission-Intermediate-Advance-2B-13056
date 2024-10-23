import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/src/components/common/Chill"; 
import { IoMdExit } from "react-icons/io";
import { GoStar } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import Dropdown from "./GenreDrop"; 

const Navbar = () => {
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

  const toggleAvatarDropdown = () => {
    setAvatarDropdownOpen((prev) => !prev);
  };

  const handleExit = () => {
    localStorage.removeItem("userSession");
    window.location.href = "/login";
  };

  // Genre options
  const genreOptions = [
    { label: "Aksi", value: "Aksi" },
    { label: "Drama", value: "Drama" },
    { label: "Komedi", value: "Komedi" },
    { label: "Horror", value: "Horror" },
    { label: "Britania", value: "Britania" },
    { label: "Anime", value: "Anime" },
  ];

  return (
    <nav className="bg-gray-input py-2 mx-0 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Logo
            src="src/assets/Vector (1).png"
            alt="Chill Logo"
            className="h-20 ml-4 text-white md:ml-12" 
            text="chill" 
          />
          {/* Link navigasi */}
          <div className="flex items-center space-x-2 md:space-x-14 text-nowrap">
            <Link to="/series" className="text-white font-light text-sm md:text-base md:ml-12 hover:text-gray-400 transition">
              Series
            </Link>
            <Link to="/home" className="text-white font-light text-sm md:text-base hover:text-gray-400 transition">
              Film
            </Link>
            <Link to="/mylist" className="text-white font-light text-sm md:text-base hover:text-gray-400 transition">
              Daftar Saya
            </Link>
          </div>
        </div>

        {/* Genre Dropdown (di mobile) */}
        <div className="md:hidden">
          <Dropdown
            options={genreOptions}
            onChange={(value) => console.log("Selected Genre:", value)}
            isMobile={true}
           
          />
        </div>

        {/* Avatar Dropdown */}
        <div className="relative md:mx-10">
          <button onClick={toggleAvatarDropdown} className="focus:outline-none flex items-center">
            <img
              src="src/assets/Ellipse 395.png" 
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white transition-transform"
            />
            <RiArrowDropDownLine size={28}/>
          </button>
          
          {avatarDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-900 text-white rounded-lg shadow-lg transition-opacity duration-200 z-50">
              <Link to="/profile" className="text-white flex items-center px-4 py-2 hover:bg-gray-700">
                <RxAvatar className="mr-2" />
                Profil Saya 
              </Link>
              <Link to="/subscriptions" className="text-white flex items-center text-nowrap px-4 py-2 hover:bg-gray-700">
                <GoStar className="mr-2" />
                Ubah Premium
              </Link>
              <button onClick={handleExit} className="w-full flex items-center px-4 py-2 hover:bg-gray-700 text-left">
                <IoMdExit className="mr-2" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
