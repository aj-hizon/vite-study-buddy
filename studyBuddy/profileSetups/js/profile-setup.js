import { arrayUnion } from "firebase/firestore";
import { addDoc, collection, db, serverTimestamp, auth, onAuthStateChanged, setDoc, doc } from "../../config/firebase";
import { dateFormat } from "../../scripts/app";


document.getElementById("profileForm").addEventListener("submit", function(event) {
    // Validate all required fields
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const course = document.getElementById("course").value;
    const yearLevel = document.getElementById("yearLevel").value;
    const gender = document.getElementById("gender").value;
    const subjectInterests = document.querySelectorAll('.modal-options input:checked');

    if (!firstName || !lastName || !course || !yearLevel || !gender || subjectInterests.length === 0) {
        alert("Please fill out all required fields and select at least one subject interest.");
        event.preventDefault(); // Prevent form submission
    } else {
        alert("Profile information submitted!");
        // Uncomment the line below if you want to redirect after submission
        window.location.href = "../splash-screen/index.html";
    }
});

// Show modal when clicking on the Subject Interest container
document.getElementById("subjectInterestContainer").addEventListener("click", function() {
    document.getElementById("subjectModal").style.display = "flex";
});

// Close modal when clicking 'Save'
document.getElementById("saveInterests").addEventListener("click", function() {
    const selectedInterests = Array.from(document.querySelectorAll('.modal-options input:checked'))
        .map(checkbox => checkbox.value)
        .join(', ');
        
    document.getElementById("subjectInterestContainer").innerHTML = `Selected Interests: ${selectedInterests || 'None'}`;
    document.getElementById("subjectModal").style.display = "none";
});

// Close modal when clicking 'Cancel'
document.getElementById("cancelModal").addEventListener("click", function() {
    document.getElementById("subjectModal").style.display = "none";
});


const submitBtn = document.querySelector(".submit-btn");
const profileForm = document.getElementById("profileForm");
let interest = [];

submitBtn.addEventListener("click",  (event) => {
    event.preventDefault();
    const firstName = profileForm["firstName"].value.trim();
    const lastName = profileForm["lastName"].value.trim();
    const course = profileForm["course"].value;
    const yearLevel = profileForm["yearLevel"].value;
    const gender = profileForm["gender"].value;

    // Get all checked values and put it inside of an array
    const selectedInterests = Array.from(document.querySelectorAll('.modal-options input:checked'))
        .map(checkbox => checkbox.value)

    console.log(firstName, lastName, course, yearLevel, gender, selectedInterests);

    // Validate required fields
    if (
        !firstName ||
        !lastName ||
        selectedInterests.length === 0 ||
        course === "Select your course" ||
        !yearLevel ||
        !gender
    ) {
        alert("Please fill out all required fields.");
        return;
    }

    onAuthStateChanged(auth, (user) => {
        if (user){
            const logAction = {
                action: "edit",
                date: dateFormat(new Date()),
                description: "Edited Profile Information"
              };
              
            const userData = {
                userId: user.uid,
                firstName: firstName,  
                lastName: lastName,
                course: course,
                yearLevel: yearLevel,
                gender: gender,
                interests: selectedInterests,
                doneProfileSetup: true,
                donePersonalizedQuiz: false,
                logHistory: arrayUnion(logAction)
            }
            
            async function addDataAndRedirect(){
                try {
                    const docRef = doc(db, 'users', user.uid);
                    await setDoc(docRef, userData, {merge: true});
                    window.location.href = "../personalized-quiz/index.html";
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




