import React, { useEffect } from 'react';
import { useOrdenes } from '../context/OrdenContext';
import { Link } from 'react-router-dom';
import '../style/ReportesListPage.css';

function ReportesListPage() {
  const { reportes, getReportes } = useOrdenes();

  useEffect(() => {
    getReportes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="report-list-container">
      <h1 className="report-list-title">Órdenes con Reportes Finalizados</h1>
      {reportes && reportes.length > 0 ? (
        <div className="report-list-grid">
          {reportes.map(orden => (
            <div key={orden.id} className="report-list-card">
              <h2 className="report-card-title">{orden.title}</h2>
              <p><strong>Cliente:</strong> {orden.user?.username || 'N/A'}</p>
              <p><strong>Fecha de Finalización:</strong> {new Date(orden.reporte.createdAt).toLocaleDateString('es-ES')}</p>
              <Link to={`/reporte/${orden.id}`} className="btn-view-report">Ver Reporte Completo</Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reports-message">No hay órdenes con reportes finalizados para mostrar.</p>
      )}
    </div>
  );
}

export default ReportesListPage;