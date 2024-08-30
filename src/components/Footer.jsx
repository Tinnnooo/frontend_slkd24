import React from "react";

export default function Footer() {
  const footerStyles = {
    width: "100%",
    padding: "2rem 0",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  };

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const socialIconsStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  };

  const iconStyles = {
    width: "24px",
    height: "24px",
    transition: "opacity 0.3s",
    opacity: "0.8",
  };

  const iconHoverStyles = {
    opacity: "1",
  };

  const acknowledgmentStyles = {
    fontSize: "0.875rem",
  };

  const linkStyles = {
    color: "#fbbf24",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <div style={socialIconsStyles}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{ ...iconStyles, ...iconHoverStyles }}
          >
            <img src="/assets/fb.png" alt="Facebook" style={iconStyles} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            style={{ ...iconStyles, ...iconHoverStyles }}
          >
            <img src="/assets/twitter.png" alt="Twitter" style={iconStyles} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Youtube"
            style={{ ...iconStyles, ...iconHoverStyles }}
          >
            <img src="/assets/youtube.png" alt="Youtube" style={iconStyles} />
          </a>
        </div>
        <p style={acknowledgmentStyles}>
          &copy; {new Date().getFullYear()} All rights reserved. Designed by:{" "}
          <a
            href="https://www.instagram.com/svtinn_/?igsh=ZDMwc3A0YnZoNndq"
            style={linkStyles}
          >
            Tinno
          </a>
        </p>
      </div>
    </footer>
  );
}
