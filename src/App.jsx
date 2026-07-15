import { useState } from "react";

function App() {

  // Stores the 9 squares of the board
  const [board, setBoard] = useState(Array(9).fill(""));

  // Keeps track of whose turn it is
  const [xIsNext, setXIsNext] = useState(true);

  // Stores the winner
  const [winner, setWinner] = useState(null);

  // All possible ways to win
  const winningLines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left diagonal
    [2, 4, 6], // Right diagonal
  ];

  // Checks if there is a winner
  function calculateWinner(squares) {

    for (let line of winningLines) {

      const [a, b, c] = line;

      // If all three squares match, return the winner
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  // Runs when a square is clicked
  function handleClick(index) {

    // Don't allow playing on a filled square or after the game is won
    if (board[index] || winner) {
      return;
    }

    // Copy the current board
    const newBoard = [...board];

    // Place X or O
    newBoard[index] = xIsNext ? "X" : "O";

    // Update the board
    setBoard(newBoard);

    // Check for a winner
    const gameWinner = calculateWinner(newBoard);
    setWinner(gameWinner);

    // Switch turns
    setXIsNext(!xIsNext);
  }

  // Starts a new game
  function resetGame() {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setXIsNext(true);
  }

  // Shows the game status
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(cell => cell !== "")) {
    status = "It's a Draw!";
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>

      <h1>Tic Tac Toe</h1>

      {/* Show whose turn it is or the winner */}
      <h2>{status}</h2>

      {/* Game Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gap: "8px",
          justifyContent: "center",
        }}
      >

        {/* Create the 9 squares */}
        {board.map((cell, index) => (

          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "80px",
              height: "80px",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            {cell}
          </button>

        ))}

      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Reset Game
      </button>

    </div>
  );
}

export default App;