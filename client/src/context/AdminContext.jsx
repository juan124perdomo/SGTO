import React, { createContext, useContext, useState } from "react";
import { getAllOrdenesRequest, getTecnicosRequest, assignOrdenRequest, getAllUsersRequest, updateUserRoleRequest } from "../api/admin.js";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export function AdminProvider({ children }) {
  const [allOrdenes, setAllOrdenes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllOrdenes = async () => {
    try {
      setLoading(true);
      const res = await getAllOrdenesRequest();
      setAllOrdenes(res.data);
      setError(null);
    } catch (error) {
      setError(error.response.data.message || "Error al cargar las órdenes");
    } finally {
      setLoading(false);
    }
  };

  const getTecnicos = async () => {
    try {
      const res = await getTecnicosRequest();
      setTecnicos(res.data);
    } catch (error) {
      console.error("Error fetching tecnicos:", error);
    }
  };

  const assignOrden = async (ordenId, tecnicoId) => {
    try {
      const res = await assignOrdenRequest(ordenId, tecnicoId);
      if (res.status === 200) {
        // Actualizamos la lista de órdenes para reflejar el cambio de estado
        setAllOrdenes(prevOrdenes => 
          prevOrdenes.map(orden => 
            orden.id === ordenId ? { ...orden, status: 'EN_PROCESO', tecnicoAsignadoId: tecnicoId } : orden
          )
        );
      }
    } catch (error) {
      console.error("Error al asignar la orden:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsersRequest();
      setAllUsers(res.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, roleId) => {
    try {
      await updateUserRoleRequest(userId, roleId);
      // Actualizamos el rol del usuario en el estado local
      setAllUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, roleId: Number(roleId), role: { ...user.role, id: Number(roleId), name: getRoleName(roleId) } } : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
  };

  const getRoleName = (roleId) => ({ 1: 'user', 2: 'admin', 3: 'tecnico' }[roleId] || 'desconocido');

  return (
    <AdminContext.Provider value={{ getAllOrdenes, allOrdenes, getTecnicos, tecnicos, loading, error, assignOrden, allUsers, getAllUsers, updateUserRole }}>
      {children}
    </AdminContext.Provider>
  );
}