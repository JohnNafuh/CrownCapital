import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtE70AdxT2k3hVzwxA4MlDM5pvSNJS6Y8",
  authDomain: "crowncapital-invest.firebaseapp.com",
  projectId: "crowncapital-invest",
  storageBucket: "crowncapital-invest.firebasestorage.app",
  messagingSenderId: "9373579357",
  appId: "1:9373579357:web:6c86ceeb96d4273137b5b4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const loginTab = document.querySelector(".login-tab");
  const accountTab = document.querySelector(".account-tab");

  if (!loginTab || !accountTab) return;

  if (user) {
    // USER LOGGED IN
    loginTab.innerText = "Account ✓";
    loginTab.href = "account.html";
    loginTab.style.opacity = "1";

    accountTab.style.display = "none";

  } else {
    // USER LOGGED OUT
    loginTab.innerText = "Login";
    loginTab.href = "login.html";
    accountTab.style.display = "inline-block";
  }
});

// optional logout function
window.logout = function () {
  signOut(auth);
};