<template>
    <div>
      <h1>Reportes</h1>
      <ul>
        <li v-for="report in reports" :key="report.id">
          {{ report.title }} - {{ report.status }}
          <button @click="updateStatus(report.id, 'recolectado')">Recolectado</button>
          <button @click="updateStatus(report.id, 'abierto')">Abierto</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase/init'; // Importar la configuración de Firebase
  
  
  export default {
    name: 'ReportsView',
    data() {
      return {
        reports: [],
      };
    },
    methods: {
      fetchReports() {
        // Obtener la lista de reportes desde Firebase
        db.collection('reports').get().then(querySnapshot => {
          this.reports = querySnapshot.docs.map(doc => doc.data());
        });
      },
      updateStatus(reportId, status) {
        // Actualizar el estado del reporte
        db.collection('reports').doc(reportId).update({
          status: status,
        }).then(() => {
          this.fetchReports();
        });
      },
    },
    created() {
      this.fetchReports();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos de la vista de reportes */
  </style>
  