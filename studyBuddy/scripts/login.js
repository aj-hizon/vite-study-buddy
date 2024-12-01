import {
  auth,
  signInWithPopup,
  provider,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "../config/firebase";

import { checkUser } from "./app";


// Login
const loginForm = document.getElementById("login-form");
const loginGoogleBtn = document.getElementById("login-google-btn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    checkUser();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage); 
   })
});


loginGoogleBtn.addEventListener("click", (event) => {
  event.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user)
      checkUser();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
});
