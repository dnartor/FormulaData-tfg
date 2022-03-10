import React, { useState, useEffect } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

import MiSpinner from "../MiSpinner.jsx";

import styled from "@emotion/styled";
import { data } from "jquery";

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const ClasificacionEscuderias = () => {
  const [apiCall, guardarApiCall] = useState(true);
  const [apiCallCircuito, guardarApiCallCircuito] = useState(true);
  const [standings, guardarStandings] = useState("");
  const [circuito, guardarCircuito] = useState("");

  useEffect(() => {
    const clienteApi = async () => {
      if (apiCall === false) return;
      let url = `https://ergast.com/api/f1/current/constructorStandings`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      console.log(dataApi);
      guardarApiCall(false);
      guardarStandings(dataApi.children[0].children[0]);
    };
    const getCircuit = async () => {
      if (standings === "" || !apiCallCircuito) return;
      console.log("llego");
      let year = standings.attributes.season;
      let round = standings.attributes.round;
      let url = "https://ergast.com/api/f1/" + year + "/" + round + "/circuits";
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      console.log(dataApi);
      guardarApiCallCircuito(false);
      guardarCircuito(dataApi.children[0].children[0]);
    };

    clienteApi();
    getCircuit();
  });
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">Clasificación de escuderías</p>
      </div>
      <div className="section">
        <div className="row">
          <div className="col s12 m8 offset-m2  card grey lighten-4">
            {
            Object.keys(standings).length > 0 &&
            Object.keys(circuito).length > 0 ? (
              <>
                <p className="title center_text">
                  {circuito.children[0].value} -{" "}
                  {circuito.children[1].children[0].value}
                </p>
                <p className="subtitle center_text">
                  {standings.attributes.season}
                </p>
                <table className="lista_resultados">
                  <tbody>
                  {standings.children.map((piloto) => (
                      <tr
                        key={piloto.children[0].children[0].value}
                        className="body_text"
                      >
                        <td>
                          {piloto.children[0].children[0].value}
                        </td>
                        <td>
                          {piloto.children[0].children[1].value}
                        </td>
                        <td>{piloto.attributes.points} PTS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
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

export default ClasificacionEscuderias;
