import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCUdof8BHr8LfDIZIYDCvDv1e8mjmIpgGY',
   authDomain: 'my-app-7bb3f.firebaseapp.com',
   projectId: 'my-app-7bb3f',
   storageBucket: 'my-app-7bb3f.appspot.com',
   messagingSenderId: '927914054611',
   appId: '1:927914054611:web:910cce751ca44b58d05526',
   measurementId: 'G-6QP8PCWKHV',

};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
