import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "animate.css";

import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Clasificacion from "./components/Clasificacion";
import Calendario from "./components/Calendario.jsx";
import Circuitos from "./components/Circuitos.jsx";
import Enciclopedia from "./components/Enciclopedia.jsx";
import Noticias from "./components/Noticias.jsx";

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clasificacion" element={<Clasificacion />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/circuitos" element={<Circuitos />} />
          <Route path="/encliclopedia" element={<Circuitos />} />
          <Route path="/enciclopedia" element={<Enciclopedia />} />
          <Route path="/noticias" element={<Noticias />} />
        </Routes>
      </main>
      <footer></footer>
    </Router>
  );
}
export default App;
