import React, { useState } from 'react';
import { MdOutlineVolumeOff } from "react-icons/md";
import { PiPlusCircleLight } from "react-icons/pi";


const Popup = ({ series, isOpen, onClose }) => {
  
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(null);

  const handleEpisodeClick = (index) => {
    setSelectedEpisodeIndex(index);  
  };

  const handleOverlayClick = (e) => {
   
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 overflow-auto"
       onClick={handleOverlayClick}
       >
      <div className="bg-gray-input text-white rounded-lg w-11/12 md:w-5/6 lg:w-2/3 max-h-[90vh] overflow-y-auto relative">
        {/* Gambar Poster */}
        <div className="relative w-full bg-cover bg-center h-auto">
          <img
            src={series.image}
            alt={series.title}
            className="w-full rounded-t-lg h-auto"
          />

          {/* Play Button */}
          <button
            onClick={onClose}
            className="absolute bottom-10 left-10 rounded-full flex items-center space-x-2 bg-blue-800 text-white px-8 py-1 hover:bg-blue-600"
          >
            Mulai
          </button>

          {/* Icon plus */}
          <PiPlusCircleLight
            style={{ position: "absolute", bottom: "36px", left: "150px", cursor: 'pointer' }}
            size="40px"
          />
          
          {/* Judul */}
          <div className="absolute bottom-20 left-8 p-2 flex items-center">
            <h2 className="text-2xl font-medium">{series.title}</h2>
          </div>

          {/* Icon suara */}
          <button className="bg-transparent absolute bottom-10 right-10 border-gray-500 rounded-full px-2 py-2">
            <MdOutlineVolumeOff size={25} />
          </button>
        </div>

        {/* Info */}
        <div className="p-6 flex">
          <div className="flex-1">
            <div className="flex items-center text-gray-400 space-x-4 mb-4">
              <span>{series.date}</span>
              <span>{series.totalEpisodes}</span>
              <span className="border border-gray-400 rounded-full px-2 py-2 text-sm">
                {series.ageRating}
              </span>
            </div>
            <p className="mt-4 text-white">{series.description}</p>
          </div>

         
          <div className="ml-4 md:ml-8 w-full md:w-1/3">
            {/* Pemeran */}
            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr]">
              <p className="text-gray-400 flex-1 whitespace-nowrap">Cast</p>
              <p className="font-thin text-left">{series.cast.join(", ")}</p>
            </div>

            {/* Genre */}
            <div className="grid grid-cols-1 md:grid grid-cols-[120px_1fr] mb-2">
              <p className="text-gray-400 flex-1 ">Genre</p>
              <p className="font-thin text-nowrap text-left md:text-right">
                {Array.isArray(series.genre) ? series.genre.join(", ") : series.genre}
              </p>
            </div>

            {/* Pembuat film */}
            <div className="grid grid-cols-1 md:grid grid-cols-[120px_1fr]">
              <p className="text-gray-400 flex-1 whitespace-nowrap">Pembuat Film:</p>
              <p className=" font-thin text-left ">{series.filmmaker}</p>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <div className="p-6">
          <h3 className="text-2xl mb-4">Episode</h3>
          <div className="bg-custom-gray p-4 text-gray-400 font-normal rounded-lg">
            {series.episodes.map((episode, index) => (
              <div
                key={index}
                className={`flex space-x-4 mb-4 cursor-pointer transition-all duration-200 rounded-lg ${
                  selectedEpisodeIndex === index ? 'bg-gray-700 scale-115' : 'hover:bg-gray-600 hover:scale-105'
                }`}
                onClick={() => handleEpisodeClick(index)} // Correctly set the index
              >
                <div className="flex-shrink-0 mt-6">
                  <span className="text-white font-medium">{index + 1}</span>
                </div>
                <img
                  src={episode.image}
                  alt={episode.title}
                  className="w-24 h-auto rounded"
                />
                <div className="flex-1 line-clamp-3">
                  <h4 className="font-medium text-white mb-1">{episode.title}</h4>
                  <p>{episode.description}</p>
                </div>
                <p>
                  <strong>{episode.duration}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-0 bg-black text-white rounded-full px-3 py-1 hover:bg-gray-500 mx-6"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Popup;
