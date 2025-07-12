import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyCPEpPaYZHGEKzXBTIGOACT0jT3ZI7TxaY",
  authDomain: "book-tracke--app.firebaseapp.com",
  projectId: "book-tracke--app",
  storageBucket: "book-tracke--app.appspot.com", 
  messagingSenderId: "173300001007",
  appId: "1:173300001007:web:1400a61dc9a65ace53931a",
  measurementId: "G-B5SMRKP940"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const analytics = getAnalytics(app);

export { auth };
