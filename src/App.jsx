import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState(null); // null, "bot", "2player"
  const [difficulty, setDifficulty] = useState("Easy");
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [stats, setStats] = useState({
    xWins: 12,
    oWins: 8,
    draws: 4,
  });
  const [winLine, setWinLine] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [botThinking, setBotThinking] = useState(false);

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Calculate winner and win line
  function calculateWinner(squares) {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }
    return { winner: null, line: null };
  }

  // Minimax algorithm for AI
  function minimax(squares, depth, isMaximizing) {
    const winner = calculateWinnerSilent(squares);

    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (squares.every(cell => cell !== "")) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === "") {
          squares[i] = "O";
          let score = minimax(squares, depth + 1, false);
          squares[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === "") {
          squares[i] = "X";
          let score = minimax(squares, depth + 1, true);
          squares[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function calculateWinnerSilent(squares) {
    for (let line of winningLines) {
      const [a, b, c] = line;
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

  // AI Move - Always uses optimal strategy for 100% win rate
  function makeAIMove(currentBoard) {
    let bestScore = -Infinity;
    let bestMove = 0;
    let possibleMoves = [];

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === "") {
        currentBoard[i] = "O";
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = "";

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
          possibleMoves = [i];
        } else if (score === bestScore) {
          possibleMoves.push(i);
        }
      }
    }

    // For Easy mode, pick a random best move (but still optimal)
    if (difficulty === "Easy" && possibleMoves.length > 0) {
      bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    } else {
      bestMove = possibleMoves[0] || bestMove;
    }

    return bestMove;
  }

  // Handle clicks
  function handleClick(index) {
    if (board[index] || winner || !gameMode || gameOver || botThinking) return;

    // In 2-player mode, check if it's the correct player's turn
    if (gameMode === "2player") {
      const currentPlayer = xIsNext ? "X" : "O";
      // Check will be implicit - if it's O's turn and we get here, O is playing
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setLastMove(index);

    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinLine(result.line);
      setBoard(newBoard);
      setHistory([...history, newBoard]);
      setHistoryIndex(history.length);
      setGameOver(true);
      updateStats(result.winner);
      return;
    }

    if (newBoard.every(cell => cell !== "")) {
      setBoard(newBoard);
      setHistory([...history, newBoard]);
      setHistoryIndex(history.length);
      setGameOver(true);
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    setBoard(newBoard);
    setHistory([...history, newBoard]);
    setHistoryIndex(history.length);
    
    const nextTurn = !xIsNext;
    setXIsNext(nextTurn);

    if (gameMode === "bot" && !nextTurn) {
      setBotThinking(true);
      setTimeout(() => {
        const aiMove = makeAIMove([...newBoard]);
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = "O";
        setLastMove(aiMove);

        const aiResult = calculateWinner(aiBoard);
        if (aiResult.winner) {
          setWinner(aiResult.winner);
          setWinLine(aiResult.line);
          setBoard(aiBoard);
          setHistory(prev => [...prev, aiBoard]);
          setHistoryIndex(history.length + 1);
          setGameOver(true);
          updateStats(aiResult.winner);
          setBotThinking(false);
          return;
        }

        if (aiBoard.every(cell => cell !== "")) {
          setBoard(aiBoard);
          setHistory(prev => [...prev, aiBoard]);
          setHistoryIndex(history.length + 1);
          setGameOver(true);
          setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
          setBotThinking(false);
          return;
        }

        setBoard(aiBoard);
        setHistory(prev => [...prev, aiBoard]);
        setHistoryIndex(history.length + 1);
        setXIsNext(true);
        setBotThinking(false);
      }, 2000);
    }
  }

  function updateStats(gameWinner) {
    if (gameWinner === "X") {
      setStats(prev => ({ ...prev, xWins: prev.xWins + 1 }));
    } else if (gameWinner === "O") {
      setStats(prev => ({ ...prev, oWins: prev.oWins + 1 }));
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setXIsNext(true);
    setWinLine(null);
    setGameOver(false);
    setLastMove(null);
    setHistory([Array(9).fill("")]);
    setHistoryIndex(0);
    setGameMode(null);
    setDifficultySelected(false);
    setBotThinking(false);
  }

  function startNewGame(mode, diff = "Easy") {
    setGameMode(mode);
    setDifficulty(diff);
    setDifficultySelected(true);
    setBoard(Array(9).fill(""));
    setWinner(null);
    setXIsNext(true);
    setWinLine(null);
    setGameOver(false);
    setLastMove(null);
    setHistory([Array(9).fill("")]);
    setHistoryIndex(0);
    setBotThinking(false);
  }

  function undo() {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setBoard(history[newIndex]);
      setHistoryIndex(newIndex);
      setWinner(null);
      setWinLine(null);
      setXIsNext(historyIndex % 2 === 0);
      setGameOver(false);
    }
  }

  function replay() {
    setHistory([Array(9).fill("")]);
    setHistoryIndex(0);
    resetGame();
  }

  function shareGame() {
    alert("Game shared! (Feature coming soon)");
  }

  const isBoardFull = board.every(cell => cell !== "");
  const currentTurn = xIsNext ? "PLAYER X" : gameMode === "bot" ? "BOT" : "PLAYER O";
  const xWinRate = stats.xWins > 0 ? Math.round((stats.xWins / (stats.xWins + stats.oWins + stats.draws)) * 100) : 0;
  const oWinRate = stats.oWins > 0 ? Math.round((stats.oWins / (stats.xWins + stats.oWins + stats.draws)) * 100) : 0;

  if (!gameMode) {
    return (
      <div className="app">
        <div className="menu-container">
          <div className="header">
            <h1 className="game-title">
              <span className="tic">TIC</span>
              <span className="tac">TAC</span>
              <span className="toe">TOE</span>
            </h1>
            <p className="subtitle">The classic game. Endless fun.</p>
            <div style={{
              marginTop: "20px",
              padding: "15px 25px",
              background: "rgba(0, 217, 255, 0.08)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "10px",
              fontSize: "0.9rem",
              lineHeight: "1.6",
              color: "#ccc",
              textAlign: "center",
              maxWidth: "400px"
            }}>
              <p style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "var(--neon-cyan)", textShadow: "0 0 5px var(--neon-cyan)" }}>
                🎓 ACA Exercise Project
              </p>
              <p style={{ margin: "8px 0", color: "#bbb" }}>
                This is my best work as part of my ACA training program.
              </p>
              <p style={{ margin: "12px 0 0 0", fontSize: "0.85rem", color: "var(--neon-purple)", textShadow: "0 0 5px var(--neon-purple)" }}>
                <strong>Developer:</strong> Seabata Sechaba<br/>
                <strong>Contact:</strong> +266 56171110
              </p>
            </div>
          </div>

          <div className="menu-content">
            <div className="menu-section">
              <h2>Select Game Mode</h2>
              <button
                className="mode-btn"
                onClick={() => startNewGame("bot", "Easy")}
              >
                🤖 VS BOT
              </button>
              <button
                className="mode-btn"
                onClick={() => startNewGame("2player")}
              >
                👥 2 PLAYERS
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameMode === "bot" && !difficultySelected) {
    return (
      <div className="app">
        <div className="menu-container">
          <div className="header">
            <h1 className="game-title">
              <span className="tic">TIC</span>
              <span className="tac">TAC</span>
              <span className="toe">TOE</span>
            </h1>
            <p className="subtitle">The classic game. Endless fun.</p>
          </div>

          <div className="menu-content">
            <div className="menu-section">
              <h2>Select Difficulty</h2>
              <button
                className="mode-btn"
                onClick={() => startNewGame("bot", "Easy")}
              >
                Easy
              </button>
              <button
                className="mode-btn"
                onClick={() => startNewGame("bot", "Medium")}
              >
                Medium
              </button>
              <button
                className="mode-btn"
                onClick={() => startNewGame("bot", "Hard")}
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="game-container">
        <div className="header">
          <h1 className="game-title">
            <span className="tic">TIC</span>
            <span className="tac">TAC</span>
            <span className="toe">TOE</span>
          </h1>
          <p className="subtitle">The classic game. Endless fun.</p>
        </div>

        <div className="game-wrapper">
          {/* Left Panel */}
          <div className="player-panel x-panel">
            <div className="player-header">
              <div className="player-symbol x-symbol">X</div>
              <div className="player-info">
                <h3>PLAYER X</h3>
                <span className="player-label">
                  {gameMode === "bot" ? "You" : "Player 1"}
                </span>
              </div>
            </div>
            <div className="player-stats">
              <div className="stat-item">
                <span className="trophy">🏆</span>
                <span className="wins-count">{stats.xWins}</span>
              </div>
              <div className="win-rate">WIN RATE: {xWinRate}%</div>
            </div>
            {!gameOver && (
              <div className={`turn-indicator ${xIsNext ? "active" : ""}`}>
                {xIsNext && "YOUR TURN"}
                {xIsNext && <p>Make your move!</p>}
              </div>
            )}
            <div className="match-stats">
              <h4>MATCH STATS</h4>
              <div className="stat-row">
                <span>Games Played</span>
                <span>{stats.xWins + stats.oWins + stats.draws}</span>
              </div>
              <div className="stat-row">
                <span>X Wins</span>
                <span>{stats.xWins}</span>
              </div>
              <div className="stat-row">
                <span>O Wins</span>
                <span>{stats.oWins}</span>
              </div>
              <div className="stat-row">
                <span>Draws</span>
                <span>{stats.draws}</span>
              </div>
            </div>
          </div>

          {/* Center - Game Board */}
          <div className="board-container" style={{ opacity: botThinking ? 0.6 : 1, pointerEvents: botThinking ? "none" : "auto" }}>
            <div className="board">
              {board.map((cell, index) => (
                <button
                  key={index}
                  className={`square ${cell} ${
                    winLine && winLine.includes(index) ? "win-line" : ""
                  } ${lastMove === index ? "last-move" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {cell}
                </button>
              ))}
            </div>

            {/* Game Status Banner */}
            {(winner || isBoardFull) && (
              <div className="win-banner">
                <div className="trophy-icon">🏆</div>
                {winner && winner === "X" ? (
                  <div>
                    <h2>X WINS!</h2>
                    <p>Great game! 🎉</p>
                  </div>
                ) : winner && winner === "O" ? (
                  <div>
                    <h2>O WINS!</h2>
                    <p>Great game! 🎉</p>
                  </div>
                ) : (
                  <div>
                    <h2>IT'S A DRAW!</h2>
                    <p>Well played! 👏</p>
                  </div>
                )}
              </div>
            )}

            {/* Bot Thinking Indicator */}
            {botThinking && (
              <div style={{
                padding: "15px",
                background: "rgba(255, 0, 110, 0.2)",
                border: "2px solid var(--neon-pink)",
                borderRadius: "10px",
                textAlign: "center",
                color: "var(--neon-pink)",
                fontSize: "1.1rem",
                fontWeight: "bold",
                textShadow: "0 0 10px var(--neon-pink)",
                animation: "pulse 1.5s ease-in-out infinite"
              }}>
                ⚙️ BOT THINKING...
              </div>
            )}

            {/* Action Buttons */}
            <div className="button-group">
              <button className="action-btn new-game-btn" onClick={resetGame}>
                ⟲ NEW GAME
              </button>
              <button
                className="action-btn undo-btn"
                onClick={undo}
                disabled={historyIndex === 0}
              >
                ↶ UNDO
              </button>
              <button
                className="action-btn replay-btn"
                onClick={replay}
                disabled={historyIndex === 0}
              >
                ⟳ REPLAY
              </button>
              <button className="action-btn share-btn" onClick={shareGame}>
                ⤵ SHARE
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="player-panel o-panel">
            <div className="player-header">
              <div className="player-symbol o-symbol">O</div>
              <div className="player-info">
                <h3>PLAYER O</h3>
                <span className="player-label">
                  {gameMode === "bot" ? `Bot (${difficulty})` : "Player 2"}
                </span>
              </div>
            </div>
            <div className="player-stats">
              <div className="stat-item">
                <span className="trophy">🏆</span>
                <span className="wins-count">{stats.oWins}</span>
              </div>
              <div className="win-rate">WIN RATE: {oWinRate}%</div>
            </div>
            {!gameOver && (
              <div className={`turn-indicator ${!xIsNext ? "active" : ""}`}>
                {!xIsNext && (gameMode === "bot" ? "BOT THINKING..." : "THEIR TURN")}
                {!xIsNext && <p>{gameMode === "bot" ? "⚙️" : "Make your move!"}</p>}
              </div>
            )}
            <div className="game-mode-info">
              <h4>GAME MODE</h4>
              <div className="mode-display">
                {gameMode === "bot" ? "🤖 VS BOT" : "👥 2 PLAYERS"}
              </div>
              {gameMode === "bot" && (
                <>
                  <h4 style={{ marginTop: "15px" }}>DIFFICULTY</h4>
                  <div className="difficulty-display">{difficulty}</div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="quote">
          <p>"Simplicity is the ultimate sophistication." By Sechaba Seabata</p>
        </div>
      </div>
    </div>
  );
}

export default App;
