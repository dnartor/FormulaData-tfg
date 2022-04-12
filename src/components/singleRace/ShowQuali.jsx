import React from "react";

import MiSpinner from "../MiSpinner.jsx";

import styled from "@emotion/styled";

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const ShowQuali = ({ raceQuali }) => {
  return Object.keys(raceQuali).length > 0 ? (
    <table className="showRaceResTable striped centered">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Piloto</th>
          <th>Escudería</th>
          <th>Nº</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
        </tr>
      </thead>

      <tbody>
        {raceQuali.children[4].children.map((piloto) => (
          <tr key={piloto.attributes.position}>
            <td>{piloto.attributes.position}</td>
            <td>
              {piloto.children[0].children[1].value +
                " " +
                piloto.children[0].children[2].value}
            </td>
            <td>{piloto.children[1].children[0].value}</td>
            <td>{piloto.attributes.number}</td>
            {piloto.children[2] !== undefined ? (
              <td>{piloto.children[2].value}</td>
            ) : (
              <td> - </td>
            )}
            {piloto.children[3] !== undefined ? (
              <td>{piloto.children[3].value}</td>
            ) : (
              <td> - </td>
            )}
            {piloto.children[4] !== undefined ? (
              <td>{piloto.children[4].value}</td>
            ) : (
              <td> - </td>
            )}
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

export default ShowQuali;
