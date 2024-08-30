import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../axios";
import Search from "../components/Search";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axiosClient
      .get("blogs")
      .then((response) => {
        if (response.data.blogs.length > 0) {
          setBlogs(response.data.blogs);
          setFilteredBlogs(response.data.blogs);
          extractUniqueTags(response.data.blogs);
          setLatestBlogs(response.data.blogs.slice(0, 5));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      });
  }, []);

  const extractUniqueTags = (blogsData) => {
    const allTags = blogsData.flatMap((item) => item.tags);
    const uniqueTags = [...new Set(allTags)];
    setUniqueTags(uniqueTags);
  };

  const toggleTagFilter = (tag) => {
    if (activeTag === tag) {
      setFilteredBlogs(blogs);
      setActiveTag(null);
    } else {
      const result = blogs.filter((item) => item.tags.includes(tag));
      setFilteredBlogs(result);
      setActiveTag(tag);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";

    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const result = blogs.filter((item) =>
        item.title.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredBlogs(result);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [location.search, blogs]);

  const sectionStyles = {
    width: "100%",
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
    padding: "1rem 0",
  };

  const blogsItemStyles = {
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

  const blogsTitleStyles = {
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

  const tagStyles = (tag) => ({
    backgroundColor: activeTag === tag ? "#3b82f6" : "#e5e7eb",
    color: activeTag === tag ? "#ffffff" : "#4b5563",
    padding: "0.25rem 0.5rem",
    borderRadius: "9999px",
    fontSize: ".8rem",
    cursor: "pointer",
  });

  const linkStyles = {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "500",
  };

  const noDataStyle = {
    color: "#4b5563",
    textAlign: "center",
  };

  const tagFilterStyles = {
    display: "flex",
    gap: "1rem",
    padding: "1rem 0 ",
    width: "100%",
    overflowX: "auto",
    whiteSpace: "nowrap",
  };

  const categoriesStyles = {
    color: "#59606D",
    fontWeight: "700",
    fontSize: "1rem",
  };

  const contentFooterStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const carouselContainerStyles = {
    display: "flex",
    overflow: "hidden",
    position: "relative",
    padding: "1rem 0",
    marginBottom: "2rem",
  };

  const carouselStyles = {
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    gap: "1rem",
    padding: "0 1rem",
  };

  const carouselItemStyles = {
    flex: "0 0 auto",
    width: "300px",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    color: "#59606D",
    scrollSnapAlign: "start",
  };

  const carouselImageStyles = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  if (loading) return <div style={containerStyles}>Loading blogs...</div>;
  if (error) return <div style={containerStyles}>{error}</div>;

  return (
    <section style={sectionStyles}>
      <Search />
      <div style={containerStyles}>
        <h2 style={titleStyles}>Popular Blog Posts</h2>
        <div style={carouselContainerStyles}>
          <div style={carouselStyles} className="carousel">
            {latestBlogs.map((item) => (
              <div key={item.id} style={carouselItemStyles}>
                <img
                  src={`https://tinno.dikelasawan.my.id:8443/storage/${item.image}`}
                  alt={item.title}
                  style={imageStyles}
                />
                <div style={contentStyles}>
                  <h3 style={blogsTitleStyles}>{item.title}</h3>
                  <div style={metaStyles}>
                    <span style={authorStyles}>{item.author.name}</span>
                    <span style={dateStyles}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={descriptionStyles}>{item.description}</p>
                  <div style={tagsStyles}>
                    {item.tags.map((tag, index) => (
                      <span key={index} style={tagStyles(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={contentFooterStyles}>
                    <Link to={`/blogs/${item.id}`} style={linkStyles}>
                      Read more
                    </Link>

                    <p>Total comments: {item.comments.length}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={titleStyles}>Blogs</h2>

        <p style={categoriesStyles}>Categories</p>
        <div style={tagFilterStyles}>
          {uniqueTags.map((tag, index) => (
            <span
              key={index}
              style={tagStyles(tag)}
              onClick={() => toggleTagFilter(tag)}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={gridStyles}>
          {filteredBlogs.length < 1 && (
            <p style={noDataStyle}>No results found.</p>
          )}
          {filteredBlogs.map((item) => (
            <div key={item.id} style={blogsItemStyles}>
              <img
                src={`https://tinno.dikelasawan.my.id:8443/storage/${item.image}`}
                alt={item.title}
                style={imageStyles}
              />
              <div style={contentStyles}>
                <h3 style={blogsTitleStyles}>{item.title}</h3>
                <div style={metaStyles}>
                  <span style={authorStyles}>{item.author.name}</span>
                  <span style={dateStyles}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p style={descriptionStyles}>{item.description}</p>
                <div style={tagsStyles}>
                  {item.tags.map((tag, index) => (
                    <span key={index} style={tagStyles(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={contentFooterStyles}>
                  <Link to={`/blogs/${item.id}`} style={linkStyles}>
                    Read more
                  </Link>

                  <p>Total comments: {item.comments.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
