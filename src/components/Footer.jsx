import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="mi_container">
        <div className="row">
          <div className="col m4 s12">
            <h5 className="formula1_text center">Trabajo de fin de título</h5>

            <p className="grey-text text-lighten-4 center">
              Este trabajo de fin de título ha sido realizado por Daniel Naranjo
              Torres para la Escuela de Ingeniería Informática de La Universidad
              de Las Palmas de Gran Canaria
            </p>
          </div>
          <div className="col m4 s12">
            <h5 className="formula1_text center">Sígueme en las redes</h5>
            <div className="row marginUD-m center">
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
          <div className="col m4 s12 center">
            <h5 className="formula1_text center">Enlaces de interés</h5>
            <ul>
              <li>
                <a
                  href="https://es.reactjs.org/"
                  rel="noreferrer"
                  target="_blank"
                >
                  React
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Npm
                </a>
              </li>
              <li>
                <a
                  href="https://www.ulpgc.es/"
                  rel="noreferrer"
                  target="_blank"
                >
                  ULPGC
                </a>
              </li>
              <li>
                <a
                  href="https://www.eii.ulpgc.es/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Escuela de Ingeniería Informática
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="mi_container">© 2021 Copyright Text</div>
      </div>
    </footer>
  );
};

export default Footer;
