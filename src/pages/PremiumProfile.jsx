import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { colorStyles } from "../components/common/Button";
import Button from "../components/common/Button";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useSubscription } from '../components/SubscriptionContext';
import { GoPencil } from "react-icons/go";

const ProfileInput = ({ label, value, setValue, type = "text", color, variant }) => {
  return (
    <div className="mb-6 relative">
      <label className={`absolute left-2 transition-all duration-300 ease-in-out ${value ? "text-gray-50 text-sm -left-0 -top-6" : "text-gray-500 top-0"}`}>
        {label}
      </label>
      <div className="flex items-center border rounded-md shadow-sm">
        <input
          id={`input-${label}`}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`block w-full p-3 rounded-md border border-gray-800 placeholder-transparent ${colorStyles[color]?.[variant]}`}
          placeholder=" "
        />
        <div className="absolute right-2 cursor-pointer">
          <GoPencil className="text-gray-50 hover:text-gray-300" />
        </div>
      </div>
    </div>
  );
};

const avatarOptions = [
  "src/assets/27470334_7309681.jpg",
  "src/assets/avatar2.jpg",
  "src/assets/avatar3.jpg",
  "src/assets/avatar4.jpg",

];


const ProfileCard = ({ isSubscribed, onSubscribe, onCancel, packageType }) => (
  <div className="p-2 mb-10 text-left bg-neutral-700 rounded-md flex items-start">
    {isSubscribed ? (
      <>
        
        <div className="bg-gradient-blue rounded-xl p-6 text-left shadow-lg w-72 mx-auto md:w-30 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ">
        <h3 className="text-lg text-blue-700 bg-gray-400 rounded-3xl py-1 w-1/2 md:w-2/3 text-center px-4 mb-4">
             Aktif
            </h3>
          <h4 className="text-xl font-semibold mb-3 text-nowrap">Akun Premium {packageType} ✨</h4>
          <p className="text-gray-50">Saat ini kamu sedang menggunakan akses akun premium</p>
          <p className="text-gray-400 text-nowrap">Berlaku hingga 31 Desember 2024</p>
        </div>
      </>
    ) : (
      <>
        <img src="src/assets/Warning.png" alt="announcement" className="w-12 h-12 mr-2 mt-2" />
        <div>
          <h4 className="text-xl font-medium text-gray-50 mb-2">Belum Berlangganan</h4>
          <p className="text-gray-100 font-thin overflow-hidden line-clamp-5">
            Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
          </p>
          <div className="flex justify-end mt-2">
            <button className="px-3 py-1 mt-5 bg-neutral-800 text-white rounded-full hover:bg-gray-500" onClick={onSubscribe}>
              Mulai Berlangganan
            </button>
          </div>
        </div>
      </>
    )}
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { handleSubscriptionUpdate, handleCancelSubscription } = useSubscription();
  
  // State management
  const [avatar, setAvatar] = useState(  "src/assets/27470334_7309681.jpg");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [packageType, setPackageType] = useState(""); 
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  // Load data from local storage
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("savedAccounts")) || [];
    setSavedAccounts(accounts);
    if (accounts.length > 0) {
      const selectedAcc = accounts.find(account => account.username === selectedAccount?.username);
      if (selectedAcc) {
        setAvatar(selectedAcc.avatar || ""); // Load avatar if it exists
      }
    }
  }, [selectedAccount]);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const saveProfile = () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    setTimeout(() => {
      const newAccount = { username, email, packageType, isSubscribed, avatar };
      const updatedAccounts = savedAccounts.map(account => account.username === username)
      ? savedAccounts.map(account =>
          account.username === selectedAccount.username ? newAccount : account
        )
      : [...savedAccounts, newAccount];

      setSavedAccounts(updatedAccounts);
      localStorage.setItem("savedAccounts", JSON.stringify(updatedAccounts));
      setLoading(false);
      setSuccessMessage("Profile saved successfully!");
    }, 1000); // Simulating a delay
  };

  const handleSubscribe = () => {
    const selectedPackage = "Individual"; // Replace with actual logic
    handleSubscriptionUpdate(true, selectedPackage);
    setIsSubscribed(true);

    const updatedAccounts = savedAccounts.map(account =>
      account.username === selectedAccount.username ? { ...account, isSubscribed: true, packageType: selectedPackage } : account
    );

    setSavedAccounts(updatedAccounts);
    localStorage.setItem("savedAccounts", JSON.stringify(updatedAccounts));
    setPackageType(selectedPackage);
    navigate("/subscriptions");
  };

  const handleCancel = () => {
    handleCancelSubscription();
    setIsSubscribed(false);

    const updatedAccounts = savedAccounts.map(account =>
      account.username === selectedAccount.username ? { ...account, isSubscribed: false, packageType: "" } : account
    );

    setSavedAccounts(updatedAccounts);
    localStorage.setItem("savedAccounts", JSON.stringify(updatedAccounts));
  };

  const switchAccount = (account) => {
    setSelectedAccount(account);
    setUsername(account.username);
    setEmail(account.email);
    setPassword(""); // Reset password on switch
    setPackageType(account.packageType);
    setIsSubscribed(account.isSubscribed);
    setAvatar(account.avatar || "src/assets/27470334_7309681.jpg");
  };

  const deleteAccount = (accountToDelete) => {
    const updatedAccounts = savedAccounts.filter(account => account.username !== accountToDelete.username);
    setSavedAccounts(updatedAccounts);
    localStorage.setItem("savedAccounts", JSON.stringify(updatedAccounts));
    
    if (selectedAccount && selectedAccount.username === accountToDelete.username) {
      setSelectedAccount(null);
      setUsername("");
      setEmail("");
      setPassword("");
      setPackageType("");
      setIsSubscribed(false);
    }
  };

  return (
    <div className="bg-gray-input min-h-screen text-white relative">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 md:mr-4 mb-6 md:mb-0">
            <h2 className="text-2xl font-medium text-gray-50 mb-6">Profil Saya</h2>
            <div className="flex items-center mb-6">
            <img src={avatar} alt="Profile" className="w-20 h-20 rounded-full mr-3" />
              <div>
                <button className="px-4 py-1 border border-blue-700 text-blue-700 rounded-full hover:bg-gray-300" onClick={() => setIsModalOpen(true)}>
                  Ubah Avatar
                </button>
                <div className="flex items-center mt-1">
                  <FaFileUpload className="mr-1" />
                  <small className="font-light text-gray-400">Maksimal 2MB</small>
                </div>
              </div>
            </div>

            <ProfileInput label="Nama Pengguna" value={username} setValue={setUsername} color="other" variant="paper" />
            <ProfileInput label="Email" value={email} setValue={setEmail} color="other" variant="paper" />
            <div className="mb-5">
              <ProfileInput label="Kata Sandi" value={password} setValue={setPassword} type={showPassword ? "text" : "password"} color="other" variant="paper" />
              <button onClick={() => setShowPassword(!showPassword)} className="ml-2 text-blue-500 hover:underline">
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
           
            <Button text="Simpan" color="blue" variant="default" className="w-32" onClick={saveProfile} />
            {loading && <p>Saving...</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
          <div className="mt-4 md:ml-20 md:mt-0 md:w-1/2 md:mb-20">
            <ProfileCard isSubscribed={isSubscribed} onSubscribe={handleSubscribe} onCancel={handleCancel} packageType={packageType} />
          </div>
        </div>
{/* Avatar Selection Modal */}
{isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">Pilih Avatar</h3>
                <div className="flex space-x-4">
                  {avatarOptions.map((avatarUrl, index) => (
                    <img
                      key={index}
                      src={avatarUrl}
                      alt={`Avatar ${index + 1}`}
                      className="w-16 h-16 cursor-pointer rounded-full hover:border-2 hover:border-blue-500"
                      onClick={() => {
                        setAvatar(avatarUrl);
                        setIsModalOpen(false); // Close the modal
                      }}
                    />
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setIsModalOpen(false)}>
                  Tutup
                </button>
              </div>
            </div>
          )}

        {/* Switch Account Section */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-white mb-4">Akun Tersimpan</h3>
          <div className="flex flex-col space-y-2">
            {savedAccounts.map((account, index) => (
              <div key={index} className="bg-neutral-700 p-4 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{account.username}</p>
                  <p className="text-gray-400">Paket: {account.packageType || "Belum Berlangganan"}</p>
                  <p className="text-gray-400">Status: {account.isSubscribed ? "Berlangganan" : "Belum Berlangganan"}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-green-500" onClick={() => switchAccount(account)}>Edit</button>
                  <button className="text-blue-500" onClick={() => switchAccount(account)}>Pilih</button>
                  <button className="text-red-500" onClick={() => deleteAccount(account)}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
