<template>
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <!-- Otros datos de perfil -->
    </div>
  </template>
  
  <script>
  import { auth } from '@/firebase/init'; // Importar la configuración de Firebase
  
  export default {
    name: 'ProfileView',
    data() {
      return {
        user: null,
      };
    },
    created() {
      this.user = auth.currentUser;
    },
  };
  </script>
  
  <style scoped>
  /* Estilos de la vista de perfil */
  </style>
  