import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
      <input type="number" placeholder="Contraseña" name="Contraseña" ref={register({required: true, maxLength: 80})} />
      <input type="text" placeholder="Repita Contraseña" name="Repita Contraseña" ref={register({required: true, maxLength: 80})} />
      <input type="number" placeholder="Rut" name="Rut" ref={register({required: true, maxLength: 80})} />

      <input type="submit" />
    </form>
  );
}