import React from "react";

export default function About() {
  const sectionStyle = {
    padding: "40px 20px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const headingStyle = {
    fontSize: "28px",
    color: "#59606D",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "16px",
    color: "#70ACB1",
    lineHeight: "1.6",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>About Our Website</h2>
      <p style={paragraphStyle}>
        Welcome to our online platform! We are dedicated to providing
        high-quality content, products, and services to our valued visitors. Our
        mission is to inspire, inform, and engage our community through
        innovative ideas and cutting-edge solutions. Whether you're here to
        learn, shop, or explore, we're committed to delivering an exceptional
        online experience tailored to your needs.
      </p>
    </section>
  );
}
