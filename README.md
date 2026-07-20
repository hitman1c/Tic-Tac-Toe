# 🎮 Tic Tac Toe - Advanced React Game

**Developer:** Seabata Sechaba  
**Contact:** 56171110  
**Project Type:** ACA Training Exercise  
**Live Demo:** http://localhost:5173/

---

## 📋 Project Overview

This is a **professional-grade Tic Tac Toe game** built with React, featuring:
- 🤖 **Unbeatable AI Bot** using Minimax algorithm
- ✨ **Stunning Neon UI** with cyan, pink, and purple gradients
- 🎬 **Smooth Animations** for game interactions
- 📊 **Real-time Game Statistics** tracking wins/losses
- 🎯 **Responsive Design** for all screen sizes
- 🎓 **Educational Code** demonstrating React best practices

---

## 🚀 Features

### 1. **Game Modes**
- **VS BOT** - Play against an intelligent AI opponent
- **2 PLAYERS** - Classic two-player mode

### 2. **Difficulty Levels (Bot Mode)**
- **Easy** - AI picks random optimal moves
- **Medium** - Mix of optimal and strategic moves  
- **Hard** - Unbeatable optimal strategy (100% win/draw rate)

### 3. **AI Engine**
- Uses **Minimax Algorithm** for game tree evaluation
- Evaluates all possible moves recursively
- Always finds the optimal move for any board state
- 2-second thinking time for dramatic effect
- Board becomes unclickable while bot thinks

### 4. **User Interface**
- **Neon Glow Effects** - Glowing text with color gradients
- **Responsive Layout** - 3-panel design (Player X, Board, Player O)
- **Real-time Status** - Shows whose turn it is
- **Win Banner** - Animated trophy and celebration message
- **Player Statistics** - Tracks wins, losses, and win rates

### 5. **Animations**
- **Title Glow** - Pulsing title animation
- **Piece Placement** - X spins, O rotates when placed
- **Win Line Highlight** - Purple glow on winning squares
- **Bot Thinking Indicator** - Pulsing "BOT THINKING..." message
- **Button Hover Effects** - Smooth scale and glow transitions
- **Trophy Bounce** - Bouncing trophy in win banner

### 6. **Game Actions**
- **New Game** - Start fresh game (resets to mode selection)
- **Undo** - Revert the last move
- **Replay** - Restart current game
- **Share** - (Placeholder for future implementation)

### 7. **Statistics Panel**
- Games Played counter
- X Wins / O Wins tracker
- Draw counter
- Individual win rate percentages
- Game mode display
- Bot difficulty level

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Component-based UI
- **Vite 5.4.1** - Fast build tool
- **CSS3** - Custom styling with gradients and animations
- **JavaScript ES6+** - Modern syntax and features

### State Management
- **React useState** - Game state, board, turn tracking
- **React Props** - Component data flow
- **Event Handlers** - Click and game logic

### Algorithms
- **Minimax Algorithm** - AI decision making
- **Recursive Tree Search** - Game tree evaluation
- **Score Optimization** - +10 for bot win, -10 for bot loss, 0 for draw

---

## 📁 Project Structure

