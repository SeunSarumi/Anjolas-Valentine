import { useState } from "react";

import "./App.css";

function App() {
  return (
    <div className="container">
      <img
        className="heartImg"
        src="./images/heart-img.png"
        alt="heart image"
      />
      <h1 className="header"> Will you be Anjola's Valentine</h1>
      <div className="btnContainer">
        <button className="yesBtn">Yes</button>
        <button className="noBtn">No</button>
      </div>
    </div>
  );
}

export default App;
