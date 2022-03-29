import React, { useState, useEffect } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

import CalendarioRaceDone from "./CalendarioRaceDone.jsx";

import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ShowCarrera = styled.div`
  border-bottom: 4px solid #e8175d;
  border-right: 4px solid #e8175d;
  border-radius: 0 0 50px 0;
  padding: 0 !important;
  margin: 1rem;
  @media (min-width: 1025px) {
    max-width: 20%;
  }
  @media (max-width: 1024px) {
    max-width: 45%;
  }
  @media (max-width: 600px) {
    max-width: none;
  }

  position: relative;
`;
const RaceDoneCheck = styled.span`
  width: 50px;
  height: 50px;
  background-color: #00ff00;
  border-radius: 50%;
  position: absolute;
  right: -25px;
  bottom: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarioElement = ({ carrera }) => {
  const [apiCall] = useState(true);
  const [round] = useState(carrera.attributes.round);
  const [year] = useState(carrera.attributes.season);
  const [name] = useState(carrera.children[0].value);
  const [date] = useState(carrera.children[2].value);
  const [time] = useState(carrera.children[3].value.substring(0, 5));

  const [first_practice, guardarP1] = useState([]);
  const [second_practice, guardarP2] = useState([]);
  const [third_practice, guardarP3] = useState([]);
  const [qualification, guardarQ] = useState([]);
  const [trigger,guardarTrigger] = useState(false);

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
  console.log(today + "  ||  " + newRaceDate);
  const [resultDoneRace, guardarResultDoneRace] = useState({});
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
    if (apiCall && raceDone) {
      raceDoneFunction();
    }else{
      guardarP1([
        carrera.children[4].children[0].value,
        carrera.children[4].children[1].value,
      ]);
      guardarP2([
        carrera.children[5].children[0].value,
        carrera.children[5].children[1].value,
      ]);
      guardarP3([
        carrera.children[6].children[0].value,
        carrera.children[6].children[1].value,
      ]);
      guardarQ([
        carrera.children[7].children[0].value,
        carrera.children[7].children[1].value,
      ]);
      guardarTrigger(true);
    }
  }, [apiCall]);
  return (
    <ShowCarrera className="element_calendario col s12 m6 l6">
      <div className="row">
        <div className="col s6">
          <p className="title-s">{name}</p>
        </div>
        <div className="col s6">
          <p className="subtitle-s">{date}</p>
          <p className="subtitle-s">{getGMTTime(time)}</p>
        </div>
      </div>
      <hr className="divider-s pink"></hr>
      <table className="lista_resultados lista_resultados_calendario">
        <tbody>
          {Object.keys(resultDoneRace).length > 0 ? (
            <>
              <CalendarioRaceDone resultDoneRace={resultDoneRace} />
              <RaceDoneCheck>
                <FontAwesomeIcon
                  className="white-text"
                  icon={faCheck}
                  size="lg"
                />
              </RaceDoneCheck>
            </>
          ) : (
            qualification && qualification.length ? (
            <>
              <tr className="raceNotDone">
                <td>{qualification[0]}</td>
                <td>{getGMTTime(qualification[1].substring(0, 5))}</td>
              </tr>
              <tr className="raceNotDone">
                <td>{first_practice[0]}</td>
                <td>{getGMTTime(first_practice[1].substring(0, 5))}</td>
              </tr>
              <tr className="raceNotDone">
                <td>{second_practice[0]}</td>
                <td>{getGMTTime(second_practice[1].substring(0, 5))}</td>
              </tr>
              <tr className="raceNotDone">
                <td>{third_practice[0]}</td>
                <td>{getGMTTime(third_practice[1].substring(0, 5))}</td>
              </tr>
            </>
            ):
            (
              null
            )
            
          )}
        </tbody>
      </table>
    </ShowCarrera>
  );
};

function getGMTTime(time) {
  let hora = time.substring(0, 2);
  let min = time.substring(2, 5);
  hora++;
  if (hora === 24) {
    hora = 0;
  }
  return hora + min;
}
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
