<template>
    <div>
      <h1>Cerrar sesión</h1>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
  <script>
  import { auth } from '@/firebase/init'; // Importar la configuración de Firebase
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'LogoutView',
    setup() {
      const router = useRouter();
      
      const logout = () => {
        auth.signOut().then(() => {
          router.push('/login');
        });
      };
  
      return {
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos de la vista de cerrar sesión */
  </style>
  