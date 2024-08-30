import React, { useEffect, useState } from "react";
import axiosClient from "../axios";

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const [banner, setBanner] = useState([]);

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get("banners")
      .then(({ data }) => {
        const activeBanners = data.banners.filter(
          (banner) => banner.status === "active"
        );
        setBanner(activeBanners);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % banner.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + banner.length) % banner.length);
  };

  const bannerStyle = {
    position: "relative",
    width: "100%",
    height: "400px",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  };

  const slideContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${banner.length * 100}%`,
    height: "100%",
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(-${activeSlide * (100 / banner.length)}%)`,
  };

  const slideStyle = {
    width: `${100 / banner.length}%`,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "20px",
    cursor: "pointer",
  };

  const dotContainerStyle = {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
  };

  const dotStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#E7F0D2",
    borderColor: "#D2EA9B",
    cursor: "pointer",
  };

  const activeDotStyle = {
    ...dotStyle,
    backgroundColor: "#83B271",
  };
  return (
    <>
      {!loading && (
        <div style={bannerStyle}>
          <div style={slideContainerStyle}>
            {banner.map((slide, index) => (
              <div key={index} style={slideStyle}>
                <img
                  src={`https://tinno.dikelasawan.my.id:8443/storage/${slide.image}`}
                  alt={slide.title}
                  style={{ maxWidth: "100%", height: "auto", width: "100%" }}
                />
              </div>
            ))}
          </div>

          <button style={{ ...buttonStyle, left: "10px" }} onClick={prevSlide}>
            ←
          </button>
          <button style={{ ...buttonStyle, right: "10px" }} onClick={nextSlide}>
            →
          </button>

          <div style={dotContainerStyle}>
            {banner.map((_, index) => (
              <button
                key={index}
                style={index === activeSlide ? activeDotStyle : dotStyle}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
