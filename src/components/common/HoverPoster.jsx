import React from "react";
import { RxCheckCircled } from "react-icons/rx";
import { MdPlayCircle } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";

const HoverPoster = React.memo(
  ({ series, onClick, onOpenTrailer }) => {
    if (!series || series.length === 0) {
      console.log("No Series available");
      return null;
    }

    const item = series[0];
    
    return (
      <div className="bg-gray-input cursor-pointer w-[300px] h-[360px] rounded-[20px] overflow-hidden transition-all duration-300 hover:opacity-100 hover:shadow-[0px_20px_48px_0px_rgba(255,255,255,0.1)] relative">
        {series.map((item) => (
          <div key={item.id} onClick={() => onClick(item)}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 "></div>

            {/* Konten */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 p-4 flex flex-col">
              <div className="flex items-center justify-between ">
                <span className="text-lg font-semibold text-white"></span>
            
              </div>

              {/* Tombol play & dropdown side by side */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center">
                  <button
                    className="p-1 flex items-center justify-center hover:text-blue-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTrailer(item.trailerUrl, item);
                    }}
                  >
                    <MdPlayCircle size={30} />
                  </button>
                  <span className="ml-2 text-white"></span>
                  <RxCheckCircled size={30} />
                </div>

                {/* Dropdown Menu */}
             
                <IoIosArrowDropdown size={30} />
                
              </div>

              {/* Episode Total dan Age */}
              <div className="mt-2 flex items-center">
              <span className="border border-gray-500 rounded-full px-2 mr-2 text-sm text-white flex items-center">{item.ageRating}</span>
                <span className="text-sm font-medium text-white">{item.totalEpisodes}</span>
              
              </div>

              {/* Genre paling abawah */}
              <div className="mt-2 flex justify-center w-full text-gray-300 text-sm space-x-2">
                <p className="flex-grow text-center">{item.genre?.join(" • ") || "No Genre Available"}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default HoverPoster;
