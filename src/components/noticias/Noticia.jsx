import React from "react";
import { useParams } from "react-router";

const Noticia = () => {
  let { postSlug } = useParams();
  return (
    <div className="container">
      <h1>{postSlug}</h1>
    </div>
  );
};
export default Noticia;
