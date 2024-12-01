import { auth, onAuthStateChanged, getDoc, setDoc, doc, db } from "../../config/firebase";
import 'flowbite';

document.addEventListener("DOMContentLoaded", (event) => {
    onAuthStateChanged(auth, (user) => {
        if (user){
            async function getUserProfile(){
                const userName = document.getElementById("profile-page-username");
                const userEmail = document.getElementById("profile-page-email");
    
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                const firstName = docSnap.data().firstName;
                const lastName = docSnap.data().lastName;
                const email = docSnap.data().email;
                const course = docSnap.data().course;
                
                userName.textContent = firstName + " " + lastName;
                userEmail.textContent = email;
            }
            getUserProfile();
    
            const signOut = document.getElementById("btn-signout");
            signOut.addEventListener("click", (event) => {
                event.preventDefault();
                auth.signOut();
                window.location.href = "../../index.html";
            })
        } else {
            window.location.href = "../../index.html";
        }
    })
});







