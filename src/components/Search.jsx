import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/blogs");
    }
  };

  const sectionStyles = {
    width: "100%",
    padding: "3rem 0",
    textAlign: "center",
  };

  const formStyles = {
    display: "inline-block",
    width: "100%",
    maxWidth: "600px",
    padding: "1rem",
    borderRadius: "0.375rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    color: "#59606D",
  };

  const inputStyles = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    marginBottom: "1rem",
  };

  const buttonStyles = {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.3s",
  };

  return (
    <section style={sectionStyles}>
      <div style={formStyles}>
        <h2>Search for News</h2>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter news title..."
          style={inputStyles}
        />
        <button type="button" onClick={handleSearch} style={buttonStyles}>
          Search
        </button>
      </div>
    </section>
  );
}
