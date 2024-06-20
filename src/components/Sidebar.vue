<template v-if="user">
  <aside class="menu sidebar">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li>
        <router-link to="/dashboard" class="is-active">
          <i class="fas fa-home"></i> Dashboard
        </router-link>
      </li>
    </ul>
    <p class="menu-label">Administración</p>
    <ul class="menu-list">
      <li>
        <router-link to="/metrics">
          <i class="fas fa-table"></i> Métricas
        </router-link>
      </li>
      <li>
        <router-link to="/users">
          <i class="fas fa-edit"></i> Usuarios
        </router-link>
      </li>
      <li>
        <router-link to="/profile">
          <i class="fas fa-user"></i> Perfil
        </router-link>
      </li>
      <li>
        <a class="has-submenu">
          <i class="fas fa-plus"></i> Reportes
        </a>
        <ul>
          <li>
            <router-link to="/reports/open">
              Abiertos
            </router-link>
          </li>
          <li>
            <router-link to="/reports/collected">
              Recolectados
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <p class="menu-label">About</p>
    <ul class="menu-list">
      <li>
        <router-link to="/settings">
          <i class="fab fa-github"></i> Configuración
        </router-link>
      </li>
      <li>
        <router-link to="/logout">
          <i class="fas fa-info-circle"></i> Cerrar sesión
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style>
.sidebar {
  background-color: #2d3a4b;
  color: #fff;
  padding: 1rem;
  height: 100vh;
}

.menu-label {
  color: #adb5bd;
}

.menu-list>li>a {
  color: #000000;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.menu-list>li>a.is-active {
  background-color: #48556a;
  color: #fdfdfd;
}

.menu-list>li>a:hover {
  background-color: #3a4b63;
}

.menu-list>li>a i {
  margin-right: 0.5rem;
}

.menu-list>li>ul {
  margin-top: 0.5rem;
  margin-left: 1rem;
}

.menu-list>li>ul>li>a {
  color: #000000;
}

.menu-list>li>ul>li>a:hover {
  color: #1100a7;
}
</style>
