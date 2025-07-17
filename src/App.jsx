import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { Toaster } from "react-hot-toast";
import Navbar from './components/layout/Navbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Footer from './components/Footer.jsx';
export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Navbar />
        <div className="pt-15 bg-[#141322] min-h-screen text-white">
          <ScrollToTop />
          <AppRoutes />
          <Footer />
        </div>
        
      </Router>
    </>

  );
}


