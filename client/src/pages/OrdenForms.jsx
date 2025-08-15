import {useForm} from 'react-hook-form'
import React from 'react'


function OrdenForms() {
  const {register, handleSubmit} = useForm()

  return (
    <>
      <form action="">
        <input type="text" placeholder='Titulo' {...register('title')}/>
        <textarea rows="3" placeholder='Descripcion' {...register('description')}></textarea>
        <button>Guardar</button>
        
      </form>
    </>
  )
}

export default OrdenForms
