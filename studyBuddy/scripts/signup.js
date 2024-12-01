import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  db, 
  serverTimestamp, 
  onAuthStateChanged,
  setDoc, 
  doc,
} from "../config/firebase";

import { checkUser } from "./app";

const signupGoogleBtn = document.getElementById("signup-google-btn");

// Signup new users
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const confirmPassword = signupForm["signup-confirm-password"].value;
  if (password != confirmPassword){
    alert("Password does not match!")
    signupForm.reset(); 
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Account created Successfuly!");

      console.log(user)
      
      onAuthStateChanged(auth, (user) => {
        if (user){
            const email = signupForm["signup-email"].value;
            const password = signupForm["signup-password"].value;

            const userData = {
                email: email,
                password: password,
                doneProfileSetup: false,
                donePersonalizedQuiz: false,
                dateAccountCreated: serverTimestamp(),
                emailDisplayName: user.displayName,
            }
            
            async function addDataAndRedirect(){
                try {
                    const docRef = doc(db, 'users', user.uid);
                    await setDoc(docRef, userData, {merge: true});
                    window.location.href = "../profileSetups/profile-setup/index.html";
                } catch (error) {
                    console.error();
                    alert("Something went wrong. Please try again.");
                }
            }

            addDataAndRedirect();
        } else {
            // If user is not logged in, redirect to login page
            window.location.href = "../../auth/login.html";
        }
    })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
      // ..
    });
});

signupGoogleBtn.addEventListener("click", (event) => {
  event.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      alert("Account created successfully!!") 

      console.log(user);
      onAuthStateChanged(auth, (user) => {
        if (user){
            const email = signupForm["signup-email"].value;

            const userData = {
                email: user.email,
                doneProfileSetup: false,
                donePersonalizedQuiz: false,
                dateAccountCreated: serverTimestamp(),
                emailDisplayName: user.displayName,
                photoUrl: user.photoURL,
            }
            
            async function addDataAndRedirect(){
                try {
                    const docRef = doc(db, 'users', user.uid);
                    await setDoc(docRef, userData, {merge: true});
                    window.location.href = "../profileSetups/profile-setup/index.html";
                } catch (error) {
                    console.error();
                    alert("Something went wrong. Please try again.");
                }
            }

            addDataAndRedirect();
        } else {
            // If user is not logged in, redirect to login page
            // window.location.href = "../../auth/login.html";
        }
    })
      
    })
    .catch((error) => {
    });
});

