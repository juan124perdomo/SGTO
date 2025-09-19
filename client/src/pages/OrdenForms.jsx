import {   useForm } from "react-hook-form";
import "../style/OrdenForm.css";
import { useOrdenes } from "../context/OrdenContext";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";

function OrdenForms() {
  const { register, handleSubmit,setValue} = useForm();
  const { createOrden, getOrden, updateOrden } = useOrdenes();
  const navigate = useNavigate();
  const Params = useParams();

  useEffect(() => {
     async function loadOrden() {
      if (Params.id) {
        const orden = await getOrden(Params.id);
        console.log(orden);
        setValue("title", orden.title);
        setValue("descripcion", orden.descripcion);
        setValue("date", orden.date);
        setValue("type", orden.type);
        setValue("priority", orden.priority);
      }
    }
    
      
    loadOrden();

    }, [Params.id]);

  const onSubmit = handleSubmit((data) => {
    if (Params.id) {
      updateOrden(Params.id, data);
      console.log("Orden actualizada con éxito");
    }
    else{
      createOrden(data);
    
    }
    navigate("/ordenes");
  });

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={onSubmit}>
        <h1 className="form-title">{Params.id ? "Editar Orden" : "Crear Nueva Orden"}</h1>
        <input
          type="text"
          placeholder="Título"
          {...register("title", { required: true })}
          autoFocus
        />

        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("descripcion", { required: true })}
        ></textarea>

        <input type="date" {...register("date")} />

        <select {...register("type", { required: true })}>
          <option value="">Tipo de Servicio</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Construcción">Construcción</option>
          <option value="Reparación">Reparación</option>
          <option value="Diseño de red">Diseño de red</option>
        </select>

        <select {...register("priority", { required: true })}>
          <option value="">Prioridad del Servicio</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <button className="form-button">Guardar Orden</button>
      </form>
    </div>
  );
}

export default OrdenForms;
