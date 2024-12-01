import { auth, provider, doc, getDoc, db } from "../config/firebase";

// Checking if user is logged in or not
function checkUser() {
  auth.onAuthStateChanged((user) => { 
    if (user){
      console.log(user)
      async function checkProfileSetup() {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userDonePersonalizedQuiz = docSnap.data().donePersonalizedQuiz;
        const userDoneProfileSetup = docSnap.data().doneProfileSetup;
  
        if (
          user &&
          window.location.pathname !== "../profileSetups/profile-page/index.html" &&
          userDoneProfileSetup
        ) {
          window.location.href = "../profileSetups/profile-page/index.html";
        } else if (!userDoneProfileSetup) {
          window.location.href = "../profileSetups/profile-setup/index.html";
        } 
      }
    
      checkProfileSetup();
    } else {
    }
  });
}


export { checkUser };
