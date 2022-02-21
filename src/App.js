import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/Game/Game";
import NavbarTriqui from "./components/NavbarTriqui/NavbarTriqui";
import HistoryTable from "./components/History/History";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="mainContainer">
      <NavbarTriqui />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game" element={<Game />} />
        <Route path="history" element={<HistoryTable />} />
      </Routes>
    </div>
  );
}

export default App;
