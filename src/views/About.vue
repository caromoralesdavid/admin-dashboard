<template>
    <div>
      <Register/>
    </div>
  </template>
  
  <script>
  import RegisterForm from '@/views/Auth/Register.vue'; // Ruta del rgister
  
  export default {
    name: 'Forms',
    components: {
      RegisterForm
    }
  }
  </script>
  
  <style>
  /* Estilos opcionales para form.vue */
  </style>
  