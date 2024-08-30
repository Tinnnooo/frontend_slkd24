import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function BlogDetail() {
  const { userToken } = useStateContext();
  const [blog, setBlog] = useState(null);
  const [popularTags, setPopularTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [website, setWebsite] = useState("");
  const [comment, setComment] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axiosClient
      .get(`blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      });

    axiosClient
      .get(`comments/${id}`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });

    generateCaptchaToken();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("website", website);
    formData.append("comment", comment);
    formData.append("captcha", captchaInput);
    formData.append("token", captchaToken);

    axiosClient
      .post(`comments/${id}`, formData)
      .then((response) => {
        setComments([...comments, response.data]);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setError(error.response.data.message);
      });
  };

  const generateCaptchaToken = () => {
    axiosClient
      .get("/captcha/requestToken")
      .then((response) => {
        setCaptchaToken(response.data.token);
        generateCaptcha(response.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateCaptcha = (token) => {
    axiosClient
      .get(`/captcha/${token || captchaToken}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const base64Image = arrayBufferToBase64(response.data);
        const imageSrc = `data:image/png;base64,${base64Image}`;

        setCaptchaImage(imageSrc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshCaptcha = () => {
    generateCaptchaToken(captchaToken);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const sectionStyles = {
    width: "100%",
    padding: "1rem 0",
    backgroundColor: "#f3f4f6",
  };

  const containerStyles = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const titleStyles = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#59606D",
  };

  const metaStyles = {
    fontSize: "0.875rem",
    color: "#6b7280",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const imageStyles = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "0.5rem",
    marginBottom: "2rem",
  };

  const contentStyles = {
    color: "#4b5563",
    lineHeight: "1.8",
    marginBottom: "2rem",
  };

  const tagsStyles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "2rem",
  };

  const tagStyles = {
    backgroundColor: "#e5e7eb",
    color: "#4b5563",
    padding: "0.25rem 0.5rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
  };

  const commentsStyles = {
    marginTop: "3rem",
  };

  const commentStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginBottom: "1rem",
  };

  const formStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginTop: "2rem",
  };

  const inputStyles = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "0.25rem",
    border: "1px solid #d1d5db",
  };

  const buttonStyles = {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    padding: "0.75rem 1.5rem",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const popularTagsStyles = {
    marginTop: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    padding: "1rem",
  };

  const captchaContainer = {
    display: "flex",
    flexDirection: "column",
  };

  const inputGroupStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  };

  const errorStyles = {
    color: "red",
    marginTop: "10px",
  };

  if (loading)
    return <div style={containerStyles}>Loading blog details...</div>;
  if (!blog) return <div style={containerStyles}>Blog not found.</div>;

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h1 style={titleStyles}>{blog.title}</h1>
        <div style={metaStyles}>
          <span>By {blog.author.name}</span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        <img
          src={`https://tinno.dikelasawan.my.id:8443/storage/${blog.image}`}
          alt={blog.title}
          style={imageStyles}
        />
        <div
          style={contentStyles}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div style={tagsStyles}>
          {blog.tags.map((tag, index) => (
            <span key={index} style={tagStyles}>
              {tag}
            </span>
          ))}
        </div>
        <div style={commentsStyles}>
          <h2 style={{ ...titleStyles, fontSize: "2rem" }}>Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id} style={commentStyles}>
              <h3>{comment.name}</h3>
              <p>{comment.comment}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} style={formStyles}>
          <h2 style={{ ...titleStyles, fontSize: "1.5rem" }}>
            Leave a Comment
          </h2>
          {userToken ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyles}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyles}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={inputStyles}
              />
              <input
                type="text"
                name="website"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={inputStyles}
              />
              <textarea
                name="comment"
                placeholder="Your Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                style={{ ...inputStyles, height: "100px" }}
              ></textarea>
              <div style={captchaContainer}>
                <div>
                  <img
                    src={captchaImage}
                    alt="CAPTCHA"
                    style={{ marginBottom: "0.5rem", width: "20%" }}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <input
                    type="text"
                    placeholder="Enter CAPTCHA"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    style={inputStyles}
                  />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    style={buttonStyles}
                  >
                    Refresh CAPTCHA
                  </button>
                </div>
              </div>
              <button type="submit" style={buttonStyles}>
                Post Comment
              </button>
              {error && <p style={errorStyles}>{error}</p>}
            </>
          ) : (
            <p>
              Please{" "}
              <Link to="/signin" style={{ color: "#3b82f6" }}>
                log in
              </Link>{" "}
              to leave a comment.
            </p>
          )}
        </form>

        <div style={popularTagsStyles}>
          <h2 style={{ ...titleStyles, fontSize: "1.5rem" }}>Popular Tags</h2>
          <div style={tagsStyles}>
            {popularTags.map((tag, index) => (
              <span key={index} style={tagStyles}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link to="/blogs" style={{ ...buttonStyles, textDecoration: "none" }}>
            Back to All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
