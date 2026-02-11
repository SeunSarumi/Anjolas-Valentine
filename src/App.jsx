import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const playRef = useRef(null);
  const noRef = useRef(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);

  const placeNoRandomly = () => {
    const play = playRef.current;
    const noBtn = noRef.current;
    if (!play || !noBtn) return;

    const playRect = play.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, playRect.width - btnRect.width);
    const maxY = Math.max(0, playRect.height - btnRect.height);

    setPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  useEffect(() => {
    placeNoRandomly();
  }, []);

  const handleMouseMove = (e) => {
    if (accepted) return;

    const noBtn = noRef.current;
    if (!noBtn) return;

    const r = noBtn.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    const centerY = r.top + r.height / 2;

    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < 100) placeNoRandomly();
  };

  return (
    <div className="container">
      <img
        className="heartImg"
        src="./images/heart-img.png"
        alt="heart image"
      />

      {/* ✅ After clicking Yes, show celebration content */}
      {accepted ? (
        <>
          <h1 className="yayText">Yay! 💖</h1>

          <img
            className="yayGif"
            src="https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUycDRtMWxjYjJpZ2RqNW9naXdoYnk0OGtqa3c3bHpieGMyMXRmY3BzdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26ufdipQqU2lhNA4g/source.gif"
            alt="celebration gif"
          />
        </>
      ) : (
        <>
          <h1 className="header">Will you be Anjola&apos;s Valentine</h1>

          <div
            className="btnContainer"
            ref={playRef}
            onMouseMove={handleMouseMove}
          >
            <button className="yesBtn" onClick={() => setAccepted(true)}>
              Yes
            </button>

            <button
              ref={noRef}
              className="noBtn"
              onMouseEnter={placeNoRandomly}
              style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            >
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
