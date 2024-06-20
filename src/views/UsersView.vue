<template>
  <div>
    <h1 class="title centered">Usuarios</h1>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo Electrónico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user)" class="button is-info is-small">Editar</button>
            <button @click="deleteUser(user.id)" class="button is-danger is-small">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar usuario -->
    <div v-if="editingUser" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Usuario</p>
          <button class="delete" aria-label="close" @click="cancelEdit"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input v-model="editingUser.name" class="input" type="text" placeholder="Nombre del usuario">
            </div>
          </div>
          <div class="field">
            <label class="label">Correo Electrónico</label>
            <div class="control">
              <input v-model="editingUser.email" class="input" type="email" placeholder="Correo electrónico del usuario">
            </div>
          </div>
          <div class="field">
            <label class="label">Nueva Contraseña</label>
            <div class="control">
              <input v-model="newPassword" class="input" type="password" placeholder="Nueva contraseña">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="updateUser" class="button is-success">Guardar</button>
<!--           <button @click="cancelEdit" class="button">Cancelar</button> -->
<!--           <button @click="deleteUser(editingUser.id)" class="button is-danger">Eliminar Usuario</button> -->
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';

export default defineComponent({
  name: 'UsersView',
  data() {
    return {
      users: [],
      editingUser: null,
      newPassword: ''
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        this.users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    },
    editUser(user) {
      // Copiar el usuario para editar sin modificar directamente el original
      this.editingUser = { ...user };
      this.newPassword = ''; // Limpiar el campo de nueva contraseña
    },
    async updateUser() {
      try {
        const userDoc = doc(db, 'users', this.editingUser.id);
        const dataToUpdate = {
          name: this.editingUser.name,
          email: this.editingUser.email
        };
        // Actualizar contraseña solo si se ingresó una nueva
        if (this.newPassword.trim() !== '') {
          dataToUpdate.password = this.newPassword;
        }
        await updateDoc(userDoc, dataToUpdate);
        this.editingUser = null;
        this.newPassword = '';
        await this.fetchUsers();
      } catch (error) {
        console.error('Error updating user: ', error);
      }
    },
    async deleteUser(userId) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        await this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user: ', error);
      }
    },
    cancelEdit() {
      this.editingUser = null;
      this.newPassword = '';
    }
  }
});
</script>

<style lang="scss">
@import "../scss/App.scss";
</style>
