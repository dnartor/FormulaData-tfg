import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import noImagen from "../../assets/noImage_notice.jpg";

import MiSpinner from "../MiSpinner.jsx";

const NoticiasGrid = ({ search }) => {
  const CenterLoader = styled.div`
    display: flex;
    justify-content: center;
    height: 350px;
    align-items: center;
  `;

  const [ultimaBusqueda, guardarUltimaBusqueda] = useState("todos");
  const [busqueda, guardarBusqueda] = useState(search);
  const [allNoticias, guardarAllNoticias] = useState([]);
  const [noticias, guardarNoticias] = useState([]);
  const [apiCall, guardarApiCall] = useState(true);
  const apiKey = "pub_4219973489f9fd3dcf5d2e8be0f5b30fe9d9";

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;
  

  useEffect(() => {
    const clienteApi = async () => {
      if (apiCall === false) return;
      guardarApiCall(false);
      let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=Formula%201&language=en&category=sports`;
      let resultado = await axios.get(url);
      resultado = resultado.data.results;
      guardarNoticias(resultado);
      guardarAllNoticias(resultado);
      //guardarNoticias(resultado);
    };
    clienteApi();
    localStorage.setItem("noticias", JSON.stringify(allNoticias));

    const searchLike = (e) => {
     
      guardarBusqueda(search);

      if (busqueda !== ultimaBusqueda && busqueda !== "todos") {
        setItemOffset(0);

        let newNoticias = [];
        let busquedaLower = busqueda.toLowerCase();
        let titleLower = "";
        // eslint-disable-next-line array-callback-return
        allNoticias.map((noticia) => {
          titleLower = noticia.title.toLowerCase();
          if (titleLower.includes(busquedaLower) === true) {
            newNoticias.push(noticia);
          }
        });
        if (newNoticias <= 0) {
          guardarNoticias(["vacio"]);
        } else {
          guardarNoticias(newNoticias);
        }
      } else if (busqueda === "todos") {
        guardarNoticias(allNoticias);
        
      }
      guardarUltimaBusqueda(busqueda);

    };
    searchLike();

  }, [search,busqueda,ultimaBusqueda]);

  useEffect(() => {
    const paginate = async () => {
      if (noticias[0] === 'vacio') return;
      setPageCount(Math.ceil(noticias.length / itemsPerPage));
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(noticias.slice(itemOffset, endOffset));
    };
    paginate();
    
    
  },[itemOffset,noticias]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % noticias.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="section">
      {noticias.length <= 0 ? (
        <CenterLoader>
          <MiSpinner />
        </CenterLoader>
      ) : (
        <>
          <div className="row">
            <Items currentItems={currentItems} />
          </div>
          {pageCount > 1 ? (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="paginacion"
              activeLinkClassName="paginacionActiva"
            />
          ) : null}
        </>
      )}
    </div>
  );
};
function Items({ currentItems }) {
  const Imagen = styled.img`
    object-fit: cover;
    aspect-ratio: 16/9;
    max-width: 100%;
  `;
  const LimitDescription = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  `;
  const Title = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;
  `;
  /*
  const Link = styled(NavLink)`
    display: block;
    text-align: center;
    margin-bottom: 32px;
  `;
  */

  if (currentItems[0] !== "vacio") {
    let noticeNumber = 0;
    let noticeKey = "";

    return (
      <>
        {currentItems &&
          currentItems.map((item) => {
            noticeNumber++;
            noticeKey = "noticia-" + noticeNumber;
            return (
              <div key={noticeKey} className="col s12 m6">
                {item.image_url === null ? (
                  <NavLink
                    className="hiden_link"
                    to={"/noticias/" + item.title}
                  >
                    <Imagen src={noImagen} alt={item.title} />
                  </NavLink>
                ) : (
                  <NavLink
                    className="hiden_link"
                    to={"/noticias/" + item.title}
                  >
                    <Imagen src={item.image_url} alt={item.title} />
                  </NavLink>
                )}
                <p className="subtitle-s date-s">
                  {item.pubDate.split(" ")[0]}
                </p>
                <NavLink className="" to={"/noticias/" + item.title}>
                  <Title className="title-s">{item.title}</Title>
                </NavLink>
                <LimitDescription className="body_text-s">
                  {item.description}
                </LimitDescription>
              </div>
            );
          })}
      </>
    );
  } else {
    return <p>No se han encontrado resultados</p>;
  }
}
export default NoticiasGrid;
