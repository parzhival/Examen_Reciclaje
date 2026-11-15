import React from 'react';
import './PuntoCard.css';

function PuntoCard({ punto }) {
  return (
    <div className="punto-card">
      <h3>{punto.nombre}</h3>
      <p><strong>Sector:</strong> {punto.sector}</p>
      <p><strong>Material:</strong> {punto.material}</p>
      <p><strong>Capacidad:</strong> {punto.capacidad} unidades</p>
    </div>
  );
}

export default PuntoCard;


