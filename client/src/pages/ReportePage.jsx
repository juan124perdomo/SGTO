import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrdenes } from '../context/OrdenContext';
import '../style/ReportePage.css';

function ReportePage() {
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getOrden } = useOrdenes();
  const { id: ordenId } = useParams();

  useEffect(() => {
    const fetchOrdenConReporte = async () => {
      try {
        const data = await getOrden(ordenId);
        setOrden(data);
      } catch (error) {
        console.error("Error al cargar la orden y el reporte:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenConReporte();
  }, [ordenId, getOrden]);

  if (loading) return <div className="loading-message">Cargando reporte...</div>;
  if (!orden?.reporte) return <div className="error-message">No se encontró un reporte para esta orden.</div>;

  const { reporte, title } = orden;

  return (
    <div className="reporte-container">
      <div className="reporte-card">
        <h1 className="reporte-title">Reporte de la Orden: "{title}"</h1>
        <div className="reporte-details">
          <p><strong>ID del Reporte:</strong> {reporte.id}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(reporte.createdAt).toLocaleString('es-ES')}</p>
          <p><strong>Técnico a Cargo:</strong> {reporte.tecnico?.username || 'No disponible'}</p>
          <h2 className="reporte-subtitle">Descripción del Trabajo Realizado</h2>
          <p className="reporte-descripcion">{reporte.descripcion}</p>
        </div>
      </div>
    </div>
  );
}

export default ReportePage;