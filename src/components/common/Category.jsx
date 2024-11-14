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
  
  
  const [currentIndex, setCurrentIndex] = useState(0); // State untuk menyimpan indeks item saat ini
  const itemsToShowDesktop = 5; // Jumlah item yang ditampilkan di desktop
  const itemsToShowMobile = 1; // Jumlah item yang ditampilkan di mobile
  const totalItems = items.length; // Total item yang ada


  // Fungsi untuk menampilkan slide berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + itemsToShow;
      return newIndex >= totalItems ? 0 : newIndex; // Kembali ke awal jika sudah sampai akhir
    });
  };

  // Fungsi untuk menampilkan slide sebelumnya
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - itemsToShow;
      return newIndex < 0 ? totalItems - itemsToShow : newIndex; // Kembali ke akhir jika sudah di awal
    });
  };

// Jika tidak ada item, kembalikan null
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={`py-2 bg-gray-input relative ${className}`}>
      <h2 className="text-2xl font-medium mb-4 md:mb-3 md:mt-10 mx-4 md:mx-10 lg:mx-20">
        {title} {/* Menampilkan judul kategori */}
      </h2>

      <div className="relative mx-4 md:mx-10 lg:mx-20">
        <button
          onClick={prevSlide} // Menampilkan slide sebelumnya saat tombol diklik
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
        >
          &lt;  {/* Tombol untuk slide sebelumnya */}
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * (100 / (window.innerWidth < 768 ? itemsToShowMobile : itemsToShowDesktop)))}%)`,
            }}
          >
            {items.map((item) => ( // Mengiterasi item untuk ditampilkan
              <div
                key={item.id} // ID item sebagai key
                className={clsx(
                  "bg-gray-800 md:mx-1 p-11 md:p-6 rounded-lg flex-shrink-0 relative text-nowrap",
                  window.innerWidth < 768 ? "w-full" : "w-[20%]"
                )}
                onMouseEnter={() => handleMouseEnter(item)} // Menghandle mouse enter
                onMouseLeave={handleMouseLeave} // Menghandle mouse leave
                onClick={() => onOpenTrailer(item.trailerUrl, item)} // Menghandle klik untuk membuka trailer
              >
                 <img
                  src={item.image} // Menampilkan gambar item
                  alt={item.title} // Menambahkan deskripsi gambar
                  className="w-full h-full rounded object-cover cursor-pointer"
                />
                <div className="flex justify-between md:flex-none items-center">
                  <h3 className="text-white">{item.title}</h3>
                  {item.rating && (
                    <div className="md:absolute bottom-6 right-2 md:left-6 z-10">
                      <Rating rating={item.rating} showRating={true} /> {/* Menampilkan rating jika ada */}
                    </div>
                  )}
                </div>

                <div className="absolute md:top-6 top-12 font-extralight p-11 md:right-0 right-5">
                  {item.isTop10 && (
                    <Flag
                      label="Top 10" // Menandai poster sebagai Top 10
                      type="top10"
                      className="md:px-0 md:ml-4 md:py-4"
                    />
                  )}
                </div>

                {item.isPremium && (
                  <Flag
                    label="Premium" // Menandai poster sebagai Premium
                    type="premium"
                    className="text-xl font-semibold py-4 px-4 md:text-xs md:py-1 md:px-2"
                  />
                )}
                {item.isNewEpisode && (
                  <Flag
                    label="Episode Baru" // Menandai poster sebagai episode baru
                    type="newEpisode"
                    className="text-xl py-3 px-4 md:text-xs md:py-1 md:px-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide} // Menampilkan slide berikutnya saat tombol diklik
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
        >
          &gt; {/* Tombol untuk slide berikutnya */}
        </button>
      </div>
    </section>
  );
};

export default Category;
