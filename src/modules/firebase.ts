import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import config from '../../firebase.config';

const firebaseApp = initializeApp(config);

const firestore = getFirestore();

export { firebaseApp, firestore };
