import { arrayUnion, count, Timestamp } from "firebase/firestore";
import { auth, onAuthStateChanged, getDoc, setDoc, doc, db, serverTimestamp } from "../../config/firebase";
import 'flowbite';
import { dateFormat } from "../../scripts/app";

let userFirstName = "";
let userLastName = "";
let userCourse = "";
let userYearLevel = "";
let userGender = "";

document.addEventListener("DOMContentLoaded", (event) => {
    onAuthStateChanged(auth, (user) => {
        if (user){
            async function getUserDetails(){
                const userName = document.getElementById("profile-page-username");
                const userEmail = document.getElementById("profile-page-email");
                const personalInfoFirstName = document.getElementById("personalInfo-firstName");
                const personalInfoLastName= document.getElementById("personalInfo-lastName");
                const personalInfoCourse = document.getElementById("personalInfo-course");
                const personalInfoYearLevel = document.getElementById("personalInfo-yearLevel");
                const personalInfoGender = document.getElementById("personalInfo-gender");
                const containerLogHistory = document.getElementById("container-log-history");
                
                const profilePageName = document.getElementById("profile-page-name");
                const profilePageCourse = document.getElementById("profile-page-course");
                const profilePageYearLevel = document.getElementById("profile-page-yearLevel");
                const profilePageBio = document.getElementById("profile-page-bio");
                const profilePageInterests = document.getElementById("profile-page-interests");
                const profilePagePreferences = document.getElementById("profile-page-studyPreferences");
                
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                const { firstName, lastName, email, course, yearLevel, gender, logHistory, shortBio, interests, userPreference } = docSnap.data();

                const userLogHistory = logHistory
                userFirstName = firstName; 
                userLastName = lastName; 
                userCourse = course; 
                userYearLevel = yearLevel; 
                userGender = gender; 

                userName.textContent = firstName + " " + lastName;
                userEmail.textContent = email;
                personalInfoFirstName.textContent = firstName;
                personalInfoLastName.textContent = lastName;
                personalInfoCourse.textContent = course;
                personalInfoYearLevel.textContent = yearLevel + " Year" ;
                personalInfoGender.textContent = gender;
                
                profilePageName.textContent = firstName + " " + lastName;
                profilePageCourse.textContent = course;
                profilePageYearLevel.childNodes[0].nodeValue = yearLevel + " Year";
                profilePageBio.textContent = shortBio;
            

                userPreference.forEach(preference => {
                    const userPreferences = preference;
                    const logItem = document.createElement("li");
                    logItem.classList.add('flex', 'flex-col');

                    logItem.innerHTML = `
                     <p class="text-sm font-bold">${preference.question}</p>
                     <p class="flex-wrap bg-regular-blue py-[3rem] text-white text-sm font-semibold rounded-md text-center px-4">${preference.answer}</p>
                    `;

                    profilePagePreferences.appendChild(logItem);
                })
                
                interests.forEach(interest => {
                    const interests = interest;
                    const logItem = document.createElement("li");
                    logItem.classList.add('bg-regular-blue', 'py-[0.1rem]', 'px-4', 'text-white', 'text-sm', 'font-semibold', 'rounded-md');

                    logItem.innerHTML = `
                    ${
                        interests === "math" ? '➕' :
                        interests === "sciences" ? '🥼' :
                        interests === "tech" ? '🧑‍💻' :
                        interests === "coding" ? '⌨️' :
                        interests === "arts" ? '🎨' :
                        interests === "literature" ? '📖' : 
                        interests === "history" ? '📜' :
                        interests === "theater" ? '🎭' :
                        interests === "business" ? '🧑‍💼' :
                        interests === "media" ? '📸' :  "📖"
                    } 
                    ${interests.charAt(0).toUpperCase() + interests.slice(1)} 
                    `;
                    profilePageInterests.appendChild(logItem);
                });

                userLogHistory.reverse().forEach(e => {
                    const logItem = document.createElement("li");
                    logItem.classList.add('gap-x-4', 'flex', 'items-center', 'pb-8', 'border-b');

                    logItem.innerHTML = `
                        <div class="text-2xl">✏️</div>
                            <div class="">
                            <p class="text-sm text-gray-700">${e.date}</p>
                            <p class="text-md">${e.description}</p>
                        </div>
                    `
                    containerLogHistory.appendChild(logItem);
                })
            }
            getUserDetails();
    
            // Sign Out Button
            const signOut = document.getElementById("btn-signout");
            signOut.addEventListener("click", (event) => {
                event.preventDefault();
                auth.signOut();
                window.location.href = "../../index.html";
            })
        } else {
            window.location.href = "../../index.html";
        }

        // Sign Out settings Button
        const btnSignOutSettings = document.getElementById("btn-signOut-settings");
        btnSignOutSettings.addEventListener("click", (event) => {
            event.preventDefault();
            auth.signOut();
            window.location.href = "../../index.html";
        })

        // Button Edit profile
        const btnProfilePageEditProfile = document.getElementById("btn-profile-page-editProfile");
        btnProfilePageEditProfile.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "../profile-setup/index.html";
        })
        
    })
});


