import React, { useState, useEffect } from "react";

const NoticiasGrid = ({ allNoticias, search }) => {
  const [ultimaBusqueda, guardarUltimaBusqueda] = useState("todos");
  const [busqueda, guardarBusqueda] = useState(search);
  const [noticias, guardarNoticias] = useState(allNoticias);

  useEffect(() => {
    const searchLike = (e) => {
      guardarBusqueda(search);
      if (busqueda !== ultimaBusqueda) {
        console.log("no else");
        let newNoticias = [];
        let busquedaLower = busqueda.toLowerCase();
        let titleLower = "";
        noticias.map((noticia) => {
          titleLower = noticia.title.toLowerCase();
          if (titleLower.includes(busquedaLower) === true) {
            newNoticias.push(noticia);
          }
        });
        guardarNoticias(newNoticias);
        guardarUltimaBusqueda(busqueda);
      }else if(busqueda ==='todos'){
          
          console.log("else");
          guardarNoticias(allNoticias);
      }
    };
    searchLike();
    console.log("b: "+ busqueda + " uB: "+ ultimaBusqueda);
  }, [allNoticias, busqueda, noticias, search, ultimaBusqueda]);

  return (
    <div className="section">
      {noticias.map((noticia) => {
        return <p>{noticia.title}</p>;
      })}
    </div>
  );
};
export default NoticiasGrid;
