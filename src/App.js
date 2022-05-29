import { useState } from "react";
import "./App.css";
import Board from "./Components/Board";
import PlayerInfo from "./Components/PlayerInfo";

function App() {
  const [reset, setReset] = useState(false);
  const [winner, setWinner] = useState("");

  const resetBoard = () => {
    setReset(true);
  };
  return (
    <div className="App">
      <div className={`winner ${winner !== "" ? "" : "no"}`}>
        <div className="winner-text">{winner}</div>

        <button onClick={() => resetBoard()}>Reset Board</button>
      </div>
      <Board
        reset={reset}
        setReset={setReset}
        winner={winner}
        setWinner={setWinner}
      />
      <PlayerInfo />
    </div>
  );
}

export default App;
