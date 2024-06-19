<template>
    <div class="container">
        <h1 class="title">Configuración</h1>

        <div class="input-container">
            <label for="companyName" class="label">Nombre de la Empresa:</label>
            <input id="companyName" v-model="companyName" type="text" class="input">
        </div>

        <div class="checkbox-container">
            <input id="darkMode" v-model="darkMode" type="checkbox" class="input">
            <label for="darkMode" class="checkbox-label">Modo Oscuro:</label>
        </div>

        <div class="input-container">
            <label for="password" class="label">Cambiar Contraseña:</label>
            <input id="password" v-model="password" type="password" class="input">
        </div>

        <button @click="updateSettings" class="button">
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
        updateSettings() {
            const user = auth.currentUser;
            if (this.password) {
                user.updatePassword(this.password);
            }
            db.collection('settings').doc(user.uid).set({
                companyName: this.companyName,
                darkMode: this.darkMode,
            });
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
}

.input-container {
    margin-bottom: 1.5rem;
}

.label {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    outline: none;
}

.checkbox-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
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
}

.button:hover {
    background-color: #0056b3;
}

.button:focus {
    outline: none;
}
</style>
