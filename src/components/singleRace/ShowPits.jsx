import React, { useState, useEffect } from "react";

import MiSpinner from "../MiSpinner.jsx";

import styled from "@emotion/styled";

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const ShowPits = ({ raceDonePits, raceDoneDrivers }) => {
  raceDonePits.children[4].children.sort(function (a, b) {
    return a.attributes.duration - b.attributes.duration;
  });
  let actualDriver = {};

  const actualDriverUpdate = (id) => {
    //guardarActualDriver(raceDoneDrivers.filter(function(raceDoneDrivers){return raceDoneDrivers.attributes.code === id}));
    actualDriver = raceDoneDrivers.find((raceDoneDrivers) => {
      return raceDoneDrivers.children[0].attributes.driverId === id;
    });
  };
  return Object.keys(raceDonePits).length > 0 ? (
    <table className="showRaceResTable striped centered">
      <thead>
        <tr>
          <th>Parada</th>
          <th>Piloto</th>
          <th>Escuderia</th>
          <th>Nº</th>
          <th>Vuelta</th>
          <th>Tiempo de carrera</th>
          <th>Tiempo</th>
        </tr>
      </thead>

      <tbody>
        {raceDonePits.children[4].children.map((piloto) => (
          <tr key={piloto.attributes.driverId + "-" + piloto.attributes.stop}>
            {actualDriverUpdate(piloto.attributes.driverId)}
            <td>{piloto.attributes.stop}</td>
            <td>
              {actualDriver.children[0].children[1].value +
                " " +
                actualDriver.children[0].children[2].value}
            </td>
            <td>{actualDriver.children[1].children[0].value}</td>
            <td>{actualDriver.children[0].children[0].value}</td>
            <td>{piloto.attributes.lap}</td>
            <td>{piloto.attributes.time}</td>
            <td>{piloto.attributes.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <CenterLoader>
      <MiSpinner />
    </CenterLoader>
  );
};

export default ShowPits;
