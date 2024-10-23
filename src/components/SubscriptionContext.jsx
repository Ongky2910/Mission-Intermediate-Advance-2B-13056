import React, { createContext, useContext, useState } from 'react';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(() => {
    const savedSubscription = localStorage.getItem("subscription");
    return savedSubscription ? JSON.parse(savedSubscription) : {
      isSubscribed: false,
      packageType: '',
      username: '',
      email: '',
    };
  });

  const handleSubscriptionUpdate = (isSubscribed, packageType, username = '', email = '') => {
    if (!username || !email || !packageType) {
      console.error("Missing required fields for subscription update.");
      return; // Prevent update if any required fields are missing
    }
  
    const updatedSubscription = {
      isSubscribed,
      packageType,
      username,
      email,
    };
  
    setSubscription(updatedSubscription);
    localStorage.setItem("subscription", JSON.stringify(updatedSubscription));
  };
  

  const handleCancelSubscription = () => {
    setSubscription({
      isSubscribed: false,
      packageType: '',
      username: '',
      email: '',
    });
    
    // Clear subscription from local storage
    localStorage.removeItem("subscription");
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        handleSubscriptionUpdate,
        handleCancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
