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
            className={`block w-full p-3 rounded-md border border-gray-800 placeholder-transparent ${colorStyles[color]?.[variant]}`}
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
  const [avatar, setAvatar] = useState(""); // Avatar state
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Menyembunyikan/menampilkan password
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    packageType: "",
    isSubscribed: false,
  }); // State untuk data pengguna baru
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state untuk memilih avatar
  const [avatarOptions, setAvatarOptions] = useState([ // Pilihan avatar
    "src/assets/avatar1.jpg", 
    "src/assets/avatar2.jpg",
    "src/assets/avatar3.jpg"
  ]);
  const [savedAccounts, setSavedAccounts] = useState([]); // Daftar akun yang disimpan

    // Validasi email menggunakan regex
    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); // Menandakan loading data
      try {
        // Pastikan URL API tidak memiliki garis miring ganda
    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/$/, '');
        // Mengambil data pengguna dari API
        const response = await axios.get(`${apiUrl}/users`); 
        // Update state newUser dengan data yang diterima dari API
        setNewUser({
          ...response.data,  // Anggap response.data memiliki field yang sesuai dengan newUser
        }); 
        console.log('Data pengguna yang disimpan:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Gagal memuat data pengguna!');
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchUserProfile(); // Panggil fetch saat komponen dimuat
  }, []);

   // Menyimpan profil pengguna baru atau memperbarui profil (ADD atau UPDATE)
   const saveOrUpdateUserProfile = async () => {
    // Validasi email
    if (!validateEmail(newUser.email)) {
      alert("Email tidak valid!");
      return;
    }

    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/$/, "");

    try {
      // Jika ada ID, maka lakukan update (UPDATE)
      if (newUser.id) {
        const response = await axios.put(
          `${apiUrl}/users/${newUser.id}`,
          newUser,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        alert("Profil berhasil diperbarui!");
        console.log("Response dari server:", response.data);
      } else {
        // Jika tidak ada ID, lakukan tambah (ADD)
        const response = await axios.post(
          `${apiUrl}/users`,
          newUser,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        alert("Profil berhasil disimpan!");
        console.log("Response dari server:", response.data);
      }
    } catch (error) {
      console.error("Error saving/updating profile:", error);
      alert("Gagal menyimpan/profil!");
    } finally {
      setLoading(false);
    }
  };

  // Menghapus akun pengguna (DELETE)
  const deleteUserProfile = async (userId) => {
    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/$/, "");
    setLoading(true);

    try {
      const response = await axios.delete(`${apiUrl}/users/${userId}`);
      setSavedAccounts(savedAccounts.filter((account) => account.id !== userId)); // Menghapus akun dari state lokal
      alert("Akun berhasil dihapus!");
      console.log("Akun dihapus:", response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus akun!");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk merubah avatar
  const handleAvatarChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      setTimeout(() => {
        setNewUser((prevUser) => ({
          ...prevUser,
          avatar: URL.createObjectURL(file), // Simpan URL gambar sementara
        }));
        setLoading(false);
      }, 1000);
    }
  };

  // Handler untuk perubahan input (username, email)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  console.log(newUser);

  // Fungsi untuk menyimpan profil pengguna
  const saveUserProfile = async () => {
    // Validasi email
    if (!validateEmail(newUser.email)) {
      alert("Email tidak valid!");
      return;
    }
  
    // Pastikan URL API tidak memiliki garis miring ganda
    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/$/, '');    
    console.log("Data yang dikirim ke API:", newUser); // Log data untuk debugging
  
    setLoading(true);
  
    try {
      let response;
      // Mengirim data ke API, POST untuk menambah data baru
      if (newUser.id) {
        // Jika ada ID, lakukan update (UPDATE)
        response = await axios.put(`${apiUrl}/users/${newUser.id}`, newUser, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Profil berhasil diperbarui!");
      } else {
        // Jika tidak ada ID, lakukan tambah (ADD)
        response = await axios.post(`${apiUrl}/users`, newUser, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Profil berhasil disimpan!");
      }
      console.log("Response dari server:", response.data);  // Log response untuk debugging
  
      // Update savedAccounts dengan data terbaru
      if (!newUser.id) {
        // Jika menambahkan akun baru, tambahkan ke daftar akun yang disimpan
        setSavedAccounts((prevAccounts) => [...prevAccounts, response.data]);
      } else {
        // Jika memperbarui akun, perbarui data akun di savedAccounts
        setSavedAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account.id === response.data.id ? response.data : account
          )
        );
      }
  
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Gagal menyimpan profil!");
    } finally {
      setLoading(false);
    }
  };
  
  // Fungsi untuk mengedit akun
  const editAccount = (account) => {
    alert("Edit account: " + account.username);
    setNewUser(account); 
  };

  // Fungsi untuk memilih akun
  const switchAccount = (account) => {
    alert("Beralih ke akun" + account.username);
  };

  // Fungsi untuk menghapus akun
  const deleteAccount = (account) => {
    alert("Delete account: " + account.username);
    // Hapus akun dari daftar
    setSavedAccounts(savedAccounts.filter(acc => acc.id !== account.id));
  };

  return (
    <div className="bg-gray-input min-h-screen text-white relative">
      <Navbar /> {/* Menampilkan Navbar */}

      <div id="inputForm" className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Bagian kiri untuk input profil */}
          <div className="w-full md:w-1/2 md:mr-4 mb-6 md:mb-0">
            <h2 className="text-2xl font-medium text-gray-50 mb-6">Profil Saya</h2>

            {/* Avatar Section */}
            <div className="flex items-center mb-6">
              <img
                src={newUser.avatar || "src/assets/27470334_7309681.jpg"}  // Default image jika avatar tidak ada
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
                {loading && <p>Uploading...</p>}
              </div>
            </div>

            {/* Input untuk Nama Pengguna */}
            <ProfileInput
              label="Nama Pengguna"
              value={newUser.username || ''}
              setValue={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              name="username"
            />
            
            {/* Input untuk Email */}
            <ProfileInput
              label="Email"
              value={newUser.email || ''}
              setValue={handleInputChange}
              name="email"
            />
            {/* Input untuk Kata Sandi */}
            <div className="mb-5">
              <ProfileInput
                label="Kata Sandi"
                value={newUser.password || ''}
                setValue={handleInputChange}
                type={showPassword ? "text" : "password"}
                name="password"
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
              onClick={saveUserProfile}
            />
            {loading && <p>Saving...</p>}
          </div>

          {/* Bagian kanan untuk info langganan */}
          <div className="mt-4 md:ml-20 md:mt-0 md:w-1/2 md:mb-20">
            <ProfileCard
              isSubscribed={newUser.isSubscribed}
              packageType={newUser.packageType}
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
                    setIsModalOpen(false); // Menutup modal
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

      {/* Bagian untuk Beralih Akun */}
     {/* Bagian untuk Beralih Akun */}
<div className="mt-8">
  <h3 className="text-xl font-medium text-white mb-4">Akun Tersimpan</h3>
  <div className="flex flex-col space-y-2">
    {savedAccounts.length === 0 ? (
      <p className="text-gray-400">Tidak ada akun yang tersimpan.</p>
    ) : (
      savedAccounts.map((account) => (
        <div
          key={account.id || account.username}
          className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
        >
          <div className="flex items-center">
            <img
              src={account.avatar || "src/assets/27470334_7309681.jpg"} // Avatar yang disimpan
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-3"
            />
          </div>
          <div>
            <p className="text-white font-semibold">{account.username}</p>
            <p className="text-gray-400">Paket: {account.packageType || "Belum Berlangganan"}</p>
            <p className="text-gray-400">Status: {account.isSubscribed ? "Berlangganan" : "Belum Berlangganan"}</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-green-500 hover:underline" onClick={() => editAccount(account)}>
              Edit
            </button>
            <button className="text-blue-500 hover:underline" onClick={() => switchAccount(account)}>
              Pilih
            </button>
            <button className="text-red-500 hover:underline" onClick={() => deleteAccount(account)}>
              Hapus
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>

<Footer /> {/* Menampilkan Footer */}

    </div>
  );
};

export default Profile;