import React, { useState, useEffect } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

import styled from "@emotion/styled";

const ShowCarrera = styled.div`
  border-bottom: 4px solid #e8175d;
  border-right: 4px solid #e8175d;
  border-radius: 0 0 50px 0;
  margin: 0 0.75rem 0.75rem 0.75rem;
  padding: 0 !important;
  width: 23%;
`;

const CalendarioElement = ({ carrera }) => {
  const [apiCall, guardarApiCall] = useState(true);
  const [round, guardarRound] = useState(carrera.attributes.round);
  const [year, guardarYear] = useState(carrera.attributes.season);
  const [name, guardarName] = useState(carrera.children[0].value);
  const [date, guardardate] = useState(carrera.children[2].value);
  const [time, guardarTime] = useState(
    carrera.children[3].value.substring(0, 5)
  );

  const [today] = useState(new Date());
  const [newRaceDate] = useState(
    new Date(
      date.substring(0, 4),
      date.substring(5, 7) - 1,
      date.substring(8),
      23,
      59
    )
  );

  const [raceDone] = useState(today > newRaceDate);

  const [resultDoneRace, guardarResultDoneRace] = useState({});
  const [circuitID, guardarCircuitID] = useState({});
  useEffect(() => {
    const raceDoneFunction = async () => {
      let url = `https://ergast.com/api/f1/` + year + `/` + round + `/results`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      //console.log(dataApi);
      guardarResultDoneRace(
        dataApi.children[0].children[0].children[4].children.slice(0, 3)
      );
    };
    const getCarreraID = async () => {
      let url = `http://ergast.com/api/f1/` + year + `/` + round + `/circuits`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCircuitID(dataApi.children[0].children[0].attributes.circuitId);
    };
    const getCircuitImage = async () => {
      let url = `http://ergast.com/api/f1/` + year + `/` + round + `/circuits`;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCircuitID(dataApi.children[0].children[0].attributes.circuitId);
    };
    if (apiCall && raceDone) {
      raceDoneFunction();
    }
    getCarreraID();
    getCircuitImage();
  }, [apiCall]);
  return (
    <ShowCarrera className="element_calendario">
      <div className="row">
        <div className="col s6">
          <p className="title-s">{name}</p>
        </div>
        <div className="col s6">
          <p className="subtitle-s">{date}</p>
          <p className="subtitle-s">{time}</p>
        </div>
      </div>
      <hr className="divider-s pink"></hr>
      <table className="lista_resultados lista_resultados_calendario">
      <tbody>
        {Object.keys(resultDoneRace).length > 0
          ? resultDoneRace.map((piloto) => (
            <tr key={piloto.attributes.number}>
              <td>
                {piloto.children[0].children[1].value}{" "}
                {piloto.children[0].children[2].value}
                </td>
                <td>{piloto.children[1].children[0].value}</td>
              </tr>
            ))
          : null}
          </tbody>
      </table>
    </ShowCarrera>
  );
};

/*
function removeLast2Words(str) {
  let lastIndexOfSpace = -1;
  let res = str;
  for (let i = 0; i < 2; i++) {
    lastIndexOfSpace = res.lastIndexOf(" ");

    if (lastIndexOfSpace !== -1) {
      
      res = res.substring(0, lastIndexOfSpace);
    } 
    console.log(lastIndexOfSpace);
  }

  return res;
}
*/
export default CalendarioElement;
