"use client";

import WebcamFeed from "../components/WebcamFeed";
import { useState } from "react";

export default function Home() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/art.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Berkshire Swash', cursive",
        color: "#fff",
        textShadow: "1px 1px 6px rgba(0,0,0,0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: "800px",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.5)",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>QuietVision </h1>
        <span style={{ fontSize: "1rem", opacity: 0.8 }}>Face Tracking App</span>
      </header>

      <section
        style={{
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "2rem",
          lineHeight: "1.4",
        }}
      >
        <h2 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          Welcome to QuietVision
        </h2>
        <p style={{ fontSize: "1.3rem", opacity: 0.85, marginBottom: "1.5rem" }}>
          A clean, calm, and professional face tracking app — perfect for introverted tech enthusiasts.
        </p>

        <button
          onClick={() => setShowCamera(true)}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#f9c6d3", // light pink to complement background
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(249,198,211,0.6)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f48ca3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#f9c6d3")}
        >
          Start Tracking
        </button>
      </section>

      {showCamera && (
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            marginTop: "2rem",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 0 20px rgba(0,0,0,0.7)",
          }}
        >
          <WebcamFeed />
        </div>
      )}
    </main>
  );
}
