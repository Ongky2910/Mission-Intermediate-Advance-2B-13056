import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { MdDownload } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { useSubscription } from '../components/SubscriptionContext';

// Sample logos utk keuntungan 
const logos = {
  noAds: "src/assets/Vector (4).png",
  exclusiveContent: "src/assets/Vector (6).png",
  fourkeyResolution: "src/assets/Vector (3).png",
  mulitplyDevices: "src/assets/Vector (5).png",
  subtitle: "src/assets/Vector (7).png",
};

const Subscription = ({ onSubscriptionUpdate }) => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState("");
  

  const handleSelectPackage = (packageType) => {
    navigate("/payment", { state: { packageType } });
};



  const handleSubscribe = (packageType) => {
    onSubscriptionUpdate(packageType); 
    navigate("/profile"); // Beralih to profile
  };

  return (
    <div className="min-h-screen bg-gray-input shadow-lg">
      <Navbar />

      {/* Section Why */}
      <div className="mb-8 text-center text-white">
        <h3 className="text-xl font-normal text-white mt-2 md:mt-12 mb-5 md:mb-10">
          Kenapa Harus Berlangganan?
        </h3>

        {/* Benefits Section */}
        <div className="grid grid-cols-2 gap-4 px-10 md:grid-cols-3 sm:grid-cols-2">
       
          <div className="flex flex-col items-center">
            <MdDownload color="white" size={30} />
            <span className="mb-5 mt-4">Download Konten Pilihan</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={logos.noAds} alt="No Ads" className="w-7 h-7 mb-1 mt-2" />
            <span className="mb-7 mt-2">Tidak Ada Iklan</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={logos.exclusiveContent}
              alt="Exclusive Content"
              className="w-6 h-6 md:mt-3 mb-3"
            />
            <span>Tonton Semua Konten</span>
          </div>

        
          <div className="flex flex-col items-center ">
            <img
              src={logos.fourkeyResolution}
              alt="Four Key"
              className="w-7 h-7 mb-4"
            />
            <span>Kualitas Maksimal Sampai Dengan 4K</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={logos.mulitplyDevices}
              alt="Multiply Devices"
              className="w-7 h-6 mt-1 mb-4"
            />
            <span>Tonton di TV, Tablet, Mobile, dan Laptop</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={logos.subtitle}
              alt="Customer Support"
              className="w-7 h-6 mb-3 mt-2"
            />
            <span>Subtitle Untuk Konten Pilihan</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6">
      {/* Pilihan Paket Berlangganan */}
      <div className="bg-gray-800 w-full py-12 md:py-12 md:-mx-12 text-center text-white">
        <h2 className="text-3xl font-semibold text-white mb-2">
          Pilih Paketmu
        </h2>
        <p className="font-extralight mb-10">
          Temukan paket sesuai kebutuhanmu!
        </p>
        <div className="flex flex-col md:flex-row justify-center md:gap-0 gap-6">
          {/* Example Card*/}
          <div className="bg-gradient-blue rounded-xl p-6 text-left shadow-lg w-72 mx-auto md:w-30 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ">
            <h3 className="text-lg font-normal bg-gray-700 rounded-3xl py-1 w-1/2 md:w-2/3 text-center px-4 mb-4">
              Individual
            </h3>
            <p className="font-thin">Mulai dari Rp49,990/bulan</p>
            <p className="mb-4">1 Akun</p>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Tidak ada iklan</span>
            </div>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Kualitas 720p</span>
            </div>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Download konten pilihan</span>
            </div>

            <div className="border-t border-gray-500 my-7" />

            <div className="flex justify-center">
              <button
                className="mt-2 w-full py-2 border border-blue-500 bg-white font-medium text-blue-900 rounded-full hover:bg-gray-300"
                onClick={() => handleSelectPackage("Individual")}
              >
                Langganan
              </button>
            </div>
            <p className="font-thin mt-1 text-center text-sm">
              Syarat dan Ketentuan Berlaku
            </p>
          </div>

          <div className="bg-gradient-blue rounded-xl p-6 text-left shadow-lg w-72 mx-auto md:w-30 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-lg font-normal bg-gray-700 rounded-3xl py-2 w-1/3 md:w-1/2 text-center px-2 mb-4">
              Berdua
            </h3>
            <p className="font-thin">Mulai dari Rp79,990/bulan</p>
            <p className="mb-4">2 Akun</p>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Tidak ada iklan</span>
            </div>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Kualitas 1080p</span>
            </div>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Download konten pilihan</span>
            </div>

            <div className="border-t border-gray-500 my-7" />

            <div className="flex justify-center">
              <button
                className="mt-2 w-full py-2 border border-blue-500 bg-white font-medium text-blue-900 rounded-full hover:bg-gray-300"
                onClick={() => handleSelectPackage("Berdua")}
              >
                Langganan
              </button>
            </div>
            <p className="font-thin mt-1 text-center text-sm">
              Syarat dan Ketentuan Berlaku
            </p>
          </div>

          <div className="bg-gradient-blue rounded-xl p-6 text-left shadow-lg w-72 mx-auto md:w-30 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-lg font-normal bg-gray-700 rounded-3xl py-1 w-1/2 md:w-2/3 text-center px-4 mb-4">
              Keluarga
            </h3>
            <p className="font-thin">Mulai dari Rp159,990/bulan</p>
            <p className="mb-4">5-7 Akun</p>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Tidak ada iklan</span>
            </div>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Kualitas 4K</span>
            </div>
            <div className="flex items-center mb-2 font-thin">
              <IoCheckmark className="mr-2" />
              <span>Download konten pilihan</span>
            </div>

            <div className="border-t border-gray-500 my-7" />

            <div className="flex justify-center">
              <button
                className="mt-2 w-full py-2 border border-blue-500 bg-white font-medium text-blue-900 rounded-full hover:bg-gray-300"
                onClick={() => handleSelectPackage("Keluarga")}
              >
                Langganan
              </button>
            </div>
            <p className="font-thin mt-1 text-center text-sm">
              Syarat dan Ketentuan Berlaku
            </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
