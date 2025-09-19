import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import '../style/OrdenCard.css';

function OrdenCard({orden, deleteOrden}) {
  const { user } = useAuth();
  
  return (
    <div className="card-orden">
      <header className="card-orden-header">
        <h2 className="card-orden-title">{orden.title}</h2>
        <div className="card-orden-buttons">
          {/* Mostrar botón de reporte solo si la orden está FINALIZADA */}
          {orden.status === 'FINALIZADA' && (
            <Link className="btn-reporte" to={`/reporte/${orden.id}`}>Ver Reporte</Link>
          )}
          {/* Mostrar botón para crear reporte si está EN_PROCESO y asignada al técnico actual */}
          {orden.status === 'EN_PROCESO' && user.id === orden.tecnicoAsignadoId && (
            <Link className="btn-crear-reporte" to={`/ordenes/${orden.id}/reporte`}>Crear Reporte</Link>
          )}
          {/* Solo el cliente que creó la orden o un admin pueden editar/eliminar */}
          {(user.id === orden.userId || user.roleId === 2) && (
            <>
              <Link className="btn-edit" to={`/ordenes/${orden.id}`}>Editar</Link>
              <button className="btn-delete" onClick={() => deleteOrden(orden.id)}>Eliminar</button> 
            </>
          )}
        </div>
      </header>
      <div className="card-orden-body">
        <p className="card-orden-descripcion">{orden.descripcion}</p>
      </div>
      <footer className="card-orden-footer">
        <p><strong>Tipo:</strong> {orden.type}</p>
        <p><strong>Estado:</strong> <span className={`status-${orden.status.toLowerCase()}`}>{orden.status}</span></p>
        <p><strong>Prioridad:</strong> <span className={`priority-${orden.priority.toLowerCase()}`}>{orden.priority}</span></p>
        <p><strong>Fecha:</strong> {
          new Date(orden.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC'
          })}
        </p>
      </footer>
    </div>
  )
}

export default OrdenCard
