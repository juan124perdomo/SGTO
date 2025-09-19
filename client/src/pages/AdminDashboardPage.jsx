import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import '../style/AdminDashboard.css'; // Importamos un nuevo archivo de estilos

function AdminDashboardPage() {
  const { getAllOrdenes, allOrdenes, getTecnicos, tecnicos, loading, assignOrden } = useAdmin();
  const [selectedTecnico, setSelectedTecnico] = useState({}); // { ordenId: tecnicoId, ... }
  
  useEffect(() => {
    // Cargar los datos cuando el componente se monta
    getAllOrdenes();
    getTecnicos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTecnicoChange = (ordenId, tecnicoId) => {
    setSelectedTecnico(prev => ({ ...prev, [ordenId]: tecnicoId }));
  };

  const handleAssign = (ordenId) => {
    const tecnicoId = selectedTecnico[ordenId];
    if (tecnicoId) assignOrden(ordenId, tecnicoId);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Panel de Administrador</h1>

      {loading && <p>Cargando...</p>}

      <div className="dashboard-columns">
        {/* Columna de Órdenes */}
        <div className="dashboard-column">
          <h2 className="column-title">Todas las Órdenes ({allOrdenes.length})</h2>
          <div className="card-list">
            {allOrdenes.length > 0 ? (
              allOrdenes.map((orden) => (
                <div key={orden.id} className={`card ${orden.status.toLowerCase()}`}>
                  <p className="card-title">{orden.title}</p>
                  <p className="card-status">Estado: <span className={`status-badge status-${orden.status.toLowerCase()}`}>{orden.status}</span></p>
                  <p className="card-client">Cliente: {orden.user?.username || 'No asignado'}</p>
                  <p className="card-priority">Prioridad: {orden.priority}</p>

                  {/* Formulario de asignación solo para órdenes PENDIENTES */}
                  {orden.status === 'PENDIENTE' && (
                    <div className="assign-form">
                      <select onChange={(e) => handleTecnicoChange(orden.id, e.target.value)} value={selectedTecnico[orden.id] || ''}>
                        <option value="" disabled>Seleccionar técnico</option>
                        {tecnicos.map(t => (
                          <option key={t.id} value={t.id}>{t.username}</option>
                        ))}
                      </select>
                      <button onClick={() => handleAssign(orden.id)} disabled={!selectedTecnico[orden.id]}>
                        Asignar
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : !loading && <p>No hay órdenes para mostrar.</p>}
          </div>
        </div>

        {/* Columna de Técnicos */}
        <div className="dashboard-column">
          <h2 className="column-title">Técnicos Disponibles ({tecnicos.length})</h2>
          <div className="card-list">
            {tecnicos.map((tecnico) => (
              <div key={tecnico.id} className="card">
                <div className="tecnico-info">
                  <div className="tecnico-avatar">{tecnico.username.charAt(0)}</div>
                  <div>
                    <p className="card-title">{tecnico.username}</p>
                    <p className="card-email">{tecnico.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
