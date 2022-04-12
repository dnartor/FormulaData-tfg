import React from "react";

import MiSpinner from "../MiSpinner.jsx";

import styled from "@emotion/styled";

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const ShowRaceRes = ({ raceDoneInfo }) => {
  raceDoneInfo.children[4].children.sort(function (a, b) {
    console.log(a);
    let timeA = '';
    let timeB = '';
    if (a.children[6] === undefined){
        if(a.children[5] === undefined){
            //timeA=a.children[4].children[0].value;
            timeA = 9999;
        }else{
            timeA=a.children[5].attributes.rank;
        }
    }else{
        timeA=a.children[6].attributes.rank;
    }
    if (b.children[6] === undefined){
        if(b.children[5] === undefined){
            //timeB=b.children[4].children[0].value;
            timeB = 9999;
        }else{
            timeB=b.children[5].attributes.rank;
        }
    }else{
        timeB=b.children[6].attributes.rank;
    }
    console.log("comparo: a: " + timeA + " - b: "+ timeB  );
    return timeA - timeB;
  });
  return Object.keys(raceDoneInfo).length > 0 ? (
    <table className="showRaceResTable striped centered">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Piloto</th>
          <th>Escudería</th>
          <th>Nº</th>
          <th>Vuelta</th>
          <th>Tiempo</th>
          <th>Avg Speed</th>
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
            {piloto.children[6] !== undefined ? (
              <>
                <td>{piloto.children[6].attributes.lap}</td>
                <td>{piloto.children[6].children[0].value}</td>
                <td>{piloto.children[6].children[1].value}</td>
              </>
            ) : piloto.children[5] !== undefined ? (
              <>
                <td>{piloto.children[5].attributes.lap}</td>
                <td>{piloto.children[5].children[0].value}</td>
                <td>{piloto.children[5].children[1].value}</td>
              </>
            ) : (
              <>
                <td> - </td>
                <td> - </td>
                <td> - </td>
              </>
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

export default ShowRaceRes;
