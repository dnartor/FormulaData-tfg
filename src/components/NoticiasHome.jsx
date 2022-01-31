import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const NoticiasHome = ({ noticias }) => {
  const Link = styled.a`
    display: block;
    text-align: center;
  `;
  const Imagen = styled.img`
    object-fit: cover;
    aspect-ratio: 16/9;
    max-width: 100%;
  `;

  /*
  const apiKey = "269ad4947b6a41e498d9960f01643530";
  const [apiCall, guardarApiCall] = useState(true);

  const [noticias, guardarNoticias] = useState([]);

  useEffect(() => {
    const clienteApi = async () => {
      console.log("entro");
      if (apiCall === false) return;
      console.log("entro2");

      let url = `https://newsapi.org/v2/everything?domains=formula1.com&apiKey=${apiKey}`;
      let resultado = await axios.get(url);
      resultado = resultado.data.articles;
      guardarNoticias(resultado.slice(0, 3));
      guardarApiCall(false);
      console.log(noticias[0].title);
      /*
        <Imagen src={noticias[0].urlToImage} alt={noticias[0].title} />
        <p className="title">{noticias[0].title}</p>
        
      //let dataApi = new XMLParser().parseFromString(resultado.data);
    };
    clienteApi();
  }, [noticias]);

  {noticias.length>0 ? 
            <h1><Fragment>
            <div className="col m8 s12">
            <Imagen src={noticias[0].urlToImage} alt={noticias[0].title} />
            <p className="title">{noticias[0].title}</p>
                
            </div>
            <div className="col m4 s12">
              <div className="row"></div>
              <div className="row"></div>
            </div>
            </Fragment></h1>
         : <h1>NO</h1>}
  */
  return (
    <div className="row">
      <div className="col m12">
        <Link href="/Noticias/">
          Ir a noticias<i className="tiny material-icons">arrow_forward</i>
        </Link>
        <div className="col m8 s12">
          <Imagen src={noticias[0].urlToImage} alt={noticias[0].title} />
          <p className="title">{noticias[0].title}</p>
        </div>
        <div className="col m4 s12">
          <div className="row"></div>
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default NoticiasHome;
