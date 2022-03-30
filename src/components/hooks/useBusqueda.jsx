import React, { Fragment, useState } from 'react';


const useBusqueda = (label, stateInicial) => {
    const [state, actualizarState] = useState(stateInicial);
    const Buscador = () => (
      <Fragment>
        <div className="col m10">
          <label className='hard-pink' htmlFor="form-busqueda">{label}</label>
          <input onChange={(e) => actualizarState(e.target.value)} type="search" id="form-busqueda" value={state} />
        </div>
        <div className="col m2 vertical-align">
          <button
            className="waves-effect waves-light btn"
            type="submit"
          >
            Buscar
            <i className="material-icons right">search</i>
          </button>
        </div>
      </Fragment>
    );
  
    return [state, Buscador, actualizarState];
  };
  
  export default useBusqueda;