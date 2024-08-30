// Testimonials.js
import React from "react";

const staticTestimonials = [
  {
    id: 1,
    quote: "This service was fantastic! Highly recommend it to everyone.",
    author: "John Doe",
    role: "CEO, Company X",
  },
  {
    id: 2,
    quote: "An amazing experience from start to finish. Very professional!",
    author: "Jane Smith",
    role: "Marketing Director, Company Y",
  },
  {
    id: 3,
    quote:
      "Exceptional quality and customer service. Will definitely use again.",
    author: "Alice Johnson",
    role: "Product Manager, Company Z",
  },
];

export default function Testimonial() {
  const sectionStyles = {
    width: "100%",
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
    color: "#333",
  };

  const testimonialsGridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  };

  const testimonialItemStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    color: "#555",
    textAlign: "center",
  };

  const quoteStyles = {
    fontSize: "1.25rem",
    fontStyle: "italic",
    marginBottom: "1rem",
  };

  const authorStyles = {
    fontWeight: "600",
    color: "#333",
  };

  const roleStyles = {
    fontSize: "0.875rem",
    color: "#666",
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>Testimonials</h2>
        <div style={testimonialsGridStyles}>
          {staticTestimonials.map((testimonial) => (
            <div key={testimonial.id} style={testimonialItemStyles}>
              <blockquote style={quoteStyles}>“{testimonial.quote}”</blockquote>
              <p style={authorStyles}>{testimonial.author}</p>
              <p style={roleStyles}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
