import React from "react";
import styles from "./Square.module.css";
import x from "../../assets/X.png";
import o from "../../assets/O.png";

export default function Square({ value, turn, winnerSquare, onClick }) {
  const onClickSquare = () => {
    if (turn !== null && value === null) onClick();
  };

  return (
    <button className={styles.square} onClick={onClickSquare}>
      {value === "x" && (
        <img
          src={x}
          className={winnerSquare ? styles.winnerAnimation : ""}
          alt="X Symbol"
        />
      )}
      {value === "o" && (
        <img
          src={o}
          className={winnerSquare ? styles.winnerAnimation : ""}
          alt="O Symbol"
        />
      )}
    </button>
  );
}
