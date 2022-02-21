import React from "react";
import styles from "./Board.module.css";
import Square from "../Square/Square";

export default function Board({ squares, turn, winnerPositions, onClick }) {
  const renderSquare = (positions) =>
    positions.map((pos) => (
      <Square
        value={squares[pos]}
        turn={turn}
        winnerSquare={winnerPositions.includes(pos)}
        onClick={() => onClick(pos)}
        key={pos}
      />
    ));

  return (
    <div className={styles.board}>
      <div className={styles.row}>{renderSquare([0, 1, 2])}</div>
      <div className={styles.row}>{renderSquare([3, 4, 5])}</div>
      <div className={styles.row}>{renderSquare([6, 7, 8])}</div>
    </div>
  );
}
