import React, { useState } from "react";

export default function App() {
  const [isJump, setIsJump] = useState(false);

  const handleJump = () => {
    setIsJump(true);
    setTimeout(() => setIsJump(false), 400); // Change jump state back after 1 second
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
