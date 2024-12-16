import React, { useState, useEffect, useRef } from "react"; // Mengimpor React dan hooks useState dan useEffect
import { Link, useNavigate } from "react-router-dom"; // Mengimpor hook useNavigate untuk navigasi
import { FaFileUpload } from "react-icons/fa"; // Mengimpor ikon untuk upload file
import { colorStyles } from "../components/common/Button"; // Mengimpor gaya warna dari komponen Button
import {
  fetchUserData,
  updateUserProfile,
  deleteUserProfile,
  addUser,
} from "../components/hooks/apiService"; // Import the API functions
import Button from "../components/common/Button"; // Mengimpor komponen Button
import Navbar from "../components/common/Navbar"; // Mengimpor komponen Navbar
import Footer from "../components/common/Footer"; // Mengimpor komponen Footer
import { useSubscription } from "../components/SubscriptionContext"; // Mengimpor konteks langganan
import { GoPencil } from "react-icons/go"; // Mengimpor ikon pencil
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSavedAccountsThunk,

} from '../components/redux/userSlice';
import ListView from '../components/common/ListView';
import api from '../components/hooks/apiService'; 


// Komponen untuk input profil
const ProfileInput = React.forwardRef(
  ({ label, value, setValue, type = "text", color, variant, name }, ref) => {
    return (
      <div className="mb-6 relative">
        <label
          className={`absolute left-2 transition-all duration-300 ease-in-out ${
            value
              ? "text-gray-50 text-sm -left-0 -top-6"
              : "text-gray-500 top-0"
          }`}
        >
          {label}
        </label>
        <div className="flex items-center border rounded-md shadow-sm">
          <input
            ref={ref} // Menggunakan ref yang diteruskan
            id={`input-${label}`}
            type={type}
            value={value}
            onChange={setValue}
            name={name}
            className={`block w-full p-3 text-gray-500 rounded-md border border-gray-800 placeholder-transparent ${colorStyles[color]?.[variant]}`}
            placeholder=" "
          />
          <div className="absolute right-2 cursor-pointer">
            <GoPencil className="text-gray-50 hover:text-gray-300" />
          </div>
        </div>
      </div>
    );
  }
);

// Daftar opsi avatar
const avatarOptions = [
  "src/assets/27470334_7309681.jpg",
  "src/assets/avatar2.jpg",
  "src/assets/avatar3.jpg",
  "src/assets/avatar4.jpg",
];

// Komponen untuk menampilkan informasi langganan
const ProfileCard = ({ isSubscribed, onSubscribe, onCancel, packageType }) => (
  <div className="p-2 mb-10 text-left bg-neutral-700 rounded-md flex items-start">
    {isSubscribed ? (
      <>
        <div className="bg-gradient-blue rounded-xl p-6 text-left shadow-lg w-72 mx-auto md:w-30 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ">
          <h3 className="text-lg text-blue-700 bg-gray-400 rounded-3xl py-1 w-1/2 md:w-2/3 text-center px-4 mb-4">
            Aktif
          </h3>
          <h4 className="text-xl font-semibold mb-3 text-nowrap">
            Akun Premium {packageType} ✨
          </h4>
          <p className="text-gray-50">
            Saat ini kamu sedang menggunakan akses akun premium
          </p>
          <p className="text-gray-400 text-nowrap">
            Berlaku hingga 31 Desember 2024
          </p>
        </div>
      </>
    ) : (
      <>
        <img
          src="src/assets/Warning.png"
          alt="announcement"
          className="w-12 h-12 mr-2 mt-2"
        />
        <div>
          <h4 className="text-xl font-medium text-gray-50 mb-2">
            Belum Berlangganan
          </h4>
          <p className="text-gray-100 font-thin overflow-hidden line-clamp-5">
            Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
          </p>
          <div className="flex justify-end mt-2">
            <Link to="/subscriptions">
              <button className="px-3 py-1 mt-5 bg-neutral-800 text-white rounded-full hover:bg-gray-500">
                Mulai Berlangganan
              </button>
            </Link>
          </div>
        </div>
      </>
    )}
  </div>
);

