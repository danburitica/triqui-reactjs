import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/game");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titleHome}>Bienvenidos</h1>
      <p className={styles.infoText}>
        El triqui, también conocido como ceros y cruces, tres en raya, cerito
        cruz, michi, tres en línea, cuadritos, juego del gato, gato, tatetí,
        totito, triqui traka, equis cero, tic-tac-toe o la vieja. Es un juego
        entre dos jugadores: O y X, que marcan los espacios de un tablero de 3×3
        alternadamente.
      </p>
      <p className={styles.warningText}>
        Para jugar necesitas a tu papá, mamá, hermano, hermana, amigo o amiga, a
        tu lado
      </p>
      <button className={styles.btnPlay} onClick={onClick}>
        JUGAR
      </button>
    </div>
  );
}
