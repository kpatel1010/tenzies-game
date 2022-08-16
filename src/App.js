import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [dice, setDice] = React.useState(allNewDice() || []);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const sameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && sameValue) {
      setTenzies(true);
    }
  }, [dice]);

  //helper function to generate new die
  function generateDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  //function return an array of 10 random numbers
  function allNewDice() {
    const newDiceArray = [];
    let n = 10;
    while (n--) {
      newDiceArray.push(generateDie());
    }
    return newDiceArray;
  }

  function rollDice(event) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateDie();
      })
    );
  }

  function freezeNumber(dieId) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      <ToastContainer />
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <section className="dice">
        {dice.map((die) => (
          <Die die={die} key={die.id} handleFreeze={freezeNumber} />
        ))}
      </section>
      {tenzies ? (
        <button className="roll" onClick={newGame}>
          New Game
        </button>
      ) : (
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      )}
    </main>
  );
}

export default App;
