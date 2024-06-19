import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import './assets/Tailwind.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';
// store from './store';
//import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAel2O0IaWOXOVc0j1XVJzZl-Ked6qd2bo",
  authDomain: "reportrashv2.firebaseapp.com",
  projectId: "reportrashv2",
  storageBucket: "reportrashv2.appspot.com",
  messagingSenderId: "186044340160",
  appId: "1:186044340160:web:fd819fa994bcaefbc3da25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let vueApp;

onAuthStateChanged(auth, () => {
  if (!vueApp) {
    vueApp = createApp(App)
      .use(router)
      .use(VueGoogleMaps, {
        load: {
          key: 'AIzaSyARHwH4MelfEDzhBlySMl4oyD_Ivs9pR0I',
        },
      })
      .mount('#app');
  }
});