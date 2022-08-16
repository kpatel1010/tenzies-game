import React from "react";
import "./Die.css";

const Die = (props) => {
  const dieBgColor = props.die.isHeld ? "freeze-bg" : "unfreeze-bg";
  return (
    <div
      className={`die-face ${dieBgColor}`}
      onClick={() => props.handleFreeze(props.die.id)}
    >
      <h2>{props.die.value}</h2>
    </div>
  );
};

export default Die;
