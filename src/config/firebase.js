"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8j2cH2lS4z8hvIRlN1Tm73nbvQ6ldQxk",
  authDomain: "momley-project.firebaseapp.com",
  projectId: "momley-project",
  storageBucket: "momley-project.appspot.com",
  messagingSenderId: "551155575181",
  appId: "1:551155575181:web:de666dc986826ee99635c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
