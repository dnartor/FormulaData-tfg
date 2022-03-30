import React, { useState } from "react";

const CalendarioRaceDone = ({ resultDoneRace }) => {
  return ( 
  resultDoneRace.map((piloto) => (
    <tr key={piloto.attributes.number}>
      <td>
        {piloto.children[0].children[1].value}{" "}
        {piloto.children[0].children[2].value}
      </td>
      <td>{piloto.children[1].children[0].value}</td>
    </tr>
  ))
  
  )
};

export default CalendarioRaceDone;
