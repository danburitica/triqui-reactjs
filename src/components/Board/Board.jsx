import React from "react";
import { Container, Row } from "react-bootstrap";
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
    <Container>
      <Row>{renderSquare([0, 1, 2])}</Row>
      <Row>{renderSquare([3, 4, 5])}</Row>
      <Row>{renderSquare([6, 7, 8])}</Row>
    </Container>
  );
}
