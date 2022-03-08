import React, { useState, useEffect } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

import MiSpinner from "../MiSpinner.jsx";

import styled from '@emotion/styled';

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const ClasificacionPilotos = () => {
  const [apiCall, guardarApiCall] = useState(true);
  const [standings, guardarStandings] = useState("");

  useEffect(() => {
    const clienteApi = async () => {
      if (apiCall === false) return;
      let url = `https://ergast.com/api/f1/current/driverStandings`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarApiCall(false);
      guardarStandings(dataApi.children[0].children[0]);
      console.log(dataApi);
    };
    clienteApi();
  });
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">Clasificación de pilotos</p>
      </div>
      <div className="section">
        <div className="row">
          <div className="col m12">
          {Object.keys(standings).length > 0 ? (
            <><p className="title">{standings.attributes.season}</p><p className="subtitle">
                Gran Premio: {standings.attributes.round}
              </p><table className="lista_resultados">
                  <tbody>
                    {standings.children.map((piloto) => (
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
                </table></>
          ) : (
            <CenterLoader>
            <MiSpinner />
          </CenterLoader>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClasificacionPilotos;
