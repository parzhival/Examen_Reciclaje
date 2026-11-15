import React, { useState, useEffect } from 'react';
import PuntoCard from './PuntoCard';
import './App.css';

function App() {
  const [puntos, setPuntos] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    sector: '',
    material: '',
    capacidad: ''
  });

  const API_URL = 'http://localhost:8080/api/puntos';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPuntos(data))
      .catch(err => console.error("Error al cargar puntos:", err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 2. Enviar registro mediante POST con async/await
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          capacidad: Number(form.capacidad) // Asegurar que sea número
        })
      });

      if (response.ok) {
        const nuevoPunto = await response.json();
        // Actualizar el listado sin recargar la página
        setPuntos([...puntos, nuevoPunto]);
        // Limpiar formulario
        setForm({ nombre: '', sector: '', material: '', capacidad: '' });
      }
    } catch (error) {
      console.error("Error al guardar el punto:", error);
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Puntos de Reciclaje Urbano</h1>

      <form onSubmit={handleSubmit} className="punto-form">
        <h2>Registrar Nuevo Punto</h2>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre del punto" 
          value={form.nombre} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="sector" 
          placeholder="Sector o barrio" 
          value={form.sector} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="material" 
          placeholder="Material que recibe" 
          value={form.material} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="capacidad" 
          placeholder="Capacidad (unidades)" 
          value={form.capacidad} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Guardar Punto</button>
      </form>

      <h2>Puntos Registrados</h2>
      <div className="cards-grid">
        {puntos.map((punto) => (
          <PuntoCard key={punto.id || Math.random()} punto={punto} />
        ))}
      </div>
    </div>
  );
}

export default App;
