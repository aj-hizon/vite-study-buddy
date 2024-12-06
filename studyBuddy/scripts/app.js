import { auth, provider, doc, getDoc, db } from "../config/firebase";

const dateFormat = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[date.getDay()];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() < 12 ? 'am' : 'pm';

  return `${dayName}, ${year}-${month}-${day}, ${hours}:${minutes}${ampm}`;
};

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
          window.location.href = "../profileSetups/profile-page/index.html#home";
        } else if (!userDoneProfileSetup) {
          window.location.href = "../profileSetups/profile-setup/index.html";
        } 
      }
    
      checkProfileSetup();
    } else {
    }
  });
}


export { checkUser, dateFormat };
