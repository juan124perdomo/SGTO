import React from 'react';
import { useForm } from 'react-hook-form';
import { useOrdenes } from '../context/OrdenContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/OrdenForm.css'; // Reutilizamos los estilos del formulario de órdenes

function ReporteFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createReporte, errors: reporteErrors } = useOrdenes();
  const navigate = useNavigate();
  const { id: ordenId } = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const success = await createReporte(ordenId, data);
    if (success) {
      navigate('/ordenes'); // Redirige a la lista de órdenes si se crea con éxito
    }
  });

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={onSubmit}>
        <h1 className="form-title">Crear Reporte Técnico</h1>

        {/* Aquí se mostrará el error del backend */}
        {reporteErrors.map((error, i) => (
          <div className="errores" key={i}>
            {error}
          </div>
        ))}

        <textarea
          rows="5"
          placeholder="Descripción detallada del trabajo realizado..."
          {...register("descripcion", { required: "La descripción es obligatoria" })}
        ></textarea>
        {errors.descripcion && <span className="text-red-500">{errors.descripcion.message}</span>}

        <button className="form-button">Finalizar Orden y Guardar Reporte</button>
      </form>
    </div>
  );
}

export default ReporteFormPage;