```
Tic Tac Toe game/
├── src/
│   ├── App.jsx          # Main game component (600+ lines)
│   ├── App.css          # Styling with neon effects (800+ lines)
│   ├── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

---

## 🎮 How the Game Works

### Turn Flow
1. **Player X starts** by clicking any empty square
2. **Board freezes** - Board becomes 60% transparent
3. **"BOT THINKING..." appears** with pulsing animation
4. **After 2 seconds** - Bot makes its optimal move
5. **Your turn again** - Board becomes clickable, returns to full opacity

### Win Detection
- After each move, the game checks all 8 winning combinations:
  - 3 rows: [0,1,2], [3,4,5], [6,7,8]
  - 3 columns: [0,3,6], [1,4,7], [2,5,8]
  - 2 diagonals: [0,4,8], [2,4,6]
- Winning squares glow with purple animation
- Win banner displays with trophy emoji and celebration

### Draw Detection
- If all 9 squares are filled and no winner exists
- Game displays "IT'S A DRAW!" message
- Stats update accordingly

---

## 💻 Key Code Components

### State Management
```javascript
const [board, setBoard] = useState(Array(9).fill(""));
const [xIsNext, setXIsNext] = useState(true);
const [winner, setWinner] = useState(null);
const [botThinking, setBotThinking] = useState(false);
const [stats, setStats] = useState({ xWins: 12, oWins: 8, draws: 4 });
```

### Minimax Algorithm
```javascript
function minimax(squares, depth, isMaximizing) {
  const winner = calculateWinnerSilent(squares);
  
  if (winner === "O") return 10 - depth;     // Bot win
  if (winner === "X") return depth - 10;     // Bot loss
  if (isBoardFull) return 0;                 // Draw
  
  // Recursively evaluate all possible moves
  if (isMaximizing) { /* ... */ }
  else { /* ... */ }
}
```

### Win Detection
```javascript
function calculateWinner(squares) {
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}
```

### Game Logic Flow
```javascript
function handleClick(index) {
  // Prevent clicking if: square filled, winner exists, game over, bot thinking
  if (board[index] || winner || !gameMode || gameOver || botThinking) return;
  
  // Place player's move
  const newBoard = [...board];
  newBoard[index] = xIsNext ? "X" : "O";
  
  // Check for winner
  const result = calculateWinner(newBoard);
  if (result.winner) { /* Update stats and show banner */ }
  
  // Switch turn
  setXIsNext(!xIsNext);
  
  // Trigger bot move if applicable
  if (gameMode === "bot" && !nextTurn) {
    setBotThinking(true);
    setTimeout(() => {
      const aiMove = makeAIMove([...newBoard]);
      // ... bot move logic
      setBotThinking(false);
    }, 2000);
  }
}
```

---

## 🎨 UI/UX Design

### Color Scheme
- **Primary:** Cyan (#00d9ff) - X player, main accents
- **Secondary:** Pink (#ff006e) - O player, bot
- **Accent:** Purple (#b537f2) - Win states
- **Background:** Dark gradient (from #0a0e27 to #1a1a3e)

### Styling Features
- **Neon Glow** - text-shadow and box-shadow effects
- **Transparency** - rgba backgrounds for depth
- **Gradients** - Linear gradients for visual interest
- **Animations** - CSS keyframes for smooth transitions
- **Responsive** - Media queries for mobile/tablet/desktop

---

## 📊 Statistics Tracking

The game maintains persistent stats showing:
- Total games played
- X wins (Player)
- O wins (Bot)
- Draws
- Individual win rates (percentage)

Stats update automatically after each game completion.

---

## 🧪 Testing the AI

### Easy Mode
- Bot picks randomly among optimal moves
- Occasionally makes suboptimal decisions
- Still plays strategically

### Hard Mode
- Bot plays perfectly
- Can beat the player if they don't play optimally
- Draws against perfect play from opponent
- Win rate: 100% (wins or draws every game)

---

## 🔄 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:5173/
```

---

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@vitejs/plugin-react": "^4.3.1",
  "vite": "^5.4.1"
}
```

---

## 🎓 Learning Outcomes

This project demonstrates:
✅ React Hooks (useState)  
✅ Component-based architecture  
✅ State management patterns  
✅ Event handling and callbacks  
✅ Conditional rendering  
✅ Algorithm design (Minimax)  
✅ Game logic implementation  
✅ CSS animations and transitions  
✅ Responsive design  
✅ Performance optimization  

---

## 🚀 Future Enhancements

- [ ] Share game via URL
- [ ] Leaderboard system
- [ ] Move history with replay
- [ ] Sound effects
- [ ] Multiplayer online mode
- [ ] Custom themes
- [ ] Mobile app version

---

## 📝 License

This project was created as an ACA training exercise.

---

## 👤 Developer Info

**Name:** Seabata Sechaba  
**Contact:** 56171110  
**GitHub:** [hitman1c/Tic-Tac-Toe](https://github.com/hitman1c/Tic-Tac-Toe)  
**Project:** ACA Exercise - React Game Development

---

**Built with ❤️ as an ACA exercise**

## What I Learned

- How to use `useState` in React.
- How to manage application state.
- How to use arrays to represent a game board.
- How to handle button click events.
- How to use conditional rendering.
- How to check for winning conditions.
- How to build a simple interactive game using React.