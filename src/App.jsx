import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import Booking from './components/Booking';
import ContactUs from './components/booking/ContactUs';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Services from "./components/Services"; 
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/termsofservice';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
     <div className="bg-brand text-white">
  <Navbar />
</div>


      {/* Page Content */}
      <main className="flex-grow">
        {/* center all routes horizontally with a site container */}
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contactus" element={<ContactUs/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
            <Route path="/termsofservice" element={<TermsOfService/>} />
          </Routes>
        </div>
      </main>

     <Footer></Footer>
      {/* <FooterSection /> */}
    </div>
  );
}


export default App
