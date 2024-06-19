<template>
    <div>
      <h1>Usuarios</h1>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '@/firebase/init';

  
  export default {
    name: 'UsersView',
    data() {
      return {
        users: [],
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
    },
  };
  </script>
  
  <style lang="scss">
  @import "../scss/App.scss";
  </style>
  