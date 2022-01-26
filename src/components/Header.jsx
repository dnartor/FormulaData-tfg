import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";


import logoImagen from "../assets/FormulaData_brand.png";

const Navegador = styled.nav`
  height: 100px;
`;
const Logo = styled.img`
  height: 100px;
  margin: 0;
`;

const Header = () => {
  
  return (
    <Fragment>
      <ul id="dropdown-Clasificacion" className="dropdown-content grey lighten-4 animate__animated animate__slideInDown">
        <li>
          <NavLink to="/clasificacion-pilotos">Clasificación de pilotos</NavLink>
        </li>
        <li>
          <NavLink to="clasificacion-escuderias">Clasificación de escuderias</NavLink>
        </li>
      </ul>
      <Navegador className="grey lighten-4">
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo">
            <Logo src={logoImagen} alt="Logo de FormulaData" />
          </NavLink>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="#!" className="dropdown-trigger" data-target='dropdown-Clasificacion'>Clasificación
              <i className="material-icons right">arrow_drop_down</i></a>
            </li>
            <li>
              <NavLink to="/calendario">Calendario</NavLink>
            </li>
            <li>
              <NavLink to="/noticias">Noticias</NavLink>
            </li>
            <li>
              <NavLink to="/circuitos">Circuitos</NavLink>
            </li>
            <li>
              <NavLink to="/enciclopedia">Enciclopedia</NavLink>
            </li>
          </ul>
        </div>
      </Navegador>
    </Fragment>
  );
};

export default Header;
