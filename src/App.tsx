import { useState, useEffect, useRef } from "react";

export default function App() {
  const [isJump, setIsJump] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [pillars, setPillars] = useState([]);

  const manRef = useRef(null);
  const lastPassedPillar = useRef(null); // Track the last passed pillar to avoid double counting

  useEffect(() => {
    // Function to create a new pillar
    const createPillar = () => {
      const height = Math.floor(Math.random() * 30) + 100; // Random height between 100 and 300
      setPillars((prevPillars) => [
        ...prevPillars,
        { id: Date.now(), height, left: "100%" },
      ]);
    };

    // Create a new pillar every 2-3 seconds
    const pillarInterval = setInterval(createPillar, Math.random() * 1000 + 2000);

    return () => clearInterval(pillarInterval);
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      const man = manRef.current;
      if (man) {
        const manRect = man.getBoundingClientRect();

        pillars.forEach((pillar) => {
          const pillarElement = document.getElementById(pillar.id);
          if (pillarElement) {
            const pillarRect = pillarElement.getBoundingClientRect();

            // Check for collision
            if (
              manRect.x < pillarRect.x + pillarRect.width &&
              manRect.x + manRect.width > pillarRect.x &&
              manRect.y < pillarRect.y + pillarRect.height &&
              manRect.y + manRect.height > pillarRect.y
            ) {
              setGameOver(true);
            }

            // Check if the man has passed the pillar
            if (pillarRect.x + pillarRect.width < manRect.x && lastPassedPillar.current !== pillar.id) {
              setScore((prevScore) => prevScore + 1);
              lastPassedPillar.current = pillar.id; // Update the last passed pillar
            }
          }
        });
      }
    };

    const interval = setInterval(() => {
      if (!gameOver) {
        checkCollision();
      }
    }, 100); // Check for collision and score update every 100ms

    return () => clearInterval(interval);
  }, [gameOver, pillars]);

  const handleJump = () => {
    setIsJump(true);
    setTimeout(() => setIsJump(false), 400);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col p-24 gap-12">
        <span className="text-center text-xl font-bold">Game over</span>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Restart Game
        </button>
        <span className="text-center text-xl">Score: {score}</span>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="absolute top-12 left-12 btn btn-success z-10">
        Score : {score}
      </div>

      <img className="birds" src="/birds.gif" alt="birds flying" />

      <img
        ref={manRef}
        className="man"
        style={{ bottom: isJump ? "200px" : "80px" }}
        src={`/man.gif`}
        alt="man running"
      />

      {pillars.map((pillar) => (
        <div
          key={pillar.id}
          id={pillar.id}
          className="pillar"
          style={{ height: `${pillar.height}px`, left: pillar.left }}
        ></div>
      ))}

      <div className="button-container">
        <button onClick={handleJump} className="btn" disabled={isJump}>
          Up
        </button>
      </div>
    </div>
  );
}
