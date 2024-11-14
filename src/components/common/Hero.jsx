import React, { useState } from "react";
import Button from "../common/Button";
import { GrCircleInformation } from "react-icons/gr";
import { MdOutlineVolumeOff, MdOutlineVolumeUp } from "react-icons/md";
import Dropdown from "/src/components/common/GenreDrop.jsx";

const Hero = ({
  options,
  onDropdownChange,
  title,
  description,
  showDropdown,
  backgroundImage,
  onOpenPopup,
  trailerUrl,
}) => {
  const [isSoundOn, setIsSoundOn] = useState(true); // State untuk mengelola status suara

  // Fungsi untuk menangani klik pada hero
  const handleHeroClick = () => {
    onOpenPopup(trailerUrl); // Membuka popup dengan URL trailer
  };

  // Fungsi untuk mengubah status suara
  const handleSoundToggle = () => {
    setIsSoundOn(!isSoundOn); // Mengubah status suara
  };

  return (
    <div
      className="bg-cover bg-center h-[600px] relative object-cover overflow-hidden bg-custom-gray"
      style={{
        backgroundImage: `url('${backgroundImage}')`, // Mengatur gambar latar belakang
      }}
      onClick={handleHeroClick} // Menangani klik pada hero
    >
      <div className="mt-10 absolute inset-0 flex flex-col justify-center p-4 md:p-12 ">
        <div className="hidden md:block absolute top-0 left-12 z-10">
          {showDropdown && (
            <Dropdown options={options} onChange={onDropdownChange} /> // Menampilkan dropdown jika diperlukan
          )}
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold mb-1 md:mb-2 line-clamp-2 md:line-clamp-none">
          {title}
        </h1>{" "}
        {/* Menampilkan judul */}
        <p className="text-sm md:text-base font-light max-w-3xl text-left mb-4">
          {description}
        </p>{" "}
        {/* Menampilkan deskripsi */}
      </div>

      <div className="absolute bottom-6 left-4 right-4 md:left-10 md:right-10 flex justify-between items-center">
        <div className="flex items-center space-x-2 mb-20">
          <Button
            text="Mulai" // Teks untuk tombol "Mulai"
            color="blue" // Warna tombol
            variant="default" // Varian tombol
            className="p-4 md:p-4 h-10" // Styling tambahan
          />
          <Button
            text="Selengkapnya" // Teks untuk tombol "Selengkapnya"
            color="other" // Warna tombol
            variant="paper" // Varian tombol
            className="p-2 md:p-4 h-10" // Styling tambahan
            icon={<GrCircleInformation size="20px" />} // Ikon untuk tombol
          />
          <span className="border-2 border-gray-500 rounded-full px-2 text-s flex items-center justify-center w-14 h-10 bg-transparent font-light">
            18+ {/* Menandai batas usia */}
          </span>
        </div>

        <button
          className="bg-transparent border-gray-500 mb-20 rounded-full p-2"
          onClick={handleSoundToggle} // Menangani klik untuk toggle suara
        >
          {isSoundOn ? ( // Menampilkan ikon suara sesuai status
            <MdOutlineVolumeUp size={25} />
          ) : (
            <MdOutlineVolumeOff size={25} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Hero;
