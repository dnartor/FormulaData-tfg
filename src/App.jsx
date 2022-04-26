import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "animate.css";
import M from "materialize-css";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import Home from "./components/Home.jsx";
import Clasificacion from "./components/Clasificacion";
import ClasificacionPilotos from "./components/clasificaciones/ClasificacionPilotos";
import ClasificacionEscuderias from "./components/clasificaciones/ClasificacionEscuderias";
import Calendario from "./components/calendario/Calendario.jsx";
import Carrera from "./components/singleRace/Carrera";
import AllCalendario from "./components/calendario/AllCalendario";
import Enciclopedia from "./components/Enciclopedia.jsx";
import Noticias from "./components/noticias/Noticias.jsx";
import Noticia from "./components/noticias/Noticia.jsx";
import AllNoticias from "./components/noticias/AllNoticias.jsx";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
//import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab);

document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
});

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
          <Route
            path="/clasificacion-pilotos"
            element={<ClasificacionPilotos />}
          />
          <Route
            path="/clasificacion-escuderias"
            element={<ClasificacionEscuderias />}
          />
          <Route path="/calendario" element={<AllCalendario />}>
            <Route path="" element={<Calendario />} />
            <Route path=":name/:round/:year/:done" element={<Carrera />} />
          </Route>
          <Route path="/enciclopedia" element={<Enciclopedia />} />
          <Route path="/noticias" element={<Noticias />}>
            <Route path="" element={<AllNoticias />} />
            <Route path=":postSlug" element={<Noticia />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
