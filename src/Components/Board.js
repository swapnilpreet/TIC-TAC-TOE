import { useState, useEffect, useRef } from "react";
import "./css/Board.css"
const Board = ({ reset, setReset, winner, setWinner }) => {
  const [turn, setTurn] = useState(0);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

  const boardRef = useRef(null);

  const draw = (event, index) => {
    if (data[index - 1] === "" && winner === "") {
      // Draws X if it's player 1's turn else draws O
      const current = turn === 0 ? "X" : "O";

      // Updating the data state
      data[index - 1] = current;

      //Drawing on the board
      event.target.innerText = current;

      // Switching the turn
      setTurn(turn === 0 ? 1 : 0);
    }
  };

  useEffect(() => {
    setData(["", "", "", "", "", "", "", "", ""]); 
    const cells = boardRef.current.children;  // Getting all the cellsof the board
 console.log(cells);
    // Clearing out the board
    for (let i = 0; i < 9; i++) {
      cells[i].innerText = "";
    }
    // Resetting the turn to player 0
    setTurn(0);
    // Resetting the winner
    setWinner("");
    setReset(false);
  }, [reset, setReset, setWinner]);

  // useEffect hook used to check for a winner
  useEffect(() => {
    // Checks for the win condition in rows
    const checkRow = () => {
      let ans = false;
      for (let i = 0; i < 9; i += 3) {
        ans |=
          data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] !== "";
      }
      return ans;
    };

    // Checks for the win condition in cols
    const checkCol = () => {
      let ans = false;
      for (let i = 0; i < 3; i++) {
        ans |=
          data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] !== "";
      }
      return ans;
    };

    // Checks for the win condition in diagonals
    const checkDiagonal = () => {
      return (
        (data[0] === data[4] && data[0] === data[8] && data[0] !== "") ||
        (data[2] === data[4] && data[2] === data[6] && data[2] !== "")
      );
    };

    // Checks if at all a win condition is present
    const checkWin = () => {
      return checkRow() || checkCol() || checkDiagonal();
    };

    //Checks for a tie
    const checkTie = () => {
      let count = 0;
      data.forEach((cell) => {
        if (cell !== "") {
          count++;
        }
      });
      return count === 9;
    };
    // Setting the winner in case of a win
    if (checkWin()) {
      setWinner(turn === 0 ? "Player 2 Wins!" : "Player 1 Wins!");
    } else if (checkTie()) {
      // Setting the winner to tie in case of a tie
      setWinner("It's a Tie!");
    }
  });

  return (
    <div ref={boardRef} className="board">
      <div className="input" onClick={(e) => draw(e, 1)}></div>
      <div className="input" onClick={(e) => draw(e, 2)}></div>
      <div className="input" onClick={(e) => draw(e, 3)}></div>
      <div className="input" onClick={(e) => draw(e, 4)}></div>
      <div className="input" onClick={(e) => draw(e, 5)}></div>
      <div className="input" onClick={(e) => draw(e, 6)}></div>
      <div className="input" onClick={(e) => draw(e, 7)}></div>
      <div className="input" onClick={(e) => draw(e, 8)}></div>
      <div className="input" onClick={(e) => draw(e, 9)}></div>
    </div>
  );
};

export default Board;
