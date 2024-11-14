import React, { createContext, useContext, useState, useEffect  } from 'react';

// Membuat context
const SubscriptionContext = createContext();

// Hook untuk akses context
export const useSubscription = () => {
  return useContext(SubscriptionContext);
};

// Provider untuk Subscription
export const SubscriptionProvider = ({ children }) => {
  // State untuk menyimpan subscription
  const [subscription, setSubscription] = useState(() => {
    const savedSubscription = localStorage.getItem("subscription");
    return savedSubscription ? JSON.parse(savedSubscription) : {
      isSubscribed: false,
      packageType: '',
      username: '',
      email: '',
    };
  });

    // Setiap kali ada perubahan di subscription, simpan ke localStorage
    useEffect(() => {
      if (subscription) {
        localStorage.setItem("subscription", JSON.stringify(subscription));
      }
    }, [subscription]);
  

  // State untuk menyimpan error jika ada
  const [error, setError] = useState('');

  // Fungsi untuk memperbarui subscription
  const handleSubscriptionUpdate = (isSubscribed, packageType, username = '', email = '') => {
    // Validasi input
    if (!username || !email || !packageType) {
      setError("Semua bidang harus diisi untuk memperbarui langganan.");
      return; 
    }

    // Reset error jika semua data valid
    setError('');

    const updatedSubscription = {
      isSubscribed,
      packageType,
      username,
      email,
    };

    // Menyimpan data ke state dan localStorage
    setSubscription(updatedSubscription);
  };

  // Fungsi untuk membatalkan langganan
  const handleCancelSubscription = () => {
    setSubscription({
      isSubscribed: false,
      packageType: '',
      username: '',
      email: '',
    });
    localStorage.removeItem("subscription");
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        handleSubscriptionUpdate,
        handleCancelSubscription,
        error, // Menyediakan error untuk akses di komponen lain
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
