import React from "react";
import { useParams } from "react-router";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const Noticia = () => {
  const EnlaceLateral = styled.div`
    &:hover {
      background-color: #e0e0e0;
    }
  `;
  const LimitDescription = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 15; /* number of lines to show */
    line-clamp: 15;
    -webkit-box-orient: vertical;
  `;
  const Row = styled.div`
    align-items: flex-end;
  `;

  let { postSlug } = useParams();
  let noticeNumber = 0;
  let noticeKey = "";
  let noticias = JSON.parse(localStorage.getItem("noticias")).slice(0, 6);
  const noticia = noticias.find((element) => {
    return element.title === postSlug;
  });
  noticias = noticias.filter((item) => item !== noticia);
  return (
    <div className="mi_container">
      <div className="section">
        <Row className="row reverse_wrap">
          <div className="col m4 s12 grey lighten-4">
            <p className="title-m hard-pink center"> Últimas noticias</p>
            {noticias.map((element) => {
              noticeNumber++;
              noticeKey = "noticia-" + noticeNumber;
              return (
                <EnlaceLateral key={noticeKey}>
                  <NavLink
                    className="hiden_link "
                    to={"/Noticias/" + element.title}
                  >
                    <p className="title-s">{element.title}</p>
                    <p className="subtitle-s date">
                      {element.pubDate.split(" ")[0]}
                    </p>
                  </NavLink>
                  <hr className="divider-s hard-pink-bk"></hr>
                </EnlaceLateral>
              );
            })}
            <NavLink className="right_text marginD-xl" to="/Noticias/">
              Ir a noticias <i className="tiny material-icons">arrow_forward</i>
            </NavLink>
          </div>
          <div className="col m8 s12">
            {noticia.image_url === null ? null : (
              <img
                className="img-16-9 center_container"
                src={noticia.image_url}
                alt={postSlug}
              />
            )}
            <>
              <p className="subtitle date">{noticia.pubDate}</p>
              <h1 className="justify_text hard-pink">{postSlug}</h1>
              {noticia.full_description ? (
                <LimitDescription className="body_text margin-s justify_text">
                  {noticia.full_description}
                </LimitDescription>
              ) : null}
              {!noticia.full_description && noticia.content ? (
                <LimitDescription className="body_text margin-s justify_text">
                  {noticia.content}
                </LimitDescription>
              ) : null}
              {!noticia.full_description &&
              !noticia.content &&
              noticia.description ? (
                <LimitDescription className="body_text margin-s justify_text">
                  {noticia.description}
                </LimitDescription>
              ) : null}
              <NavLink
                className="right_text marginD-xl"
                to={noticia.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver la noticia completa{" "}
                <i className="tiny material-icons">whatshot</i>
              </NavLink>
            </>
          </div>
        </Row>
      </div>
    </div>
  );
};
export default Noticia;
