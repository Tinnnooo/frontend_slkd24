import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import Footer from "./Footer";

export default function DefaultLayout() {
  const { userToken, setToken } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    axiosClient
      .get("logout")
      .then((response) => {
        console.log(response.data.message);
        setToken(null);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Styles
  const menuStyle = {
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const logoStyle = {
    width: "9rem",
  };

  const navStyle = {
    display: isMobileView ? "none" : "flex",
    gap: "1.5rem",
    alignItems: "center",
  };

  const linkStyle = {
    color: "#59606D",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  };

  const activeLinkStyle = {
    backgroundColor: "#70ACB1",
    color: "#ffffff",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonLogoutStyle = {
    fontSize: "1rem",
  };

  const mobileMenuButtonStyle = {
    display: "none",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  // Mobile styles
  const mobileNavStyle = {
    display: isMobileView ? (isMenuOpen ? "flex" : "none") : "none",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#ffffff",
  };

  // Media query for mobile
  if (isMobileView) {
    mobileMenuButtonStyle.display = "block";
    mobileNavStyle.display = isMenuOpen ? "flex" : "none";
  }

  // Determine active link style based on current route
  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { ...linkStyle, ...activeLinkStyle }
      : linkStyle;
  };

  return (
    <>
      <header style={menuStyle}>
        <div style={containerStyle}>
          <Link to="/" style={logoStyle}>
            <img
              src="/logo.png"
              alt="WebtechID"
              style={{ width: "100%", height: "100%" }}
            />
          </Link>
          <nav style={navStyle}>
            <Link to="/" style={getLinkStyle("/")}>
              Home
            </Link>
            <Link to="/blogs" style={getLinkStyle("/blogs")}>
              Blogs
            </Link>
            <Link to="/portfolios" style={getLinkStyle("/portfolios")}>
              Portfolios
            </Link>
            {userToken ? (
              <button
                style={{
                  ...getLinkStyle("/logout"),
                  ...buttonStyle,
                  ...buttonLogoutStyle,
                  width: "fit-content",
                }}
                onClick={() => logout()}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  style={{
                    ...getLinkStyle("/signin"),
                    ...buttonStyle,
                    width: "fit-content",
                  }}
                >
                  Signin
                </Link>
                <Link
                  to="/signup"
                  style={{
                    ...getLinkStyle("/signup"),
                    ...buttonStyle,
                    backgroundColor: "#28a745",
                    width: "fit-content",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
          <button
            style={mobileMenuButtonStyle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        <nav style={mobileNavStyle}>
          <Link to="/" style={getLinkStyle("/")}>
            Home
          </Link>
          <Link to="/blogs" style={getLinkStyle("/blogs")}>
            Blogs
          </Link>
          <Link to="/portfolios" style={getLinkStyle("/portfolios")}>
            Portfolios
          </Link>
          {userToken ? (
            <button
              style={{
                ...getLinkStyle("/logout"),
                ...buttonStyle,
                ...buttonLogoutStyle,
                width: "fit-content",
              }}
              onClick={() => logout()}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                style={{
                  ...getLinkStyle("/signin"),
                  ...buttonStyle,
                  width: "fit-content",
                }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                style={{
                  ...getLinkStyle("/signup"),
                  ...buttonStyle,
                  backgroundColor: "#28a745",
                  width: "fit-content",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