// EDIT FIRST NAME
const btnCancelFirstName = document.getElementById("btn-cancel-firstName");
const btnSaveFirstName = document.getElementById("btn-save-firstName");
const inputEditFirstName = document.getElementById("input-edit-firstName");
const personalInfoBreadCrumb = document.getElementById("personal-info-breadcrumb");

// Clear input fuild when cancelled
btnCancelFirstName.addEventListener("click", (event) => {
    inputEditFirstName.value = " ";
});

personalInfoBreadCrumb.addEventListener("click", (event) => {
    inputEditFirstName.value = " ";
});


// Save user data
btnSaveFirstName.addEventListener("click", (event) => {
    event.preventDefault();
    onAuthStateChanged(auth, (user) => {
        try {
            if (inputEditFirstName.value.trim()){
                // Make log history object;
                const logAction = {
                    action: "edit",
                    date: dateFormat(new Date()),
                    description: "Edited First Name from " + userFirstName + " to " + inputEditFirstName.value
                }

                const userData = {
                    firstName: inputEditFirstName.value,
                    logHistory: arrayUnion(logAction),
                }

                async function addData(){
                    try {
                        const docRef = doc(db, 'users', user.uid);
                        await setDoc(docRef, userData, {merge: true});
                        alert("New first name updated")
                        window.location.reload();
                    } catch (error) {
                        console.error();
                        alert("Something went wrong. Please try again.");
                    }
                }

                addData();
            } 
        } catch (error) {
            alert("Something went wrong. Please try again.")
        }
    })
})

// EDIT LAST NAME
const btnCancelLastName = document.getElementById("btn-cancel-lastName");
const btnSaveLastName = document.getElementById("btn-save-lastName");
const inputEditLastName= document.getElementById("input-edit-lastName");

btnCancelLastName.addEventListener("click", (event) => {
    inputEditLastName.value = " ";
});

btnSaveLastName.addEventListener("click", (event) => {
    event.preventDefault();
    onAuthStateChanged(auth, (user) => {
        try {
            if (inputEditLastName.value.trim()){
                // Make log history object;
                const logAction = {
                    action: "edit",
                    date: dateFormat(new Date()),
                    description: "Edited Last name from " + userLastName + " to " + inputEditLastName.value
                }

                const userData = {
                    lastName: inputEditLastName.value,
                    logHistory: arrayUnion(logAction),
                }

                async function addData(){
                    try {
                        const docRef = doc(db, 'users', user.uid);
                        await setDoc(docRef, userData, {merge: true});
                        alert("New last name updated")
                        window.location.reload();
                    } catch (error) {
                        console.error();
                        alert("Something went wrong. Please try again.");
                    }
                }

                addData();
            } 
        } catch (error) {
            alert("Something went wrong. Please try again.")
        }
    })
})


// EDIT COURSE
const btnCancelCourse = document.getElementById("btn-cancel-course");
const btnSaveCourse = document.getElementById("btn-save-course");
const inputEditCourse= document.getElementById("input-edit-course");

btnCancelCourse.addEventListener("click", (event) => {
    inputEditCourse.value = " ";
});

