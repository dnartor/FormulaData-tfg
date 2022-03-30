import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  function resetAction(active) {
    guardarActiveRes(false);
    guardarActivePits(false);
    guardarActiveParrilla(false);
    guardarActiveQuali(false);
    guardarActiveFastLaps(false);
    switch (active) {
      case "res":
        guardarActiveRes(true);
        break;
      case "pits":
        guardarActivePits(true);
        break;
      case "parrilla":
        guardarActiveParrilla(true);
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
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("parrilla")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>PitStops</button>
            <button onClick={() => resetAction("laps")}>PitStops</button>
          </>
        );
      case activePits:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("parrilla")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>PitStops</button>
            <button onClick={() => resetAction("laps")}>PitStops</button>
          </>
        );
      case activeParrilla:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("parrilla")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>PitStops</button>
            <button onClick={() => resetAction("laps")}>PitStops</button>
          </>
        );
      case activeQuali:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("parrilla")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>PitStops</button>
            <button onClick={() => resetAction("laps")}>PitStops</button>
          </>
        );
      case activeFastLaps:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("parrilla")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>PitStops</button>
            <button onClick={() => resetAction("laps")}>PitStops</button>
          </>
        );
      default:
        return (
          <>
            <button onClick={() => resetAction("res")}>
              Resultados de carrera
            </button>
            <button onClick={() => resetAction("pits")}>PitStops</button>
            <button onClick={() => resetAction("parrilla")}>PitStops</button>
            <button onClick={() => resetAction("quali")}>PitStops</button>
            <button onClick={() => resetAction("laps")}>PitStops</button>
          </>
        );
    }
  }
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">{name}</p>
      </div>
      <div className="section">
        <div className="row reverse_wrap">
          <div className="col m4 s12 grey lighten-4">{buttonsHandler()}</div>
          <div className="col m8 s12 red lighten-4">hola 2</div>
        </div>
      </div>
    </div>
  );
};

export default Carrera;
