import React, { useState, useEffect } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

import MiSpinner from "./MiSpinner.jsx";

import styled from "@emotion/styled";
import { Tabs, Tab } from "react-materialize";

import CalendarioElement from "./CalendarioElement.jsx";

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  height: 350px;
  align-items: center;
`;

const Home = () => {
  const [apiCall, guardarApiCall] = useState(true);
  const [currentSchedule, guardarCurrentSchedule] = useState("");
  const [prevSchedule, guardarPrevSchedule] = useState("");
  const [currentYear, guardarCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const clienteApi = async () => {
      let url = `https://ergast.com/api/f1/` + currentYear;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCurrentSchedule(dataApi.children[0]);
    };
    const clienteApiPrev = async () => {
      let year = currentYear - 1;
      let url = "https://ergast.com/api/f1/" + year;
      let resultado = await axios.get(url);
      let dataApi = new XMLParser().parseFromString(resultado.data);
      guardarPrevSchedule(dataApi.children[0]);
      guardarApiCall(false);
      /*
      url = `https://ergast.com/api/f1/current/driverStandings`;
      resultado = await axios.get(url);
      dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCurrentStanding(
        dataApi.children[0].children[0].children.slice(0, 7)
      );

      url = `https://ergast.com/api/f1/current/constructorStandings`;
      resultado = await axios.get(url);
      dataApi = new XMLParser().parseFromString(resultado.data);
      guardarCurrentConstructorStanding(
        dataApi.children[0].children[0].children.slice(0, 7)
      );
      url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=Formula%201&language=en&category=sports`;
      resultado = await axios.get(url);
      resultado = resultado.data.results;
      guardarNoticias(resultado);
      //guardarNoticias(resultado);
      */
    };
    if (apiCall) {
      clienteApi();
      clienteApiPrev();
    }
  }, [apiCall]);
  /* 
 <ul className="tabs">
              <li className="tab col s6">
                <a href="#tab1">{currentYear-1}</a>
              </li>
              <li className="tab col s6">
                <a className="active" href="#tab2">
                  {currentYear}
                </a>
              </li>
            </ul>
          </div>
          <div id="tab1" className="col s12">
            Test 1
          </div>
          <div id="tab2" className="col s12">
            Test 2
          </div>
*/
  return (
    <div className="mi_container">
      <div className="header_container">
        <p className="header">Calendario</p>
      </div>
      <div className="section">
        <div className="row">
          <div className="col s12">
            <Tabs
              className="tab-demo z-depth-1"
              tabOptions={{ swipeable: true }}
            >
              <Tab
                options={{
                  duration: 300,
                  onShow: null,
                  responsiveThreshold: Infinity,
                  swipeable: true,
                }}
                title={"" + currentYear - 1}
              >
                {currentYear - 1}
              </Tab>
              <Tab
                options={{
                  duration: 300,
                  onShow: null,
                  responsiveThreshold: Infinity,
                  swipeable: true,
                }}
                active={true}
                title={"" + currentYear}
              >
                <div className="grid_calendario marginUD-xl row">
                  {Object.keys(currentSchedule).length > 0 ? (
                    currentSchedule.children.map((carrera) => (
                      <>
                        <CalendarioElement
                          key={
                            carrera.attributes.round +
                            "-" +
                            carrera.attributes.season
                          }
                          carrera={carrera}
                        />
                      </>
                    ))
                  ) : (
                    <CenterLoader>
                      <MiSpinner />
                    </CenterLoader>
                  )}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
