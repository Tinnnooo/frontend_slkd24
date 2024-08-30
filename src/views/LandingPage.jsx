import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import Banner from "../components/Banner";
import GalleryThumbnail from "../components/GalleryThumbnail";
import About from "../components/About";
import News from "../components/News";
import Services from "../components/Services";
import Portfolios from "../components/Portfolio";
import Testimonial from "../components/Testimonial";
import Search from "../components/Search";
import Footer from "../components/Footer";

export default function LandingPage() {
  const landingPageStyles = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  };
  return (
    <div style={landingPageStyles}>
      <Banner />
      <GalleryThumbnail />
      <About />
      <Search />
      <News />
      <Services />
      <Portfolios />
      <Testimonial />
    </div>
  );
}
