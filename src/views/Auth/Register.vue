<template>
    <div class="contai mt-50">
        <div class="columns is-centered">
            <div class="column is-5">
                <div class="box">
                    <h1 class="title is-4">Registrar Usuario</h1>
                    <form @submit.prevent="register">
                        <br>
                        <div class="field">
                            <label class="label">Nombre</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Nombre" v-model="name">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Correo</label>
                            <div class="control">
                                <input class="input" type="email" placeholder="Correo" v-model="email">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Contraseña</label>
                            <div class="control">
                                <input class="input" type="password" placeholder="Contraseña" v-model="password">
                            </div>
                        </div>
                        <br>
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary">Registrar</button>
                            </div>
                        </div>
                    </form>

                    <div class="notification is-danger mt-10" v-if="error">
                        {{ error }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<!-- Script para la creación del usuario en los metodos de autenticación de firebase  -->
<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '@/firebase/init.js';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: '',
        };
    },
    name: 'Register',
    methods: {
        register() {
            this.error = '';
            if (this.name && this.email && this.password) {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        // El usuario ha sido creado exitosamente
                        const user = userCredential.user;
                        // actualizar el nombre del usuario
                        user.updateProfile({ 
                            displayName: this.name,
                        }).then(() => {
                            // Actualizar el nombre del usuario
                            this.name = '';
                            this.email = '';
                            this.password = '';
                            this.$router.push({ name: 'dashboard' });
                        }).catch((error) => {
                            this.error = error.message;
                        });
                    })
                    .catch((error) => {
                        this.error = error.message;
                    });
            } else {
                this.error = '¡Todos los campos son requeridos!';
            }
        }
    }
};
</script>