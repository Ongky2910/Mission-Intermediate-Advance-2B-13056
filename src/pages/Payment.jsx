import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useSubscription } from "../components/SubscriptionContext";

const packageDetails = {
  Individual: {
    price: 49990,
    benefits: ["Tidak ada iklan", "Kualitas 720p", "Download konten pilihan"],
    accounts: "1 Akun",
  },
  Berdua: {
    price: 79990,
    benefits: ["Tidak ada iklan", "Kualitas 1080p", "Download konten pilihan"],
    accounts: "2 Akun",
  },
  Keluarga: {
    price: 159990,
    benefits: ["Tidak ada iklan", "Kualitas 4K", "Download konten pilihan"],
    accounts: "5-7 Akun",
  },
};

const Payment = () => {
  const { handleSubscriptionUpdate } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  const { packageType: initialPackageType } = location.state || {
    packageType: "Basic",
  };

    // State untuk mengatur paket dan status pembayaran
  const [packageType, setPackageType] = useState(initialPackageType);
  const [paymentMethod, setPaymentMethod] = useState("Kartu Debit/Kredit");
  const [voucherCode, setVoucherCode] = useState("");
  const [totalAmount, setTotalAmount] = useState(
    packageDetails[packageType]?.price || 0
  );
  const [adminFee] = useState(3000);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setTotalAmount(packageDetails[packageType]?.price || 0);
  }, [packageType]);

  const finalAmount = totalAmount + adminFee - discount;

   // data pembayaran
   const paymentData = {
    packageType,
    paymentMethod,
    totalAmount: finalAmount,
    voucherCode,
  };

  const applyVoucher = () => {
    if (voucherCode === "100") {
      setDiscount(100);
    }
  };


  const handlePayment = async () => {
    try {
      console.log("Processing payment...");
      console.log("Package Type:", packageType);
      console.log("Payment Method:", paymentMethod);
      console.log("Voucher Code:", voucherCode);
      console.log("Total Amount:", finalAmount);

      handleSubscriptionUpdate(true, packageType, "user@example.com", "username");
      // Navigate to profile page with subscription status
      navigate("/profile", { state: { isSubscribed: true, packageType  } });
    } catch (error) {
      console.error("Payment processing failed:", error);
    }
  };


  return (
    <div className="bg-gray-input min-h-screen text-white p-6">
      <Navbar />
      <h2 className="text-2xl font-medium mb-6 mt-20">Ringkasan Pembayaran</h2>

      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="bg-gradient-blue rounded-xl p-6 text-left shadow-lg w-full md:w-1/5 mb-10">
          <h3 className="text-lg font-normal bg-gray-700 rounded-3xl py-1 w-1/2 md:w-2/4 text-center px-4 mb-4">
            {packageType}
          </h3>
          <p>Mulai dari Rp{totalAmount}/bulan</p>
          <p className="mb-5">{packageDetails[packageType]?.accounts}</p>
          <ul className="list-disc pl-6 mt-2">
            {packageDetails[packageType]?.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <div className="border-t border-gray-300 my-10" />
          <button className="mt-2 mx-auto w-full py-2 border border-blue-500 bg-white font-medium text-blue-900 rounded-full hover:bg-gray-300">
            Langganan
          </button>
          <p className="whitespace-nowrap text-center text-sm font-thin">
            Syarat dan Ketentuan Berlaku
          </p>
        </div>

        {/* Right section pembayaran */}
        <div className="w-full md:w-2/3 md:ml-6">
          <div className="mb-4">
            <label className="block mb-2">Metode Pembayaran</label>
            <div className="flex flex-col md:flex-row">
              {/* Kartu Debit/Kredit section */}
              <div className="flex items-center pl-2 w-full md:w-1/2 h-10 mb-2 md:mb-0 md:mr-4 rounded-md border border-gray-300 relative">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="absolute opacity-0"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  {paymentMethod === "creditCard" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center ml-1">
                  <img
                    src="src/assets/visalogo.svg"
                    alt="Visa"
                    width="30"
                    height="30"
                    style={{ margin: "0 5px" }}
                  />
                  <img
                    src="src/assets/mastercard2.jpeg"
                    alt="Mastercard"
                    width="30"
                    height="30"
                    style={{ margin: "0 5px" }}
                  />
                  <img
                    src="src/assets/jcblogo.jpeg"
                    alt="JCB"
                    width="30"
                    height="20"
                    style={{ margin: "0 5px" }}
                  />
                  <img
                    src="src/assets/americanbank.png"
                    alt="American Express"
                    width="30"
                    height="10"
                    style={{ margin: "0 5px" }}
                  />
                  <span className="text-sm md:ml-2">Kartu Debit/Kredit</span>
                </div>
              </div>

              {/* BCA Virtual Account section */}
              <div className="flex items-center pl-2 w-full md:w-1/2 h-10 mb-2 md:mb-0 md:mr-4 rounded-md border border-gray-300 relative">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bcaVirtual"
                  checked={paymentMethod === "bcaVirtual"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="absolute opacity-0"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center mr-2">
                  {paymentMethod === "bcaVirtual" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <img
                  src="src/assets/BCAlogo.webp"
                  alt="BCA"
                  width="30"
                  height="30"
                  className="mr-2"
                />
                <span className="text-sm">BCA Virtual Account</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 w-full">Kode Voucher (Jika ada)</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="flex-1 h-10 pl-4 bg-transparent text-white focus:outline-none"
                placeholder="Masukkan kode voucher"
              />
              <button
                onClick={applyVoucher}
                className="ml-2 bg-gray-600 text-white h-10 px-4 rounded-md hover:bg-gray-700"
              >
                Gunakan
              </button>
            </div>
          </div>
          {/* Ringkasan Pembayaran */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Ringkasan Transaksi</h3>
            <div className="flex justify-between">
              <span className="text-gray-500">Paket {packageType}</span>
              <span>Rp{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Biaya Admin</span>
              <span>Rp {adminFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span className="text-gray-400">Total Pembayaran</span>
              <span>Rp{finalAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handlePayment}
              className="md:mt-4 mb-12 md:mb-0 bg-blue-input hover:bg-blue-500 p-1 rounded-full w-full md:w-1/4"
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
