import React, { useState } from "react";
import clsx from "clsx";
import Rating from "./Rating";
import Flag from "./Flag";


const Category = ({
  title,
  items,
  onOpenTrailer,
  handleMouseEnter,
  handleMouseLeave,
  itemsToShow = 1,
  className,
}) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShowDesktop = 5;
  const itemsToShowMobile = 1;
  const totalItems = items.length;
  


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + itemsToShow;
      return newIndex >= totalItems ? 0 : newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - itemsToShow;
      return newIndex < 0 ? totalItems - itemsToShow : newIndex;
    });
  };

  if (!items || items.length === 0) {
    return null;
  }


  return (
    <section className={`py-2 bg-gray-input relative ${className}`}>
      <h2 className="text-2xl font-medium mb-4 md:mb-3 md:mt-10 mx-4 md:mx-10 lg:mx-20">
        {title}
      </h2>

      <div className="relative mx-4 md:mx-10 lg:mx-20">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
        >
          &lt;
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * (100 / (window.innerWidth < 768 ? itemsToShowMobile : itemsToShowDesktop)))}%)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={clsx(
                  "bg-gray-800 md:mx-1 p-11 md:p-6 rounded-lg flex-shrink-0 relative text-nowrap",
                  window.innerWidth < 768 ? "w-full" : "w-[20%]"
                )}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave= {handleMouseLeave}
                onClick={() => onOpenTrailer(item.trailerUrl, item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full rounded object-cover cursor-pointer"
                />
                <div className="flex justify-between md:flex-none items-center">
                  <h3 className="text-white">{item.title}</h3>
                  {item.rating && (
                    <div className="md:absolute bottom-6 right-2 md:left-6 z-10">
                      <Rating rating={item.rating} showRating={true} />
                    </div>
                  )}
                </div>

                <div className="absolute md:top-6 top-12 font-extralight p-11 md:right-0 right-5">
                  {item.isTop10 && (
                    <Flag
                      label="Top 10"
                      type="top10"
                      className="md:px-0 md:ml-4 md:py-4"
                    />
                  )}
                </div>

                {item.isPremium && (
                  <Flag
                    label="Premium"
                    type="premium"
                    className="text-xl font-semibold py-4 px-4 md:text-xs md:py-1 md:px-2"
                  />
                )}
                {item.isNewEpisode && (
                  <Flag
                    label="Episode Baru"
                    type="newEpisode"
                    className="text-xl py-3 px-4 md:text-xs md:py-1 md:px-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Category;
