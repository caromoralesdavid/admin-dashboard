<template>
    <div class="dashboard">
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="box">
            <div class="has-text-centered">
              <span class="icon is-large"><i class="fas fa-users fa-2x"></i></span>
              <p>Usuarios</p>
              <p class="is-size-4 has-text-weight-bold">{{ totalUsuarios }}</p>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="box">
            <div class="has-text-centered">
              <span class="icon is-large"><i class="fas fa-shopping-cart fa-2x"></i></span>
              <p>Reportes</p>
              <p class="is-size-4 has-text-weight-bold">{{ totalReportes }}</p>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="box">
            <div class="has-text-centered">
              <span class="icon is-large"><i class="fas fa-chart-line fa-2x"></i></span>
              <p>Atendidos</p>
              <p class="is-size-4 has-text-weight-bold">56%</p>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <MapComponent />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import MapComponent from '@/components/Mapcomponent.vue';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '@/firebase/init'; // Importamos la instancia de Firestore
  
  export default defineComponent({
    name: 'DashboardComponent',
    components: {
      MapComponent
    },
    data() {
      return {
        totalUsuarios: 0,
        totalReportes: 0
      };
    },
    async created() {
      await this.fetchUsuarios();
      await this.fetchReportes();
    },
    methods: {
      async fetchUsuarios() {
        try {
          const usersCollection = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollection);
          this.totalUsuarios = usersSnapshot.size; // Total de usuarios
        } catch (error) {
          console.error('Error fetching users: ', error);
        }
      },
      async fetchReportes() {
        try {
          const reportsCollection = collection(db, 'reports');
          const reportsSnapshot = await getDocs(reportsCollection);
          this.totalReportes = reportsSnapshot.size; // Total de reportes
        } catch (error) {
          console.error('Error fetching reports: ', error);
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .dashboard {
    padding: 1rem;
    background-color: rgb(190, 236, 221);
  }
  
  .box {
    text-align: center;
  }
  
  .icon.is-large {
    margin-bottom: 0.5rem;
  }
  
  .line-chart {
    height: 400px;
  }
  </style>
  