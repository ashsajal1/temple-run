import { useState, useEffect, useRef } from "react";

export default function App() {
  const [isJump, setIsJump] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const manRef = useRef(null);
  const pillarRefs = [useRef(null), useRef(null)]; // Assuming two pillars for simplicity
  const lastPassedPillar = useRef(null); // Track the last passed pillar to avoid double counting

  useEffect(() => {
    const checkCollision = () => {
      const man = manRef.current;
      const pillars = pillarRefs.map(ref => ref.current);

      if (man) {
        const manRect = man.getBoundingClientRect();

        for (const pillar of pillars) {
          if (pillar) {
            const pillarRect = pillar.getBoundingClientRect();

            // Check for collision
            if (
              manRect.x < pillarRect.x + pillarRect.width &&
              manRect.x + manRect.width > pillarRect.x &&
              manRect.y < pillarRect.y + pillarRect.height &&
              manRect.y + manRect.height > pillarRect.y
            ) {
              setGameOver(true);
              break;
            }

            // Check if the man has passed the pillar
            if (pillarRect.x + pillarRect.width < manRect.x && lastPassedPillar.current !== pillar) {
              setScore(prevScore => prevScore + 1);
              lastPassedPillar.current = pillar; // Update the last passed pillar
            }
          }
        }
      }
    };

    const interval = setInterval(() => {
      if (!gameOver) {
        checkCollision();
      }
    }, 100); // Check for collision and score update every 100ms

    return () => clearInterval(interval);
  }, [gameOver, pillarRefs]);

  const handleJump = () => {
    setIsJump(true);
    setTimeout(() => setIsJump(false), 400);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col p-24 gap-12">
        <span className="text-center text-xl font-bold">Game over</span>
        <button onClick={() => window.location.reload()} className="btn btn-primary">Restart Game</button>
        <span className="text-center text-xl">Score: {score}</span>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="absolute top-12 left-12 btn btn-success z-10">
        Score : {score}
      </div>

      <img
        className="birds"
        src="/birds.gif"
        alt="birds flying"
      />


      <img
        ref={manRef}
        className="man"
        style={{ bottom: isJump ? "200px" : "80px" }}
        src={`/man.gif`}
        alt="man running"
      />

      <div
        ref={pillarRefs[0]}
        className="pillar"
        style={{ height: "100px", left: "100%" }}
      ></div>

      <div
        ref={pillarRefs[1]}
        className="pillar"
        style={{ height: "110px", left: "150%" }}
      ></div>

      <div className="button-container">
        <button
          onClick={handleJump}
          className="btn"
          disabled={isJump}
        >
          Up
        </button>
      </div>
    </div>
  );
}
