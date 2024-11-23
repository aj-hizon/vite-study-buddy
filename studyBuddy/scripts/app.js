

import { auth, provider } from '../config/firebase' 

// Checking if user is logged in or not
auth.onAuthStateChanged((user) => {
  if (user) {
      console.log("User is signed in.");
      console.log(user);
  } else {
      console.log("User is not signed in.");
      console.log(user);
  }
});


// Google Authentication
function googleAuth(event) {
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
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
} 



// Log out
// const homeLogoutBtn  = document.getElementById("home-logout-btn");
// homeLogoutBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("click")
//   auth.signOut();
// })