btnSaveCourse.addEventListener("click", (event) => {
    event.preventDefault();
    onAuthStateChanged(auth, (user) => {
        try {
            if (inputEditCourse.value.trim()){
                // Make log history object;
                const logAction = {
                    action: "edit",
                    date: dateFormat(new Date()),
                    description: "Edited course from " + userCourse + " to " + inputEditCourse.value
                }

                const userData = {
                    course: inputEditCourse.value,
                    logHistory: arrayUnion(logAction),
                }

                async function addData(){
                    try {
                        const docRef = doc(db, 'users', user.uid);
                        await setDoc(docRef, userData, {merge: true});
                        alert("New course updated")
                        window.location.reload();
                    } catch (error) {
                        console.error();
                        alert("Something went wrong. Please try again.");
                    }
                }

                addData();
            } 
        } catch (error) {
            alert("Something went wrong. Please try again.")
        }
    })
})


// EDIT YEAR LEVEL
const btnCancelYearLevel = document.getElementById("btn-cancel-yearLevel");
const btnSaveYearLevel = document.getElementById("btn-save-yearLevel");
const inputEditYearLevel = document.getElementById("input-edit-yearLevel");

btnCancelYearLevel.addEventListener("click", (event) => {
    inputEditYearLevel.value = " ";
});

btnSaveYearLevel.addEventListener("click", (event) => {
    event.preventDefault();
    onAuthStateChanged(auth, (user) => {
        try {
            if (inputEditYearLevel.value.trim()){
                // Make log history object;
                const logAction = {
                    action: "edit",
                    date: dateFormat(new Date()),
                    description: "Edited year level from " + userYearLevel + " year " + " to " + inputEditYearLevel.value + " year "
                }

                const userData = {
                    yearLevel: inputEditYearLevel.value,
                    logHistory: arrayUnion(logAction),
                }

                async function addData(){
                    try {
                        const docRef = doc(db, 'users', user.uid);
                        await setDoc(docRef, userData, {merge: true});
                        alert("New year level updated")
                        window.location.reload();
                    } catch (error) {
                        console.error();
                        alert("Something went wrong. Please try again.");
                    }
                }

                addData();
            } 
        } catch (error) {
            alert("Something went wrong. Please try again.")
        }
    })
})

// EDIT Gender
const btnCancelGender = document.getElementById("btn-cancel-gender");
const btnSaveGender = document.getElementById("btn-save-gender");
const inputEditGender = document.getElementById("input-edit-gender");

btnCancelGender.addEventListener("click", (event) => {
    inputEditGender.value = " ";
});

btnSaveGender.addEventListener("click", (event) => {
    event.preventDefault();
    onAuthStateChanged(auth, (user) => {
        try {
            if (inputEditYearLevel.value.trim()){
                // Make log history object;
                const logAction = {
                    action: "edit",
                    date: dateFormat(new Date()),
                    description: "Edited gender from " + userGender + " to " + inputEditGender.value
                }

                const userData = {
                    gender: inputEditGender.value,
                    logHistory: arrayUnion(logAction),
                }

                async function addData(){
                    try {
                        const docRef = doc(db, 'users', user.uid);
                        await setDoc(docRef, userData, {merge: true});
                        alert("New edited gender updated")
                        window.location.reload();
                    } catch (error) {
                        console.error();
                        alert("Something went wrong. Please try again.");
                    }
                }

                addData();
            } 
        } catch (error) {
            alert("Something went wrong. Please try again.")
        }
    })
})





   

// when save btn is clicked = data must send to the firestore and must put into log history ()

                //   {
                //      "userId": "123456",         // ID of the user making the change
                //      "action": "Update Profile", // General description of the action
                //      "field": "fullName",        // Specific field affected (e.g., "fullName" or "yearLevel")
                //      "beforeValue": "John Doe",  // Value before the change
                //      "afterValue": "Jane Smith", // Value after the change
                //      "timestamp": "2024-12-03T12:00:00Z" // ISO timestamp of when the change occurred
                //   } 
                 
// when cancel btn is clicked = clear the input field and go back to personal Info






