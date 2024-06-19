<template>
    <div class="contai mt-50">
        <div class="columns is-centered">
            <div class="column is-5">
                <div class="box">
                    <h1 class="title is-4">Iniciar Sesión</h1>
                    <form @submit.prevent="login">
                        <br>
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
                                <button class="button is-primary">Iniciar Sesión</button>
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

<!-- Para hacer login con el usuario autenticado -->
<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '@/firebase/init.js';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
        };
    },
    name: 'Login',
    methods: {
        login() {
            this.error = '';
            if (this.email && this.password) {
                const auth = getAuth();
                signInWithEmailAndPassword(auth, this.email, this.password)
                    .then(() => {
                        this.$router.push({ name: 'dashboard' });
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