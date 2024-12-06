
import { checkUser } from "./app";

import { auth, onAuthStateChanged } from "../config/firebase";

const btnGetStarted = document.getElementById("btn-get-started");
btnGetStarted.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../auth/signup.html";
});

const btnJoinRevolution = document.getElementById("btn-join-revolution");
btnJoinRevolution.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../auth/signup.html";
});

// checkUser();

