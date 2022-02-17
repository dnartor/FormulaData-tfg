import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

import noImagen from "../assets/noImage_notice.jpg";

const NoticiasHome = ({ noticias }) => {
  const Link = styled.a`
    display: block;
    text-align: center;
    margin-bottom: 32px;
  `;
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
      <div className="header_container">
        <p className="header">Noticias</p>
      </div>
      <div className="col m12">
        <div className="col m8 s12">
          {noticias[0].image_url === null ? (
            <NavLink className="hiden_link" to={"/noticias/" + noticias[0].title}>
              <Imagen src={noImagen} alt={noticias[0].title} />
            </NavLink>
          ) : (
            <NavLink className="hiden_link" to={"/noticias/" + noticias[0].title}>
              <Imagen src={noticias[0].image_url} alt={noticias[0].title} />
            </NavLink>
          )}
          <p className="subtitle date">{noticias[0].pubDate.split(" ")[0]}</p>
          <NavLink className="hiden_link" to={"/noticias/" + noticias[0].title}>
            <p className="title">{noticias[0].title}</p>
          </NavLink>
          <p className="body_text">{noticias[0].description}</p>
        </div>
        <div className="col m4 s12">
          <div className="row">
            {noticias[1].image_url === null ? (
              <Imagen src={noImagen} alt={noticias[1].title} />
            ) : (
              <Imagen src={noticias[1].image_url} alt={noticias[1].title} />
            )}
            <p className="subtitle-s date-s">
              {noticias[1].pubDate.split(" ")[0]}
            </p>
            <NavLink className="" to={"/noticias/" + noticias[1].title}>
              <p className="title-s">{noticias[1].title}</p>
            </NavLink>
            <LimitDescription className="body_text-s">
              {noticias[1].description}
            </LimitDescription>
          </div>
          <div className="row">
            {noticias[2].image_url === null ? (
              <Imagen src={noImagen} alt={noticias[2].title} />
            ) : (
              <Imagen src={noticias[2].image_url} alt={noticias[2].title} />
            )}
            <p className="subtitle-s date-s">
              {noticias[2].pubDate.split(" ")[0]}
            </p>
            <NavLink className="hiden_link" to={"noticias/" + noticias[2].title}>
              <p className="title-s">{noticias[2].title}</p>
            </NavLink>
            <LimitDescription className="body_text-s">
              {noticias[2].description}
            </LimitDescription>
          </div>
        </div>
        <NavLink to="/noticias/">
          Ir a noticias<i className="tiny material-icons">arrow_forward</i>
        </NavLink>
      </div>
    </div>
  );
};

export default NoticiasHome;
