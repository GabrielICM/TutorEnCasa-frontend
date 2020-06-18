import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Nombre" name="Nombre" ref={register({required: true, maxLength: 80})} />
      <input type="text" placeholder="Apellido" name="Apellido" ref={register({required: true, maxLength: 100})} />
      <input type="datetime" placeholder="Fecha de nacimiento" name="Fecha de nacimiento" ref={register({required: true})} />
      <input type="tel" placeholder="rut" name="rut" ref={register({required: true, maxLength: 8})} />

      <input type="submit" />
    </form>
  );
}