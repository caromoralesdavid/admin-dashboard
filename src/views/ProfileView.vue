<template>
  <div class="profile-card">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Perfil
        </p>
        <a class="card-header-icon" aria-label="Editar perfil" @click="editProfile">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <p><strong>Nombre:</strong> {{ user.Fullname }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <!-- Otros datos de perfil -->
        </div>

      </div>
      <button @click="editProfile" class="button is-info">Editar Perfil</button>
    </div>

    <!-- Modal de edición de perfil -->
    <div v-if="editing" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Perfil</p>
          <button class="delete" aria-label="close" @click="cancelEdit"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input v-model="editingUser.Fullname" class="input" type="text" placeholder="Nombre">
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="editingUser.email" class="input" type="email" placeholder="Email">
            </div>
          </div>
          <!-- Otros campos de perfil que desees editar -->
        </section>
        <footer class="modal-card-foot">
          <button @click="updateProfile" class="button is-success">Guardar</button>
<!--           <button @click="cancelEdit" class="button">Cancelar</button> -->
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { auth } from '@/firebase/init'; // Importar la configuración de Firebase

export default defineComponent({
  name: 'ProfileView',
  data() {
    return {
      user: null,
      editing: false,
      editingUser: {
        Fullname: '',
        email: ''
        // Agrega aquí otros campos de perfil que desees editar
      }
    };
  },
  created() {
    this.user = auth.currentUser;
    // Inicializar editingUser con los datos actuales del usuario
    if (this.user) {
      this.editingUser.Fullname = this.user.displayName || '';
      this.editingUser.email = this.user.email || '';
      // Agrega aquí la inicialización de otros campos de perfil que desees editar
    }
  },
  methods: {
    editProfile() {
      // Abrir el modal de edición y copiar los datos actuales del usuario
      this.editing = true;
    },
    async updateProfile() {
      try {
        // Actualizar el perfil del usuario en Firebase
        const currentUser = auth.currentUser;
        if (currentUser) {
          await currentUser.updateProfile({
            displayName: this.editingUser.Fullname,
            email: this.editingUser.email
            // Actualiza aquí otros campos de perfil que desees
          });
          // Actualizar datos localmente
          this.user = currentUser;
          // Cerrar modal después de guardar
          this.editing = false;
        }
      } catch (error) {
        console.error('Error updating profile: ', error);
      }
    },
    cancelEdit() {
      // Cancelar edición y cerrar el modal
      this.editing = false;
      // Restaurar los datos originales del usuario en el formulario si es necesario
      this.editingUser.Fullname = this.user.displayName || '';
      this.editingUser.email = this.user.email || '';
      // Restaura aquí otros campos de perfil si es necesario
    }
  }
});
</script>

<style scoped>
.profile-card {
  margin: 2rem auto;
  width: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.card-header-title{
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: center;
  align-content: center;
  align-items: center;

}
.card {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header  {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.5rem 1rem;
  text-align: center

}

.card-content {
  padding: 1rem;
}

.modal-card {
  width: 60%;
}

@media screen and (max-width: 768px) {
  .profile-card {
    width: 80%;
  }

  .modal-card {
    width: 90%;
  }
}
</style>
