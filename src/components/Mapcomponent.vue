<template>
    <Map
      :center="center"
      :zoom="12"
      style="width: 100%; height: 500px"
    >
      <Marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker"
      />
    </Map>
  </template>
  
  <script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from '@/firebase/init'; // Importar la configuración de Firebase
  import { Map, Marker } from '@fawmi/vue-google-maps';
  
  export default {
    components: {
      Map,
      Marker
    },
    data() {
      return {
        center: { lat: 0, lng: 0 },
        markers: []
      };
    },
    async mounted() {
      await this.loadMarkers();
    },
    methods: {
      async loadMarkers() {
        try {
          const reportsCollection = collection(db, 'reports');
          const querySnapshot = await getDocs(reportsCollection);
          const markers = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.latitude && data.longitude) {
              markers.push({ lat: data.latitude, lng: data.longitude });
            }
          });
          if (markers.length > 0) {
            this.center = markers[0];
          }
          this.markers = markers;
        } catch (error) {
          console.error('Error fetching markers: ', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  