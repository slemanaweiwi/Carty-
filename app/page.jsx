'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import AboutModal from "@/components/AboutModal";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  return (
    <>
      {/* About Us Button - Top Left Floating, slightly lower */}
      <button
        className="fixed top-20 left-6 z-40 px-5 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition font-semibold"
        onClick={() => setShowAbout(true)}
      >
        About Us
      </button>
      <AboutModal show={showAbout} onClose={() => setShowAbout(false)} />
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
        {/* About Us Section */}
        <div className="mt-16 flex justify-center">
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition font-semibold"
            onClick={() => setShowAbout(true)}
          >
            About Us
          </button>
        </div>
        <AboutModal show={showAbout} onClose={() => setShowAbout(false)} />
      </div>
      <Footer />
    </>
  );
}
