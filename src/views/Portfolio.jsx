import React, { useState, useEffect } from "react";
import axiosClient from "../axios";

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axiosClient
      .get("portfolios")
      .then((response) => {
        if (response.data.portfolios.length > 0) {
          setPortfolioItems(response.data.portfolios);
          setFilteredItems(response.data.portfolios);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolio items:", error);
        setError("Failed to load portfolio items. Please try again later.");
        setLoading(false);
      });
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const sectionStyles = {
    width: "100%",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "3rem 0",
  };

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const titleStyles = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#59606D",
  };

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  };

  const portfolioItemStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    color: "#59606D",
    cursor: "pointer",
  };

  const imageStyles = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const contentStyles = {
    padding: "1.5rem",
  };

  const itemTitleStyles = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#59606D",
  };

  const descriptionStyles = {
    color: "#4b5563",
    marginBottom: "1rem",
  };

  const metaStyles = {
    fontSize: "0.875rem",
    color: "#6b7280",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  };

  const authorStyles = {
    fontWeight: "500",
    color: "#59606D",
  };

  const dateStyles = {
    fontStyle: "italic",
    color: "#59606D",
  };

  const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyles = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "0.5rem",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90%",
    overflow: "auto",
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const noDataStyle = {
    color: "#4b5563",
    textAlign: "center",
  };

  if (loading)
    return <div style={containerStyles}>Loading portfolio items...</div>;
  if (error) return <div style={containerStyles}>{error}</div>;

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>My Portfolio</h2>

        <div style={gridStyles}>
          {filteredItems.length < 1 && (
            <p style={noDataStyle}>No portfolio items found.</p>
          )}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={portfolioItemStyles}
              onClick={() => openModal(item)}
            >
              <img
                src={`https://tinno.dikelasawan.my.id:8443/storage/${item.image}`}
                alt={item.title}
                style={imageStyles}
              />
              <div style={contentStyles}>
                <h3 style={itemTitleStyles}>{item.title}</h3>
                <div style={metaStyles}>
                  <span style={authorStyles}>{item.author.name}</span>
                  <span style={dateStyles}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p style={descriptionStyles}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div style={modalStyles} onClick={closeModal}>
          <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyles} onClick={closeModal}>
              &times;
            </button>
            <h2 style={itemTitleStyles}>{selectedProject.title}</h2>
            <img
              src={`https://tinno.dikelasawan.my.id:8443/storage/${selectedProject.image}`}
              alt={selectedProject.title}
              style={{ ...imageStyles, height: "auto", marginBottom: "1rem" }}
            />
            <p style={descriptionStyles}>{selectedProject.description}</p>
            <div style={metaStyles}>
              <span style={authorStyles}>
                Author: {selectedProject.author.name}
              </span>
              <span style={dateStyles}>
                Date:{" "}
                {new Date(selectedProject.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
