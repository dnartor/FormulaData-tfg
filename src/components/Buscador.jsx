import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Error from "./Error";
import useBusqueda from "./hooks/useBusqueda";

const Buscador = ({ guardarBusqueda }) => {
  const Searcher = styled.form`
    margin: 0 auto;
    display: flex;
  `;
  const [busqueda, SetBusqueda] = useBusqueda("Busca tu noticia", "");

  const buscarNoticia = (e) => {
    e.preventDefault();
    if (busqueda === "") {
        guardarBusqueda('todos');
      return;
    }

    guardarBusqueda(busqueda);
    console.log("guardo en Buscador:"+busqueda);
  };
  return (
    <div className="row">
      <Searcher
        onSubmit={buscarNoticia}
        className="my-buscador input-field col m6 s12 offset-m3"
      >
        <SetBusqueda />
      </Searcher>
    </div>
  );
};

export default Buscador;
