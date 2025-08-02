import React, { useState } from "react";
import "./../styles/App.css";

const LEVELS = {
  easy: { tiles: 8, pairs: 4 },
  normal: { tiles: 16, pairs: 8 },
  hard: { tiles: 32, pairs: 16 },
};

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

function generateTiles(level) {
  const { pairs } = LEVELS[level];
  let numbers = [];
  for (let i = 1; i <= pairs; i++) {
    numbers.push(i);
    numbers.push(i);
  }
  return shuffle(numbers).map((num, idx) => ({
    id: idx,
    value: num,
    flipped: false,
    matched: false,
  }));
}

const App = () => {
  const [page, setPage] = useState("landing"); // landing | game
  const [level, setLevel] = useState("easy");
  const [tiles, setTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  function startGame(selectedLevel) {
    setLevel(selectedLevel);
    setTiles(generateTiles(selectedLevel));
    setFlipped([]);
    setAttempts(0);
    setMatchedCount(0);
    setPage("game");
  }

  function handleTileClick(idx) {
    if (tiles[idx].flipped || tiles[idx].matched || flipped.length === 2)
      return;

    const newTiles = tiles.slice();
    newTiles[idx].flipped = true;
    const newFlipped = flipped.concat(idx);

    setTiles(newTiles);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);
      const [i1, i2] = newFlipped;
      if (newTiles[i1].value === newTiles[i2].value) {
        setTimeout(function () {
          const updatedTiles = newTiles.slice();
          updatedTiles[i1].matched = true;
          updatedTiles[i2].matched = true;
          setTiles(updatedTiles);
          setMatchedCount(matchedCount + 1);
          setFlipped([]);
        }, 600);
      } else {
        setTimeout(function () {
          const updatedTiles = newTiles.slice();
          updatedTiles[i1].flipped = false;
          updatedTiles[i2].flipped = false;
          setTiles(updatedTiles);
          setFlipped([]);
        }, 900);
      }
    }
  }

  function isGameComplete() {
    return matchedCount === LEVELS[level].pairs;
  }

  const gridClass =
    "cells_container " +
    (level === "easy" ? "easy" : level === "normal" ? "normal" : "hard");

  // Landing Page
  if (page === "landing") {
    return (
      <div className="main_container">
        <h1>Welcome!</h1>
        <div className="levels_container">
          <label>
            <input
              type="radio"
              id="easy"
              name="difficulty"
              onChange={() => startGame("easy")}
              checked={level === "easy"}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <button onClick={() => startGame("easy")}>Easy</button>
          </label>
          <label>
            <input
              type="radio"
              id="normal"
              name="difficulty"
              onChange={() => startGame("normal")}
              checked={level === "normal"}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <button onClick={() => startGame("normal")}>Normal</button>
          </label>
          <label>
            <input
              type="radio"
              id="hard"
              name="difficulty"
              onChange={() => startGame("hard")}
              checked={level === "hard"}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <button onClick={() => startGame("hard")}>Hard</button>
          </label>
        </div>
      </div>
    );
  }

  // Game Page
  return (
    <div className="main_container">
      <h1>Memory Game</h1>
      <div className="levels_container">
        <label>
          <input
            type="radio"
            id="easy"
            name="difficulty"
            onChange={() => startGame("easy")}
            checked={level === "easy"}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
          <button
            style={{ background: level === "easy" ? "#eaf2ff" : undefined }}
          >
            Easy
          </button>
        </label>
        <label>
          <input
            type="radio"
            id="normal"
            name="difficulty"
            onChange={() => startGame("normal")}
            checked={level === "normal"}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
          <button
            style={{ background: level === "normal" ? "#eaf2ff" : undefined }}
          >
            Normal
          </button>
        </label>
        <label>
          <input
            type="radio"
            id="hard"
            name="difficulty"
            onChange={() => startGame("hard")}
            checked={level === "hard"}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
          <button
            style={{ background: level === "hard" ? "#eaf2ff" : undefined }}
          >
            Hard
          </button>
        </label>
      </div>

      <div className="status_container">
        Attempts: {attempts}
        {isGameComplete() && (
          <div style={{ color: "#2ecc71", marginTop: 8 }}>
            🎉 All pairs matched in {attempts} attempts!
          </div>
        )}
      </div>

      <div className={gridClass}>
        {tiles.map((tile, idx) => (
          <div
            key={tile.id}
            className={
              "tile" +
              (tile.flipped || tile.matched ? " flipped" : "") +
              (tile.matched ? " matched" : "")
            }
            onClick={() => handleTileClick(idx)}
            data-testid={`tile-${idx}`}
          >
            {tile.flipped || tile.matched ? tile.value : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
