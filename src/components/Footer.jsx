import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="mi_container">
        <div className="row">
          <div className="col m4 s12">
            <h5 className="formula1_text">Trabajo de fin de título</h5>

            <p className="grey-text text-lighten-4">
              Este trabajo de fin de título ha sido realizado por Daniel Naranjo
              Torres para la Escuela de Ingeniería Informática de La Universidad
              de Las Palmas de Gran Canaria
            </p>
          </div>
          <div className="col m4 s12">
            <h5 className="formula_text">Sígueme en las redes</h5>
            <div className="row marginUD-m">
              <div className="col m3">
                <a
                  href="https://www.instagram.com/danint98/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={["fab", "instagram-square"]}
                    size="3x"
                  />
                </a>
              </div>
              <div className="col m3">
                <a
                  href="https://www.facebook.com/dani.naranjo.775"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={["fab", "facebook-square"]}
                    size="3x"
                  />{" "}
                </a>
              </div>
              <div className="col m3">
                <a
                  href="https://github.com/dnartor"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={["fab", "github-square"]} size="3x" />{" "}
                </a>
              </div>
              <div className="col m3">
                <a
                  href="https://www.linkedin.com/in/daniel-naranjo-torres-software-development/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={["fab", "linkedin"]} size="3x" />{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="col m4 s12">
            <h5 className="formula1_text">Enlaces de interés</h5>
            <ul>
              <li>
                <a href="https://www.ulpgc.es/">
                  ULPGC
                </a>
              </li>
              <li>
                <a href="https://www.eii.ulpgc.es/">
                  Escuela de Ingeniería Informática 2
                </a>
              </li>
              <li>
                <a href="https://es.reactjs.org/">
                  React
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/">
                    Npm
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="mi_container">
          © 2021 Copyright Text
        </div>
      </div>
    </footer>
  );
};

export default Footer;
