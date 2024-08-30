import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get("blogs")
      .then((response) => {
        if (response.data.blogs.length > 0) {
          const latestBlogs = response.data.blogs.slice(0, 3);
          setNews(latestBlogs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
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

  const newsItemStyles = {
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

  const newsTitleStyles = {
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

  const tagsStyles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1rem",
  };

  const tagStyles = {
    backgroundColor: "#e5e7eb",
    color: "#4b5563",
    padding: "0.25rem 0.5rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
  };

  const linkStyles = {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "500",
  };

  const viewAllStyles = {
    marginTop: "2rem",
    textAlign: "center",
  };

  const noDataStyle = {
    color: "#4b5563",
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

  if (loading) return <div style={containerStyles}>Loading news...</div>;
  if (error) return <div style={containerStyles}>{error}</div>;

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>Latest News</h2>
        <div style={gridStyles}>
          {news.length < 1 && <p style={noDataStyle}>No data.</p>}
          {news.map((item) => (
            <div key={item.id} style={newsItemStyles}>
              <img
                src={`https://tinno.dikelasawan.my.id:8443/storage/${item.image}`}
                alt={item.title}
                style={imageStyles}
              />
              <div style={contentStyles}>
                <h3 style={newsTitleStyles}>{item.title}</h3>
                <div style={metaStyles}>
                  <span style={authorStyles}>{item.author.name}</span>
                  <span style={dateStyles}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p style={descriptionStyles}>{item.description}</p>
                <div style={tagsStyles}>
                  {item.tags.map((tag, index) => (
                    <span key={index} style={tagStyles}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`/blogs/${item.id}`} style={linkStyles}>
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div style={viewAllStyles}>
          <Link to="/blogs" style={buttonStyles}>
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
