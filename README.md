# Tic Tac Toe (React)

## Description

This project is a simple Tic Tac Toe game built using React. The purpose of the project is to practice using React components, state management with `useState`, event handling, conditional rendering, and basic game logic.

## Steps Followed

### 1. Create a 3 × 3 Grid
- Create a board made up of 9 squares.
- Store the board as an array with 9 elements.

### 2. Store the Board in State
- Use `useState` to keep track of the board.
- Start with an empty board.

### 3. Track the Current Player
- Use another state variable to keep track of whether it is X's or O's turn.

### 4. Define the Winning Combinations
- Create an array containing all possible winning combinations:
  - 3 rows
  - 3 columns
  - 2 diagonals

### 5. Display the Board
- Use `.map()` to display the 9 squares on the screen.

### 6. Handle Player Moves
- When a player clicks a square:
  - Check if the square is empty.
  - Place X or O.
  - Update the board.
  - Switch to the next player.

### 7. Check for a Winner
- After every move, compare the board with the winning combinations.
- If three matching symbols are found, declare the winner.

### 8. Check for a Draw
- If all squares are filled and there is no winner, display a draw message.

### 9. Display the Game Status
- Show:
  - Next Player
  - Winner
  - Draw

### 10. Reset the Game
- Add a Reset button to clear the board and start a new game.

## What I Learned

- How to use `useState` in React.
- How to manage application state.
- How to use arrays to represent a game board.
- How to handle button click events.
- How to use conditional rendering.
- How to check for winning conditions.
- How to build a simple interactive game using React.