import {useForm} from 'react-hook-form'
import '../style/OrdenForm.css';


function OrdenForms() {
  const {register, handleSubmit} = useForm()

  return (
    <>
    <div className="container-form">
        <h1> Orden</h1>
        <form action="">
        <input type="text" placeholder='Titulo' {...register('title')}/>

        <textarea rows="3" placeholder='Descripcion' {...register('description')}></textarea>

        <input type="date" {...register('date')}/>
        
          <select >
              <option value="">Tipo de Servicio</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Construcción">Construcción</option>
              <option value="Reparación">Reparación</option>
              <option value="Diseño de red">Diseño de red</option>
          </select>
          <select >
              <option value="">Prioridad del Servicio</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
          </select>
         


        <button>Guardar</button>
        
      </form>
    </div>
      
    </>
  )
}

export default OrdenForms
