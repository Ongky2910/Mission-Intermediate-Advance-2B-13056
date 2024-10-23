import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SeriesPage from "./pages/SeriesPage";
import PremiumProfile from "./pages/PremiumProfile";
import MyList from "./pages/MyList";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import { SubscriptionProvider } from './components/SubscriptionContext'
import "./index.css";

const App = () => {
  return (
    <SubscriptionProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<PremiumProfile />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/mylist" element={<MyList />} />  
      </Routes>
    </Router>
    </SubscriptionProvider>
  );
};

export default App;
