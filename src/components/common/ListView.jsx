import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserThunk,
  deleteAccountThunk,
fetchSavedAccountsThunk , setSelectedAccount } from '../redux/reducer';
import Button from "./Button";

const ListView = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const accounts = useSelector((state) => state.user.savedAccounts);
  console.log("Accounts from Redux:", accounts);
  
// Handle delete dengan konfirmasi
  const handleDeleteAccount = async (id) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus akun ini?");
    if (isConfirmed) {
      try {
        dispatch(deleteAccountThunk(id));
        alert("Akun berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus akun:", error);
        alert("Gagal menghapus akun!");
      }
    }
  };

   // Handle untuk memilih akun dan langsung diarahkan ke halaman terkait
   const handleSelectAccount = (account) => {
    dispatch(setSelectedAccount(account)); // Update Redux state dengan akun yang dipilih
    alert(`Anda memilih akun: ${account.username}`); 
  };
  

  const handleEditAccount = async (account) => {
    dispatch(setSelectedAccount(account)); // Kirim akun yang dipilih ke Redux
  };

  const handleRefreshAccounts = () => {
    dispatch(fetchSavedAccountsThunk());
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium text-white mb-4">Akun Tersimpan</h3>
      {loading && <p>Loading...</p>}
      {!loading && (!accounts?.length && (
        <p className="text-gray-400">Tidak ada akun yang tersimpan.</p>
      ))}
      <div className="space-y-2">
        {accounts?.map((account) => (
          <div
            key={account.id}
            className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
          >
            <div className="flex items-center">
              <img
                src={account.avatar || "src/assets/27470334_7309681.jpg"}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <p className="text-white">{account.username}</p>
              <p className="text-gray-400">Paket: {account.packageType}</p>
            </div>
            <div className="space-x-2">
              <Button text="Edit" color="blue"
              onClick={() => handleEditAccount(account)}
              />
              <Button text="Pilih" 
              color="green"
              onClick={() => handleSelectAccount(account)}
              />
              <Button text="Hapus" 
              color="red"  
              onClick={() => handleDeleteAccount(account.id)}          
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button text="Reload Akun" color="green" onClick={handleRefreshAccounts} />
      </div>
    </div>
  );
};

export default ListView;
