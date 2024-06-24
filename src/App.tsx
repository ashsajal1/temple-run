import React, { useState, useEffect } from "react";

export default function App() {
  const [isJump, setIsJump] = useState(false);
  const [showBird, setShowBird] = useState(false);

  useEffect(() => {
    // Show the bird after 4 seconds
    const birdTimeout = setTimeout(() => {
      setShowBird(true);
    }, 4000);

    return () => clearTimeout(birdTimeout);
  }, []); // Run once on component mount

  const handleJump = () => {
    setIsJump(true);
    setTimeout(() => setIsJump(false), 400); // Change jump state back after 400 milliseconds
  };

  return (
    <div
      style={{
        backgroundImage: `url(/ground.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end", // Align items to bottom for the jump effect
        position: "relative", // Necessary for absolute positioning of elements
      }}
    >
      {showBird && (
        <img
          style={{ width: "150px", position: "absolute", top: "60px", right: "40px" }}
          src="/birds.gif"
          alt="birds flying"
        />
      )}

      <img
        style={{
          position: "absolute",
          left: "40px",
          width: "120px",
          height: "130px",
          bottom: isJump ? "200px" : "80px", // Adjust bottom position when jumping
          transition: "bottom 0.5s ease", // Smooth transition for jump effect
        }}
        src={`/man.gif`}
        alt="man running"
      />

      <div style={{ position: "absolute", bottom: "40px", right: "120px" }}>
        <button
          onClick={handleJump}
          style={{ padding: "12px", borderRadius: "12px" }}
          disabled={isJump} // Disable button during jump
        >
          Up
        </button>
      </div>
    </div>
  );
}
