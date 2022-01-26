import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import XMLParser from "react-xml-parser";

const CardLink = styled.a`
  text-align: right;
  display:block;
`;

const Home = () => {
  const [apiCall, guardarApiCall] = useState(true);
  const [raceName, guardarRaceName] = useState("");
  const [date, guardarDate] = useState("");
  const [resultList, guardarResultList] = useState([]);
  const [currentStanding, guardarCurrentStanding] = useState([]);
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
        dataApi.children[0].children[0].children.slice(0, 5)
      );
    };
    clienteApi();
  });

  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 m5 ">
            <div className="card grey lighten-4">
              <p className="title">{raceName}</p>
              <p className="subtitle">{date}</p>
              <table className="lista_resultados">
                <tbody>
                  {resultList.map((piloto) => (
                    <tr key={piloto.attributes.number} className="body_text">
                      <td>
                        {piloto.children[0].children[1].value}{" "}
                        {piloto.children[0].children[2].value}
                      </td>
                      <td>{piloto.children[1].children[0].value}</td>
                      <td>{piloto.children[5].value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col s12 m5 offset-m2">
            <div className="card grey lighten-4">
              <div className="half_height">
                <p className="title">Clasificación de pilotos</p>
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
                        <td>{piloto.children[1].children[0].value}</td>
                        <td>{piloto.attributes.points} PTS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <CardLink href="/clasificacion-pilotos">
                  Ir a clasificación de pilotos
                  <i className="tiny material-icons">arrow_forward</i>
                </CardLink>
              </div>
              <hr className="divider-s"></hr>
              <div className="half_height">
                <p className="title">Clasificación de escuderías</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="divider-l"></hr>
    </div>
  );
};

export default Home;
