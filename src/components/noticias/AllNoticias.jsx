import axios from "axios";
import React, { useEffect, useState } from "react";

import Buscador from "../Buscador";
const Noticias = () => {
  

  const [apiCall, guardarApiCall] = useState(true);
  const apiKey = "pub_4219973489f9fd3dcf5d2e8be0f5b30fe9d9";
  const [noticias, guardarNoticias] = useState([]);
  const [busqueda, guardarBusqueda] = useState("");


  useEffect(() => {
    const clienteApi = async () => {
      if (apiCall === false) return;

      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=Formula%201&language=en&category=sports`;
      let resultado = await axios.get(url);
      resultado = resultado.data.results;
      guardarNoticias(resultado.slice(0, 3));
      //guardarNoticias(resultado);
    };
    //clienteApi();
  });

  
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">Noticias</p>
      </div>
      <Buscador
      guardarBusqueda={guardarBusqueda}
      />
    </div>
  );
};

export default Noticias;
