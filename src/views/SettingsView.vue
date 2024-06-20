<template>
    <div class="container" :class="{ 'dark-mode': darkMode }">
      <h1 class="title">Configuración</h1>
  
      <div class="field">
        <label for="companyName" class="label">Nombre de la Empresa:</label>
        <div class="control">
          <input id="companyName" v-model="companyName" type="text" class="input">
        </div>
      </div>
  
      <div class="field">
        <input id="darkMode" v-model="darkMode" type="checkbox" class="switch is-rounded is-info">
        <label for="darkMode" class="checkbox-label">Modo Oscuro:</label>
      </div>
  
      <div class="field">
        <label for="password" class="label">Cambiar Contraseña:</label>
        <div class="control">
          <input id="password" v-model="password" type="password" class="input">
        </div>
      </div>
  
      <button @click="updateSettings" class="button is-info">
        Guardar Cambios
      </button>
    </div>
  </template>
  
  <script>
  import { db, auth } from '@/firebase/init';
  
  export default {
    name: 'SettingsView',
    data() {
      return {
        companyName: '',
        darkMode: false,
        password: '',
      };
    },
    methods: {
      async updateSettings() {
        const user = auth.currentUser;
        try {
          if (this.password) {
            await user.updatePassword(this.password);
          }
          await db.collection('settings').doc(user.uid).set({
            companyName: this.companyName,
            darkMode: this.darkMode,
          });
        } catch (error) {
          console.error('Error updating settings: ', error);
        }
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: background-color 0.3s;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  
  .field {
    margin-bottom: 1.5rem;
  }
  
  .label {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    outline: none;
  }
  
  .switch {
    -webkit-appearance: none;
    appearance: none;
    display: inline-block;
    height: 1.75rem;
    width: 3.5rem;
    position: relative;
    cursor: pointer;
    background-color: #eaeaea;
    border-radius: 999px;
    transition: background-color 0.3s;
  }
  
  .switch::after {
    content: '';
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  
  .switch:checked {
    background-color: #23d160;
  }
  
  .switch:checked::after {
    transform: translateX(100%);
  }
  
  .checkbox-label {
    font-size: 1rem;
    color: #333;
    margin-left: 0.5rem;
  }
  
  .button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #0056b3;
  }
  
  .button:focus {
    outline: none;
  }
  
  /* Estilos para modo oscuro */
  .dark-mode {
    background-color: #1a1a1a;
    color: #ccc;
  }
  
  .dark-mode .label, .dark-mode .checkbox-label {
    color: #ccc;
  }
  
  .dark-mode .input {
    background-color: #333;
    color: #ccc;
    border-color: #666;
  }
  
  .dark-mode .button {
    background-color: #333;
    color: #ccc;
  }
  
  .dark-mode .switch::after {
    background-color: #ccc;
  }
  </style>
  