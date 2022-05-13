import React, { useEffect, useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import styled from "@emotion/styled";

import MiSpinner from "./MiSpinner.jsx";

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const Encliclopedia = () => {
  const [allCallsDone, guardarAllCallsDone] = useState(false);
  const [drivers, guardarDrivers] = useState([]);
  const [constructors, guardarConstructors] = useState([]);
  const [circuits, guardarCircuits] = useState([]);
  const [seasons, guardarSeasons] = useState([]);
  useEffect(() => {
    const clienteDrivers = async () => {
      let url = `https://ergast.com/api/f1/drivers?limit=1000`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarDrivers(dataApi.children[0]);
    };
    const clienteConstructors = async () => {
      let url = `https://ergast.com/api/f1/constructors?limit=1000`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarConstructors(dataApi.children[0]);
    };
    const clienteCircuits = async () => {
      let url = `https://ergast.com/api/f1/circuits.json?limit=1000`;
      let dataApi = await axios.get(url);
      //let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCircuits(dataApi.data.MRData.CircuitTable.Circuits);
    };
    const clienteSeasons = async () => {
      let url = `https://ergast.com/api/f1/seasons?limit=1000`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarSeasons(dataApi.children[0]);
    };
    if (!allCallsDone) {
      clienteDrivers();
      clienteConstructors();
      clienteCircuits();
      clienteSeasons();
    }
  }, [allCallsDone]);
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">Enciclopedia</p>
      </div>
      {Object.keys(drivers).length > 0 &&
      Object.keys(circuits).length &&
      Object.keys(seasons).length &&
      Object.keys(constructors).length > 0 ? (
        <section>
          <h1 className="title">Pilotos</h1>
          {drivers.children.map((piloto) =>
            piloto.children[0].name === "GivenName" ? (
              <>
                <a
                  href={piloto.attributes["url"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={piloto.attributes["driverId"]}
                >
                  {piloto.children[0].value} {piloto.children[1].value}
                  <i className="tiny material-icons">whatshot</i>
                  <span className="black-txt"> | </span>
                </a>
              </>
            ) : (
              <>
                <a
                  href={piloto.attributes["url"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={piloto.attributes["driverId"]}
                >
                  {piloto.children[1].value} {piloto.children[2].value}
                  <i className="tiny material-icons">whatshot</i>
                </a>
                <span> | </span>
              </>
            )
          )}
          <h1 className="title">Constructores</h1>
          {constructors.children.map((constructor) => (
            <>
              <a
                href={constructor.attributes["url"]}
                target="_blank"
                rel="noopener noreferrer"
                key={constructor.attributes["constructorId"]}
              >
                {constructor.children[0].value}
                <i className="tiny material-icons">whatshot</i>
              </a>
              <span> | </span>
            </>
          ))}
          <h1 className="title">Circuitos</h1>
          {circuits.map((circuit) => (
            <>
              <a
                href={circuit.url}
                target="_blank"
                rel="noopener noreferrer"
                key={circuit.circuitId}
              >
                {circuit.circuitName}
                <i className="tiny material-icons">whatshot</i>
              </a>
              <span> | </span>
            </>
          ))}
          <h1 className="title">Temporadas</h1>
          {seasons.children.map((season) => (
            <>
              <a
                href={season.attributes['url']}
                target="_blank"
                rel="noopener noreferrer"
                key={season.value}
              >
                {season.value}
                <i className="tiny material-icons">whatshot</i>
              </a>
              <span> | </span>
            </>
          ))}
        </section>
      ) : (
        <CenterLoader>
          <MiSpinner />
        </CenterLoader>
      )}
    </div>
  );
};

export default Encliclopedia;
