import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDBSojHMh6Hn6kfk4DyTf0_Vn-k5iDbLEc',
  authDomain: 'dojo-project-management-dc719.firebaseapp.com',
  projectId: 'dojo-project-management-dc719',
  storageBucket: 'dojo-project-management-dc719.appspot.com',
  messagingSenderId: '542915920406',
  appId: '1:542915920406:web:22daa04e1b9bb204ca6b37',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
