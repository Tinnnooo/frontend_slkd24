// Portfolios.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get("portfolios")
      .then((response) => {
        if (response.data.portfolios.length > 0) {
          const latestPortfolios = response.data.portfolios.slice(0, 3);
          setPortfolios(latestPortfolios);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolios:", error);
        setError("Failed to load portfolios. Please try again later.");
        setLoading(false);
      });
  }, []);

  const sectionStyles = {
    width: "100%",
    padding: "3rem 0",
    backgroundColor: "#f3f4f6",
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
  };

  const imageStyles = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const contentStyles = {
    padding: "1.5rem",
  };

  const portfolioTitleStyles = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#59606D",
  };

  const descriptionStyles = {
    color: "#4b5563",
    marginBottom: "1rem",
  };

  const linkStyles = {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "500",
  };

  const noDataStyle = {
    color: "#4b5563",
    textAlign: "center",
  };

  const viewAllStyles = {
    marginTop: "2rem",
    textAlign: "center",
  };

  const buttonStyles = {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    padding: "0.75rem 1.5rem",
    borderRadius: "9999px",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.3s",
  };

  if (loading) return <div style={containerStyles}>Loading portfolios...</div>;
  if (error) return <div style={containerStyles}>{error}</div>;

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>Latest Portfolios</h2>
        <div style={gridStyles}>
          {portfolios.length < 1 && <p style={noDataStyle}>No data.</p>}
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} style={portfolioItemStyles}>
              <img
                src={`https://tinno.dikelasawan.my.id:8443/storage/${portfolio.image}`}
                alt={portfolio.title}
                style={imageStyles}
              />
              <div style={contentStyles}>
                <h3 style={portfolioTitleStyles}>{portfolio.title}</h3>
                <p style={descriptionStyles}>{portfolio.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={viewAllStyles}>
          <Link to="/portfolios" style={buttonStyles}>
            View All Portfolios
          </Link>
        </div>
      </div>
    </section>
  );
}
