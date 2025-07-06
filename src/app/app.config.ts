import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      // replace it with your keys.
    initializeApp({
  apiKey: "AIzaSyAxaJpJcINwklYAvTTULtx4GY6zTD8uNiM",
  authDomain: "crud-arenas.firebaseapp.com",
  projectId: "crud-arenas",
  storageBucket: "crud-arenas.firebasestorage.app",
  messagingSenderId: "981989880822",
  appId: "1:981989880822:web:fc5bc5e91efecebbf50dd7"
})
    ),
       provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
