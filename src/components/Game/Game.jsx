import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Board from "../Board/Board";
import styles from "./Game.module.css";

export default function Game() {
  const [turn, setTurn] = useState("x");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winnerPositions, setWinnerPositions] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    playerOne: {
      name: "",
      symbol: "",
      winner: false,
    },
    playerTwo: {
      name: "",
      symbol: "",
      winner: false,
    },
    date: null,
  });

  const navigate = useNavigate();
  const API_URL = process.env.API_URL || "http://localhost:3001/api/games";

  useEffect(() => {
    alertNewPlayer();
  }, []);

  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const alertNewPlayer = async () => {
    const { value: playerOne } = await Swal.fire({
      title: `Ingresa el primer jugador (X)`,
      input: "text",
      inputPlaceholder: "Nombre",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "¡Debes ingresar un nombre!";
        }
      },
    });
    if (playerOne) {
      const { value: playerTwo } = await Swal.fire({
        title: `Ingresa el segundo jugador (O)`,
        input: "text",
        inputPlaceholder: "Nombre",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "¡Debes ingresar un nombre!";
          }
        },
      });
      if (playerTwo) {
        setCurrentGame({
          playerOne: {
            name: playerOne[0].toUpperCase() + playerOne.slice(1),
            symbol: "x",
            winner: false,
          },
          playerTwo: {
            name: playerTwo[0].toUpperCase() + playerTwo.slice(1),
            symbol: "o",
            winner: false,
          },
          date: new Date().toLocaleString(),
        });
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const onClick = (pos) => {
    let newSquares = [...squares];
    newSquares.splice(pos, 1, turn);
    setSquares(newSquares);

    checkWinner(newSquares);
  };

  const checkWinner = (newSquares) => {
    let winner = false;
    for (let i = 0; i < winnerLines.length; i++) {
      const [a, b, c] = winnerLines[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        winner = true;
        finalGame(newSquares[a], winnerLines[i]);
        return;
      }
    }
    if (!winner && !newSquares.includes(null)) {
      finalGame(null);
      return;
    }
    setTurn(turn === "x" ? "o" : "x");
  };

  const finalGame = (result, winnerLines) => {
    setTurn(null);
    if (result !== null) {
      setWinnerPositions(winnerLines);
      if (result === "x") {
        axios.post(API_URL, {
          ...currentGame,
          playerOne: {
            ...currentGame.playerOne,
            winner: true,
          },
        });
        alertFinalGame(
          false,
          currentGame.playerOne.name,
          currentGame.playerOne.symbol
        );
      } else {
        axios.post(API_URL, {
          ...currentGame,
          playerTwo: {
            ...currentGame.playerTwo,
            winner: true,
          },
        });
        alertFinalGame(
          false,
          currentGame.playerTwo.name,
          currentGame.playerTwo.symbol
        );
      }
    } else {
      alertFinalGame(true);
    }
  };

  const alertFinalGame = (empate, player, symbol) => {
    Swal.fire({
      title: empate
        ? "¡Hay un empate! Nadie gana la partida"
        : `${player} ganó la partida con ${symbol.toUpperCase()}`,
      text: "¿Quieres iniciar otra partida?",
      showDenyButton: true,
      confirmButtonText: "¡Vamos de nuevo!",
      denyButtonText: `Ya me aburrí :(`,
    }).then((result) => {
      if (result.isConfirmed) {
        resetGame();
      } else {
        navigate("/");
      }
    });
  };

  const resetGame = () => {
    setTurn("x");
    setSquares(Array(9).fill(null));
    setWinnerPositions([]);
    setCurrentGame({
      playerOne: {
        name: "",
        symbol: "",
        winner: false,
      },
      playerTwo: {
        name: "",
        symbol: "",
        winner: false,
      },
      date: null,
    });
    alertNewPlayer();
  };

  return (
    <div className={styles.container}>
      <div>
        {currentGame.date === null ? (
          <h1 className={styles.newGame}>Esperando Jugadores</h1>
        ) : (
          <>
            <h1 className={styles.namePlayer}>
              Jugador 1:{" "}
              <span className={styles.namePlayerSpan}>
                {currentGame.playerOne.name}
              </span>
            </h1>
            <h1 className={styles.namePlayer}>
              Jugador 2:{" "}
              <span className={styles.namePlayerSpan}>
                {currentGame.playerTwo.name}
              </span>
            </h1>
            <h1 className={styles.turn}>
              Turno Actual:{" "}
              <span className={styles.turnSpan}>
                {turn === "x"
                  ? `${
                      currentGame.playerOne.name
                    } (${currentGame.playerOne.symbol.toUpperCase()})`
                  : `${
                      currentGame.playerTwo.name
                    } (${currentGame.playerTwo.symbol.toUpperCase()})`}
              </span>
            </h1>
          </>
        )}
      </div>
      <div>
        <Board
          squares={squares}
          turn={turn}
          winnerPositions={winnerPositions}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
