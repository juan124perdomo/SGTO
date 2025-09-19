import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../style/UserManagement.css';

function UserManagementPage() {
  const { allUsers, getAllUsers, updateUserRole, loading } = useAdmin();
  const [selectedRole, setSelectedRole] = useState({}); // { userId: roleId }

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoleChange = (userId, roleId) => {
    setSelectedRole(prev => ({ ...prev, [userId]: roleId }));
  };

  const handleUpdateRole = (userId) => {
    const roleId = selectedRole[userId];
    if (roleId) {
      updateUserRole(userId, roleId);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">Gestión de Usuarios</h1>
      <div className="user-list">
        {allUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <span className="user-avatar">{user.username.charAt(0)}</span>
              <div>
                <p className="user-name">{user.username}</p>
                <p className="user-email">{user.email}</p>
                <p className="user-role">Rol actual: <strong>{user.role.name}</strong></p>
              </div>
            </div>
            <div className="role-update-form">
              <select onChange={(e) => handleRoleChange(user.id, e.target.value)} value={selectedRole[user.id] || user.roleId}>
                <option value="1">Cliente</option>
                <option value="2">Admin</option>
                <option value="3">Técnico</option>
              </select>
              <button onClick={() => handleUpdateRole(user.id)} disabled={!selectedRole[user.id] || Number(selectedRole[user.id]) === user.roleId}>
                Actualizar Rol
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagementPage;