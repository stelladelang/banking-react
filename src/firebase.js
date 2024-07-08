import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDiQwtppEfHMZSDqNjN7a_7eHAlq34qgPo',
  authDomain: 'courso-340b3.firebaseapp.com',
  databaseURL: 'https://courso-340b3-default-rtdb.firebaseio.com',
  projectId: 'courso-340b3',
  storageBucket: 'courso-340b3.appspot.com',
  messagingSenderId: '86446512266',
  appId: '1:86446512266:web:220d0357ef4382434ef573',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
