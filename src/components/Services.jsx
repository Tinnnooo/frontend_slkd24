import React from "react";

const Services = () => {
  // Services data
  const services = [
    {
      title: "Web Development",
      description:
        "Custom website and web application development tailored to your needs.",
      icon: "🌐",
    },
    {
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile app development for iOS and Android.",
      icon: "📱",
    },
    {
      title: "UI/UX Design",
      description:
        "User-centered design solutions that enhance user experience and satisfaction.",
      icon: "🎨",
    },
    {
      title: "Cloud Services",
      description:
        "Scalable and secure cloud solutions for your business infrastructure.",
      icon: "☁️",
    },
  ];

  // Styles
  const sectionStyle = {
    padding: "2rem 0",
    width: "100%",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "2.5rem",
    color: "#333",
  };

  const serviceGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  };

  const serviceItemStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  };

  const serviceIconStyle = {
    fontSize: "3rem",
    marginBottom: "20px",
  };

  const serviceTitleStyle = {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#333",
  };

  const serviceDescriptionStyle = {
    fontSize: "1rem",
    color: "#666",
    lineHeight: "1.6",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Our Services</h2>
        <div style={serviceGridStyle}>
          {services.map((service, index) => (
            <div
              key={index}
              style={serviceItemStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={serviceIconStyle}>{service.icon}</div>
              <h3 style={serviceTitleStyle}>{service.title}</h3>
              <p style={serviceDescriptionStyle}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
