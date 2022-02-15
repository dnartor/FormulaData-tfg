import React, { useState } from "react";

import Buscador from "../Buscador";
const Noticias = () => {
  

 
  const [busqueda, guardarBusqueda] = useState("");


  
  
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
