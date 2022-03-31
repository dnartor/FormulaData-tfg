import React, { useState, useEffect } from "react";

import MiSpinner from "../MiSpinner.jsx";

import styled from "@emotion/styled";

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const ShowRaceRes = ({ raceDoneInfo }) => {
  return (
    Object.keys(raceDoneInfo).length > 0 ? (
    <table className="showRaceResTable striped centered">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Piloto</th>
          <th>Escudería</th>
          <th>Nº</th>
          <th>Vueltas</th>
          <th>Tiempo</th>
          <th>Status</th>
          <th>Puntos</th>
        </tr>
      </thead>

      <tbody>
        
         {raceDoneInfo.children[4].children.map((piloto) => (
            <tr key={piloto.attributes.position}>
              <td>{piloto.attributes.position}</td>
              <td>
                {piloto.children[0].children[1].value +
                  " " +
                  piloto.children[0].children[2].value}
              </td>
              <td>{piloto.children[1].children[0].value}</td>
              <td>{piloto.attributes.number}</td>
                    <td>{piloto.children[3].value}</td>
              {piloto.children[5] !== undefined ? (<td>{piloto.children[5].value}</td>)
                :(
                    <td> - </td>
                ) 
            }
              <td>{piloto.children[4].value}</td>
              <td>{piloto.attributes.points}</td>
            </tr>
          ))}
        
         
      </tbody>
    </table>
    ) : (
        <CenterLoader>
        <MiSpinner />
      </CenterLoader>
    )
  );
};

export default ShowRaceRes;
