import React, { useState, useEffect } from "react";
import axios from "axios";


const Encliclopedia = () => {
  const apiKey='269ad4947b6a41e498d9960f01643530';
  const [apiCall, guardarApiCall] = useState(true);

  useEffect(() => {
  const clienteApi = async () => {
    if (apiCall === false) return;
    let url = `https://newsapi.org/v2/everything?domains=formula1.com&apiKey=${apiKey}`;
    let resultado = await axios.get(url);
    console.log(resultado);
    guardarApiCall(false);
    //let dataApi = new XMLParser().parseFromString(resultado.data);
    
  };
  clienteApi();
});
  return (
    <div className="container">
      <h1>Enciclopedia</h1>
    </div>
  );
};

export default Encliclopedia;