// Komponen utama Profil
const Profile = () => {
  const dispatch = useDispatch();
  const selectedAccount = useSelector((state) => state.user.selectedAccount);
  const savedAccounts = useSelector((state) => state.user.savedAccounts);
  const loading = useSelector((state) => state.user.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk mengelola form pengguna
  const [userForm, setUserForm] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    avatar: "",
    packageType: "",
    isSubscribed: false,
  });
  const [newUser, setNewUser] = useState({}); 
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(""); // Mengatur tampilan avatar saat dipilih
  const [loadingState, setLoadingState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const profileInputRef = useRef(null);

  useEffect(() => {
    if (selectedAccount && profileInputRef.current) {
      const el = profileInputRef.current;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedAccount]);
  

  // Ambil daftar akun saat pertama kali Profile di-mount
  useEffect(() => {
    dispatch(fetchSavedAccountsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedAccount) {
      setUserForm({
        username: selectedAccount.username || '',
        email: selectedAccount.email || '',
        password: selectedAccount.password || '',
        avatar: selectedAccount.avatar || '',
        packageType: selectedAccount.packageType || '',
        isSubscribed: selectedAccount.isSubscribed || false,
      }); 

      // Lakukan scroll ke bagian input profil setiap kali akun dipilih
      setTimeout(() => { // Delay untuk memastikan formulir sudah dirender
      if (profileInputRef.current) {
        profileInputRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
}, [selectedAccount]);
  
  
  // Handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Logika untuk menyimpan data yang diubah
    console.log("Saving changes", userForm);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // Validasi email sederhana
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  

  // Fungsi untuk menyimpan atau memperbarui profil pengguna
  const handleSaveOrUpdateUser = async () => {
    if (!userForm.username || !userForm.email || !userForm.password) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    if (!isValidEmail(userForm.email)) {
      alert("Email tidak valid!");
      return;
    }

    setLoadingState(true);

    try {
      let response;
      if (userForm.id) {
        response = await api.put(`/users/${userForm.id}`, userForm);
        alert("Profil berhasil diperbarui!");
      } else {
        response = await api.post('/users', userForm);
        alert("Profil berhasil disimpan!");
      }
  
      console.log("Response server:", response.data);
  
      dispatch(fetchSavedAccountsThunk());
    } catch (error) {
      console.error("Gagal menyimpan profil:", error);
      alert("Gagal menyimpan profil!");
    } finally {
      setLoadingState(false);
    }
  };

  // Handle perubahan avatar dari input file
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setAvatarPreview(blobUrl);
      setUserForm((prevForm) => ({
        ...prevForm,
        avatar: blobUrl,
      }));
    }
  };

  // Bersihkan URL blob saat komponen di-unmount atau saat avatar berubah
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);


  return (
    <div className="bg-gray-input min-h-screen text-white relative">
      <Navbar /> {/* Menampilkan Navbar */}
      <ListView />
      <div ref={profileInputRef} id="inputForm" className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Bagian kiri untuk input profil */}
          <div className="w-full md:w-1/2 md:mr-4 mb-6 md:mb-0">
            <h2 className="text-2xl font-medium text-gray-50 mb-6">Profil Saya</h2>
  
            {/* Avatar Section */}
            <div className="flex items-center mb-6">
              <img
                src={userForm.avatar || "src/assets/27470334_7309681.jpg"}
                alt="Profile"
                className="w-20 h-20 rounded-full mr-3"
              />
              <div>
                {/* Tombol untuk membuka file input */}
                <button
                  className="px-4 py-1 border border-blue-700 text-blue-700 rounded-full hover:bg-gray-300"
                  onClick={() => document.querySelector('input[type="file"]').click()}
                >
                  Ubah Avatar
                </button>
                {/* Input file tersembunyi */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatar-upload"
                />
                {loadingState && <p>Uploading...</p>}
              </div>
            </div>
  
            {/* Input untuk Nama Pengguna */}
            <ProfileInput
              label="Nama Pengguna"
              value={userForm.username || ''}
              setValue={handleInputChange}
              name="username"
              required
              disabled={!isEditMode}
            />
  
            {/* Input untuk Email */}
            <ProfileInput
              label="Email"
              value={userForm.email || ''}
              setValue={handleInputChange}
              name="email"
              disabled={!isEditMode} 
            />
  
            {/* Input untuk Kata Sandi */}
            <div className="mb-5">
              <ProfileInput
                label="Kata Sandi"
                value={userForm.password || ''}
                setValue={handleInputChange}
                type={showPassword ? "text" : "password"}
                name="password"
                disabled={!isEditMode}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-blue-500 hover:underline"
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
  
            {/* Tombol untuk menyimpan profil */}
            <Button
              text="Simpan"
              color="blue"
              variant="default"
              className="w-32"
              onClick={handleSaveOrUpdateUser}
            />
            {loading && <p>Saving...</p>}
          </div>
  
          {/* Bagian kanan untuk info langganan */}
          <div className="mt-4 md:ml-20 md:mt-0 md:w-1/2 md:mb-20">
            <ProfileCard
              isSubscribed={userForm.isSubscribed}
              packageType={userForm.packageType}
            />
          </div>
        </div>
      </div>
  
      {/* Modal Pemilihan Avatar */}
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
                    setIsModalOpen(false);
                  }}
                />
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
  
 {/* Bagian Akun yang Tersimpan dari ListView */}
 <div className="mt-8">
        <h3 className="text-xl font-medium text-white mb-4">Daftar Akun</h3>
        <ListView />
      </div>

      <Footer />
    </div>
  );
}
  
export default Profile;
