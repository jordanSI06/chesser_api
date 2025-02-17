import React from "react";
import "../styles/Loader.css"; // Ajoute un fichier CSS pour le style

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Chargement en cours...</p>
    </div>
  );
};

export default Loader;