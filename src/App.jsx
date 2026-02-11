import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const playRef = useRef(null); // the playground area (btnContainer)
  const noRef = useRef(null); // the No button itself

  const [pos, setPos] = useState({ x: 0, y: 0 });

  const placeNoRandomly = () => {
    const play = playRef.current;
    const noBtn = noRef.current;
    if (!play || !noBtn) return;

    const playRect = play.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, playRect.width - btnRect.width);
    const maxY = Math.max(0, playRect.height - btnRect.height);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setPos({ x, y });
  };

  // Put it somewhere on first render
  useEffect(() => {
    placeNoRandomly();
  }, []);

  // If you want it to dodge before you even touch it:
  const handleMouseMove = (e) => {
    const noBtn = noRef.current;
    if (!noBtn) return;

    const r = noBtn.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    const centerY = r.top + r.height / 2;

    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    // tweak this number for difficulty (bigger = harder to catch)
    if (dist < 100) placeNoRandomly();
  };

  return (
    <div className="container">
      <img
        className="heartImg"
        src="./images/heart-img.png"
        alt="heart image"
      />
      <h1 className="header">Will you be Anjola&apos;s Valentine</h1>

      <div className="btnContainer" ref={playRef} onMouseMove={handleMouseMove}>
        <button className="yesBtn">Yes</button>

        <button
          ref={noRef}
          className="noBtn"
          onMouseEnter={placeNoRandomly}
          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default App;
