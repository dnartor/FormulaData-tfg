import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import XMLParser from "react-xml-parser";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import NoticiasHome from "./NoticiasHome.jsx";
import MiSpinner from "./MiSpinner.jsx";
import { NavLink } from "react-router-dom";

const HalfCard = styled.div`
  margin-bottom: 48px;

  @media (max-width: 1024px) {
    margin-bottom: 79px;
  }
  @media (max-width: 768px) {
    margin-bottom: 52px;
    & .body_text {
      font-size: 12px;
    }
    & td {
      text-align: center;
    }
    & .title {
      font-size: 23px;
    }
  }
`;
const LeftCard = styled.div`
  @media (max-width: 768px) {
    & .body_text {
      font-size: 12px;
    }
    & td {
      text-align: center;
    }
  }
`;
const Preview = styled.div`
  min-height: 114px;
  @media (max-width: 1024px) {
    min-height: 78px;
  }
  @media (max-width: 768px) {
    min-height: 70px;
  }
`;
const CardLink = styled(NavLink)`
  text-align: right;
  display: block;
  margin-top: 32px;
`;
const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const Home = () => {
  const [apiCall, guardarApiCall] = useState(true);
  const [raceName, guardarRaceName] = useState("");
  const [date, guardarDate] = useState("");
  const [resultList, guardarResultList] = useState([]);
  const [currentStanding, guardarCurrentStanding] = useState([]);
  const [currentConstructorStanding, guardarCurrentConstructorStanding] =
    useState([]);
  const apiKey = "pub_4219973489f9fd3dcf5d2e8be0f5b30fe9d9";
  const [noticias, guardarNoticias] = useState([]);

  useEffect(() => {
    const clienteApi = async () => {
      if (apiCall === false) return;
      let url = `https://ergast.com/api/f1/current/last/results`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarApiCall(false);
      guardarRaceName(dataApi.children[0].children[0].children[0].value);
      guardarDate(dataApi.children[0].children[0].children[2].value);
      guardarResultList(dataApi.children[0].children[0].children[4].children);

      url = `https://ergast.com/api/f1/current/driverStandings`;
      resultado = await axios.get(url);
      dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCurrentStanding(
        dataApi.children[0].children[0].children.slice(0, 7)
      );

      url = `https://ergast.com/api/f1/current/constructorStandings`;
      resultado = await axios.get(url);
      dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCurrentConstructorStanding(
        dataApi.children[0].children[0].children.slice(0, 7)
      );
      url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=Formula%201&language=en&category=sports`;
      resultado = await axios.get(url);
      resultado = resultado.data.results;
      guardarNoticias(resultado);
      //guardarNoticias(resultado);
    };
    clienteApi();
    if(Object.keys(noticias).length > 0){
      localStorage.setItem("noticias", JSON.stringify(noticias));
    }
  });

  return (
    <div className="mi_container">
      <div className="section">
        <div className="row">
          <div className="col s12 m6">
            <LeftCard className="card grey lighten-4">
              <Preview>
                <p className="title">{raceName}</p>
                <p className="subtitle">{date}</p>
              </Preview>
              <table className="lista_resultados">
                <tbody>
                  {resultList.map((piloto) => (
                    <tr key={piloto.attributes.number} className="body_text">
                      <td>
                        {piloto.children[0].children[1].value}{" "}
                        {piloto.children[0].children[2].value}
                      </td>
                      <td>{piloto.children[1].children[0].value}</td>
                      <td>
                        {piloto.children[4].value === "Finished"
                          ? piloto.children[5].value
                          : piloto.children[4].value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </LeftCard>
          </div>
          <div className="col s12 m6">
            <div className="card grey lighten-4">
              <HalfCard>
                <Preview>
                  <p className="title">Clasificación de pilotos</p>
                </Preview>
                <table className="lista_resultados">
                  <tbody>
                    {currentStanding.map((piloto) => (
                      <tr
                        key={piloto.children[0].children[0].value}
                        className="body_text"
                      >
                        <td>
                          {piloto.children[0].children[1].value}{" "}
                          {piloto.children[0].children[2].value}
                        </td>
                        <td>{piloto.children[1].children[0].value}</td>
                        <td>{piloto.attributes.points} PTS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <CardLink to="/clasificacion-pilotos">
                  Ir a clasificación de pilotos
                  <i className="tiny material-icons">arrow_forward</i>
                </CardLink>
              </HalfCard>
              <hr className="divider-s"></hr>
              <HalfCard>
                <Preview>
                  <p className="title">Clasificación de escuderías</p>
                </Preview>
                <table className="lista_resultados">
                  <tbody>
                    {currentConstructorStanding.map((constructora) => (
                      <tr
                        key={constructora.children[0].attributes.constructorId}
                        className="body_text"
                      >
                        <td>{constructora.children[0].children[0].value}</td>
                        <td>{constructora.children[0].children[1].value}</td>
                        <td>{constructora.attributes.points} PTS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <CardLink to="/clasificacion-escuderias">
                  Ir a clasificación de escuderías
                  <i className="tiny material-icons">arrow_forward</i>
                </CardLink>
              </HalfCard>
            </div>
          </div>
        </div>
      </div>
      <hr className="divider-l"></hr>
      <section>
        {Object.keys(noticias).length > 0 ? (
          <NoticiasHome noticias={noticias} />
        ) : (
          <CenterLoader>
            <MiSpinner />
          </CenterLoader>
        )}
      </section>
      <hr className="divider-l"></hr>
      <section>
        <div className="header_container">
          <p className="header">Social</p>
        </div>
        <div className="row_socialHome_center">
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="MercedesAMGF1"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="redbullracing"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="ScuderiaFerrari"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
        </div>
        <div className="row_socialHome_center">
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="McLarenF1"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="AlpineF1Team"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="AlphaTauriF1"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
        </div>
        <div className="row_socialHome">
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="AstonMartinF1"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="alfaromeoorlen"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="WilliamsRacing"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
          <div className="socialHome">
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="HaasF1Team"
              options={{ height: 350, tweetsLimit: 1 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
