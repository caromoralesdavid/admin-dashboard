<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="">
                <img src="@/assets/reportrash-high.png" style="border-radius: 15px; margin: 10px;">
                <h3 class="title" is-3>ReporTrash</h3>
            </router-link>
        </div>
        <div id="navbarBasicExample" class="navbar-menu ml-10">
            <div class="navbar-end">
                <div class="navbar-item ml-10">
                    <template v-if="user">
                        <div class="navbar-item has-dropdown is-hoverable ml-10">
                            <a class="navbar-link">{{ user.email }}</a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item is-selected">Perfil</a>
                                <router-link class="navbar-item" to="/dashboard">Dashboard</router-link>
                                <a class="navbar-item">Contraseña</a>
                                <a class="navbar-item" @click="logout">Cerrar sesión</a>
                                <hr class="navbar-divider">
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="buttons">
                            <!--  <router-link to="/register"
                                class="button is-primary"><strong>Registrar</strong></router-link> -->
                            <!-- <router-link to="/login" class="button is-light">Acceder</router-link> -->
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
    data() {
        return {
            user: null,
        };
    },
    methods: {
        logout() {
            const auth = getAuth();
            signOut(auth).then(() => {
                this.$router.push({ name: 'Login' });
            });
        },
    },
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            this.user = user ? user : null;
        });
    },
};
</script>