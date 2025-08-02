import React, { useState } from "react";
import "./../styles/App.css";

// Define the game levels and their properties.
const LEVELS = {
  easy: { tiles: 8, pairs: 4 },
  normal: { tiles: 16, pairs: 8 },
  hard: { tiles: 32, pairs: 16 },
};

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} A new, shuffled array.
 */
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

/**
 * Generates an array of tile objects for the selected level.
 * @param {string} level - The difficulty level ('easy', 'normal', or 'hard').
 * @returns {Array} An array of tile objects.
 */
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

  /**
   * Starts a new game with the selected difficulty level.
   * @param {string} selectedLevel - The new difficulty level.
   */
  function startGame(selectedLevel) {
    setLevel(selectedLevel);
    setTiles(generateTiles(selectedLevel));
    setFlipped([]);
    setAttempts(0);
    setMatchedCount(0);
    setPage("game");
  }

  /**
   * Handles a tile click event.
   * @param {number} idx - The index of the clicked tile.
   */
  function handleTileClick(idx) {
    // Ignore clicks on already flipped/matched tiles or when two tiles are already flipped.
    if (tiles[idx].flipped || tiles[idx].matched || flipped.length === 2) return;

    const newTiles = tiles.slice();
    newTiles[idx].flipped = true;
    const newFlipped = flipped.concat(idx);

    setTiles(newTiles);
    setFlipped(newFlipped);

    // If two tiles have been flipped, check for a match.
    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);
      const [i1, i2] = newFlipped;
      if (newTiles[i1].value === newTiles[i2].value) {
        // If a match is found, mark the tiles as matched after a delay.
        setTimeout(() => {
          const updatedTiles = newTiles.slice();
          updatedTiles[i1].matched = true;
          updatedTiles[i2].matched = true;
          setTiles(updatedTiles);
          setMatchedCount(matchedCount + 1);
          setFlipped([]);
        }, 600);
      } else {
        // If no match, flip the tiles back over after a delay.
        setTimeout(() => {
          const updatedTiles = newTiles.slice();
          updatedTiles[i1].flipped = false;
          updatedTiles[i2].flipped = false;
          setTiles(updatedTiles);
          setFlipped([]);
        }, 900);
      }
    }
  }

  /**
   * Checks if the game is complete.
   * @returns {boolean} True if all pairs have been matched, otherwise false.
   */
  function isGameComplete() {
    return matchedCount === LEVELS[level].pairs;
  }

  const gridClass =
    "cells_container " +
    (level === "easy"
      ? "easy"
      : level === "normal"
      ? "normal"
      : "hard");

  // Landing Page view with radio buttons for level selection.
  if (page === "landing") {
    return (
      <div className="main_container">
        <h1>Welcome!</h1>
        <div className="levels_container">
          <input
            type="radio"
            id="easy"
            name="difficulty"
            value="easy"
            checked={level === "easy"}
            onChange={(e) => startGame(e.target.value)}
          />
          <label htmlFor="easy">Easy</label>
          <input
            type="radio"
            id="normal"
            name="difficulty"
            value="normal"
            checked={level === "normal"}
            onChange={(e) => startGame(e.target.value)}
          />
          <label htmlFor="normal">Normal</label>
          <input
            type="radio"
            id="hard"
            name="difficulty"
            value="hard"
            checked={level === "hard"}
            onChange={(e) => startGame(e.target.value)}
          />
          <label htmlFor="hard">Hard</label>
        </div>
      </div>
    );
  }

  // Game Page view
  return (
    <div className="main_container">
      <h1>Memory Game</h1>
      <div className="levels_container">
        <input
          type="radio"
          id="easy"
          name="difficulty"
          value="easy"
          checked={level === "easy"}
          onChange={(e) => startGame(e.target.value)}
        />
        <label htmlFor="easy">Easy</label>
        <input
          type="radio"
          id="normal"
          name="difficulty"
          value="normal"
          checked={level === "normal"}
          onChange={(e) => startGame(e.target.value)}
        />
        <label htmlFor="normal">Normal</label>
        <input
          type="radio"
          id="hard"
          name="difficulty"
          value="hard"
          checked={level === "hard"}
          onChange={(e) => startGame(e.target.value)}
        />
        <label htmlFor="hard">Hard</label>
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
