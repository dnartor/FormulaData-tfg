import React, { useState } from "react";

import Buscador from "../Buscador";
import NoticiasGrid from "../noticias/NoticiasGrid";
const Noticias = () => {
  
  const [busqueda, guardarBusqueda] = useState("todos");

  const [noticias, guardarNoticia] = useState(JSON.parse(localStorage.getItem("noticias")));
  
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">Noticias</p>
      </div>
      <Buscador
      guardarBusqueda={guardarBusqueda}
      />
      <NoticiasGrid
        allNoticias={noticias}
        search={busqueda}
      ></NoticiasGrid>
      {busqueda === '' ? (
        <p>hola</p>
      )
      :
      (
        <p>Adios</p>
      )
    }
    </div>
  );
};

export default Noticias;
