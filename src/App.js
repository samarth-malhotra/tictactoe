import { useState } from "react";
let turn = "player1";
const players = { player1: "o", player2: "x" };
const togglePlayer = () => {
  if (turn === "player1") {
    turn = "player2";
  } else {
    turn = "player1";
  }
};
let isGameValid = true;
function App() {
  const [state, setState] = useState([
    { id: 0, val: " " },
    { id: 1, val: " " },
    { id: 2, val: " " },
    { id: 3, val: " " },
    { id: 4, val: " " },
    { id: 5, val: " " },
    { id: 6, val: " " },
    { id: 7, val: " " },
    { id: 8, val: " " },
  ]);
  const [status, setStatus] = useState("Game started");
  const checkForComplete = () => {
    return !(state.find((el) => el.val === "") === ;
  };
  const checkForWin = () => {
    if (
      (state[0] === state[1] && state[1] === state[2]) ||
      (state[3] === state[4] && state[4] === state[5]) ||
      (state[6] === state[7] && state[7] === state[8])
    ) {
      return true;
    } else if (
      (state[0] === state[3] && state[3] === state[6]) ||
      (state[1] === state[4] && state[4] === state[7]) ||
      (state[2] === state[5] && state[5] === state[8])
    ) {
      return true;
    } else if (
      (state[0] === state[4] && state[4] === state[8]) ||
      (state[2] === state[4] && state[4] === state[6])
    ) {
      return true;
    } else {
      return false;
    }
  };

  const playMove = function (e, el) {
    if (!el.val && isGameValid) {
      let current = [...state];
      current[el.id].val = players[turn];
      setState(current);
      let isGameComplete = checkForComplete();
      let isGameWon = checkForWin();
      if (isGameWon) {
        setStatus(`${turn} won the game 🚩`);
        isGameValid = false;
      } else {
        if (isGameComplete) {
          setStatus("Game Over");
          isGameValid = false;
        } else {
          togglePlayer();
        }
      }
    } else {
      alert("illegal move");
    }
  };
  return (
    <div className="App">
      <div className="Tictactoe">
        {state.map((el) => (
          <div onClick={(e) => playMove(e, el)} key={el.id}>
            {el.val}
          </div>
        ))}
      </div>
      <div className="Status">{status}</div>
    </div>
  );
}
export default App;
