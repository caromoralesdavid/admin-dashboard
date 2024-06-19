<template>
    <div>
      
      <div class="dashboard-layout">
        <Sidebar />
        <main class="main-content">
          <DashboardComponent />
        </main>
      </div>
    </div>
  </template>
  
  <script>
  /* import Navbar from '@/components/layout/Navcomponents.vue' */
  import Sidebar from '@/components/Sidebar.vue'
  import DashboardComponent from '@/components/DashboardComponent.vue'
  
  export default {
    name: 'Dashboard',
    components: {
      Sidebar,
      DashboardComponent
    }
  }
  </script>
  
  <style scoped>
  .dashboard-layout {
    display: flex;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 1rem;
  }
  </style>

