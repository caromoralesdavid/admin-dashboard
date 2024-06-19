//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore'; 


//const firebaseConfig = {
//apiKey: "AIzaSyAel2O0IaWOXOVc0j1XVJzZl-Ked6qd2bo",
//authDomain: "reportrashv2.firebaseapp.com",
//projectId: "reportrashv2",
//storageBucket: "reportrashv2.appspot.com",
//messagingSenderId: "186044340160",
//appId: "1:186044340160:web:fd819fa994bcaefbc3da25"
//};

// Inicializar Firebase
//const firebaseApp = initializeApp(firebaseConfig);
//const db = getFirestore(firebaseApp);

//export default db;

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAel2O0IaWOXOVc0j1XVJzZl-Ked6qd2bo",
  authDomain: "reportrashv2.firebaseapp.com",
  projectId: "reportrashv2",
  storageBucket: "reportrashv2.appspot.com",
  messagingSenderId: "186044340160",
  appId: "1:186044340160:web:fd819fa994bcaefbc3da25"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
