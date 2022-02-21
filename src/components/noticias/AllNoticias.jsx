import React, { useState } from "react";

import Buscador from "../Buscador";
import NoticiasGrid from "../noticias/NoticiasGrid";
const Noticias = () => {
  const [busqueda, guardarBusqueda] = useState("todos");

  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">Noticias</p>
      </div>
      <Buscador guardarBusqueda={guardarBusqueda} />
      <NoticiasGrid search={busqueda}></NoticiasGrid>
    </div>
  );
};

export default Noticias;
