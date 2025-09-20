import { useAuth } from '../context/useAuth';
import '../style/Profile.css';

function Profile() {
  const { user } = useAuth();

  // Si el usuario aún no se ha cargado, muestra un mensaje.
  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Perfil de Usuario</h1>
        <div className="profile-info">
          <p><strong>Nombre de Usuario:</strong> {user.username}</p>
          <p><strong>Correo Electrónico:</strong> {user.email}</p>
          <p><strong>Teléfono:</strong> {user.telefono || 'No especificado'}</p>
          {/* Mostramos el nombre del rol si existe */}
          {user.roleName && (
            <p><strong>Rol:</strong> <span className="role-badge">{user.roleName}</span></p>
          )}
          {/* Mostramos la fecha de creación si existe */}
          {user.createdAt && (
            <p><strong>Miembro desde:</strong> {new Date(user.createdAt).toLocaleDateString('es-ES')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;
