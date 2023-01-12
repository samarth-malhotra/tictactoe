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
    { id: 0, val: 0 },
    { id: 1, val: 1 },
    { id: 2, val: 2 },
    { id: 3, val: 3 },
    { id: 4, val: 4 },
    { id: 5, val: 5 },
    { id: 6, val: 6 },
    { id: 7, val: 7 },
    { id: 8, val: 8 },
  ]);
  const [status, setStatus] = useState("Game started");
  const checkForComplete = () => {
    for (let el of state) {
      if (Number.isInteger(el.val)) {
        return false;
      }
    }
    return true;
  };
  const checkForWin = () => {
    if (
      (state[0].val === state[1].val && state[1].val === state[2].val) ||
      (state[3].val === state[4].val && state[4].val === state[5].val) ||
      (state[6].val === state[7].val && state[7].val === state[8].val)
    ) {
      return true;
    } else if (
      (state[0].val === state[3].val && state[3].val === state[6].val) ||
      (state[1].val === state[4].val && state[4].val === state[7].val) ||
      (state[2].val === state[5].val && state[5].val === state[8].val)
    ) {
      return true;
    } else if (
      (state[0].val === state[4].val && state[4].val === state[8].val) ||
      (state[2].val === state[4].val && state[4].val === state[6].val)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const playMove = function (e, el) {
    if (Number.isInteger(el.val) && isGameValid) {
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
            {Number.isInteger(el.val) === false ? el.val : ""}
          </div>
        ))}
      </div>
      <div className="Status">{status}</div>
    </div>
  );
}
export default App;
