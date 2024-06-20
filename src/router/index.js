import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import Dashboard from '../views/dashboard.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MetricsView from '@/views/MetricsView.vue';
import UsersView from '@/views/UsersView.vue';
import ProfileView from '@/views/ProfileView.vue';
import ReportesComponent from '@/components/ReportesComponent.vue';
import SettingsView from '@/views/SettingsView.vue';
import LogoutView from '@/views/LogoutView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: MetricsView
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/reports/open',
    name: 'ReportsOpen',
    component: ReportesComponent
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next({ name: 'Login' });
      }
      unsubscribe(); // Stop listening for auth changes once checked
    });
  } else {
    next();
  }
});

export default router;
