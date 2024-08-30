import React, { useState } from "react";

export default function GalleryThumbnail() {
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryItems = [
    { src: "/assets/image1.png", alt: "Image 1" },
    { src: "/assets/image2.png", alt: "Image 2" },
    { src: "/assets/image3.png", alt: "Image 3" },
    { src: "/assets/image4.png", alt: "Image 4" },
    { src: "/assets/image5.png", alt: "Image 5" },
    { src: "/assets/image6.png", alt: "Image 6" },
  ];

  const containerStyle = {
    width: "80vw",
    padding: "2rem",
    borderRadius: "1rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
    gridAutoRows: "14rem",
    justifyContent: "center",
    gap: "1.5rem",
    marginTop: "2rem",
  };

  const thumbnailStyle = {
    position: "relative",
    cursor: "pointer",
    borderRadius: ".5rem",
    overflow: "hidden",
    transition: "transform 0.3s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    display: "block",
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    maxWidth: "90%",
    maxHeight: "90%",
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "24px", color: "#59606D" }}>Gallery</h2>
      <div style={gridStyle}>
        {galleryItems.map((item, index) => (
          <div
            key={index}
            style={thumbnailStyle}
            onClick={() => handleItemClick(item)}
          >
            <img src={item.src} alt={item.alt} style={imageStyle} />
          </div>
        ))}
      </div>
      {selectedItem && (
        <div style={modalStyle} onClick={handleCloseModal}>
          <div style={modalContentStyle}>
            <img
              src={selectedItem.src}
              alt={selectedItem.alt}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
