import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import XMLParser from "react-xml-parser";

import ShowRaceRes from "./ShowRaceRes";
import ShowPits from "./ShowPits";
import ShowQuali from "./ShowQuali";
import ShowLaps from "./ShowLaps";

const Carrera = () => {
  let { name } = useParams();
  let { round } = useParams();
  let { year } = useParams();
  let { done } = useParams();
  const [activeRes, guardarActiveRes] = useState(true);
  const [activePits, guardarActivePits] = useState(false);
  const [activeParrilla, guardarActiveParrilla] = useState(false);
  const [activeQuali, guardarActiveQuali] = useState(false);
  const [activeFastLaps, guardarActiveFastLaps] = useState(false);

  const [raceDoneInfo, guardarRaceDoneInfo] = useState({});
  const [raceDonePits, guardarRaceDonePits] = useState({});
  const [raceDoneDrivers, guardarRaceDoneDrivers] = useState([]);
  const [raceQuali, guardarQuali] = useState([]);

  useEffect(() => {
    const clienteApi = async () => {
      let url = `https://ergast.com/api/f1/` + year + "/" + round + "/results";
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarRaceDoneDrivers(dataApi.children[0].children[0].children[4].children);
      guardarRaceDoneInfo(dataApi.children[0].children[0]);
    };
    const clienteApiPits = async () => {
      let url = `https://ergast.com/api/f1/` + year + "/" + round + "/pitstops";
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarRaceDonePits(dataApi.children[0].children[0]);
    };
    const clienteApiQuali = async () => {
      let url = `https://ergast.com/api/f1/` + year + "/" + round + "/qualifying";
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarQuali(dataApi.children[0].children[0]);
    };
    if (done === "true") {
      clienteApi();
      clienteApiPits();
      clienteApiQuali();
      
    }
  }, [done]);

  function resetAction(active) {
    guardarActiveRes(false);
    guardarActivePits(false);
    guardarActiveQuali(false);
    guardarActiveFastLaps(false);
    switch (active) {
      case "res":
        guardarActiveRes(true);
        break;
      case "pits":
        guardarActivePits(true);
        break;
      case "quali":
        guardarActiveQuali(true);
        break;
      case "laps":
        guardarActiveFastLaps(true);
        break;
      default:
    }
  }
  /*
  function actionRes() {
    resetAction();
    guardarActiveRes(true);
  }
  function actionPits() {
  }
  function actionParrilla() {
    resetAction();
    guardarActiveParrilla(true);
  }
  function actionQuali() {
    resetAction();
    guardarActiveQuali(true);
  }
  function actionFastLaps() {
    resetAction();
    guardarActiveFastLaps(true);
  }
  */
  function buttonsHandler() {
    switch (true) {
      case activeRes:
        return (
          <>
            <button
              className="activeRaceView"
              onClick={() => resetAction("res")}
            >
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>Clasificación</button>
            <button onClick={() => resetAction("laps")}>Vueltas rápidas</button>
          </>
        );
      case activePits:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button
              className="activeRaceView"
              onClick={() => resetAction("pits")}
            >
              PitStops
            </button>
            <button onClick={() => resetAction("quali")}>Clasificación</button>
            <button onClick={() => resetAction("laps")}>Vueltas rápidas</button>
          </>
        );
      case activeParrilla:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>Clasificación</button>
            <button onClick={() => resetAction("laps")}>Vueltas rápidas</button>
          </>
        );
      case activeQuali:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button
              className="activeRaceView"
              onClick={() => resetAction("quali")}
            >
              Clasificación
            </button>
            <button onClick={() => resetAction("laps")}>Vueltas rápidas</button>
          </>
        );
      case activeFastLaps:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>Clasificación</button>
            <button
              className="activeRaceView"
              onClick={() => resetAction("laps")}
            >
              Vueltas rápidas
            </button>
          </>
        );
      default:
        return (
          <>
            <button
              className="activeRaceView"
              onClick={() => resetAction("res")}
            >
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>Clasificación</button>
            <button onClick={() => resetAction("laps")}>Vueltas rápidas</button>
          </>
        );
    }
  }

  function showButton() {
    switch (true) {
      case activeRes:
        return <ShowRaceRes raceDoneInfo={raceDoneInfo} />;
      case activePits:
        return <ShowPits raceDonePits={raceDonePits} raceDoneDrivers={raceDoneDrivers} />;
      case activeQuali:
        return <ShowQuali raceQuali={raceQuali}/>;
      case activeFastLaps:
        return <ShowLaps raceDoneInfo={raceDoneInfo} />;
      default:
        return <ShowRaceRes />;
    }
  }
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">{name}</p>
      </div>
      <div className="section">
        {done === "true" ? (
          <div className="row normal_wrap">
            <div className="col m4 s12 card grey lighten-4 raceButtons">
              {buttonsHandler()}
            </div>
            <div className="col m8 s12 column_scrollable">{showButton()}</div>
          </div>
        ) : (
          <p>Race not done</p>
        )}
      </div>
    </div>
  );
};

export default Carrera;
