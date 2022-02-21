import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function History() {
  const API_URL = process.env.API_URL || "http://localhost:3001/api/games";
  const [games, setGames] = useState([]);

  useEffect(() => {
    getHistoryGames();
  }, []);

  const getHistoryGames = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setGames(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Fecha del Juego</th>
          <th>¡El ganador!</th>
          <th>Perdedor :(</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr key={game._id}>
            <td>{game.date}</td>
            <td>
              {game.playerOne.winner
                ? `${
                    game.playerOne.name
                  } (${game.playerOne.symbol.toUpperCase()})`
                : `${
                    game.playerTwo.name
                  } (${game.playerTwo.symbol.toUpperCase()})`}
            </td>
            <td>
              {!game.playerOne.winner
                ? `${
                    game.playerOne.name
                  } (${game.playerOne.symbol.toUpperCase()})`
                : `${
                    game.playerTwo.name
                  } (${game.playerTwo.symbol.toUpperCase()})`}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}