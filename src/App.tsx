import { useState, useEffect, useRef } from "react";

export default function App() {
  const [isJump, setIsJump] = useState(false);
  const [showBird, setShowBird] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const manRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pillarRefs = [useRef(null), useRef(null)]; // Assuming two pillars for simplicity

  useEffect(() => {
    const birdTimeout = setTimeout(() => {
      setShowBird(true);
    }, 4000);

    return () => clearTimeout(birdTimeout);
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      const man = manRef.current;
      const pillars = pillarRefs.map(ref => ref.current);

      if (man) {
        const manRect = man.getBoundingClientRect();

        for (const pillar of pillars) {
          if (pillar) {
            const pillarRect = pillar.getBoundingClientRect();

            if (
              manRect.x < pillarRect.x + pillarRect.width &&
              manRect.x + manRect.width > pillarRect.x &&
              manRect.y < pillarRect.y + pillarRect.height &&
              manRect.y + manRect.height > pillarRect.y
            ) {
              setGameOver(true);
              break;
            }
          }
        }
      }
    };

    const interval = setInterval(() => {
      if (!gameOver) {
        checkCollision();
      }
    }, 100); // Check for collision every 100ms

    return () => clearInterval(interval);
  }, [gameOver, pillarRefs]);

  const handleJump = () => {
    setIsJump(true);
    setTimeout(() => setIsJump(false), 400);
  };

  if (gameOver) {
    return <div className="flex flex-col p-24 gap-12">
      <span className="text-center text-xl font-bold">Game over</span>
      <button onClick={() => window.location.reload()} className="btn btn-primary">Restart Game</button>
    </div>;
  }

  return (
    <div className="container">
      {showBird && (
        <img
          className="birds"
          src="/birds.gif"
          alt="birds flying"
        />
      )}

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
          className="button"
          disabled={isJump}
        >
          Up
        </button>
      </div>
    </div>
  );
}
