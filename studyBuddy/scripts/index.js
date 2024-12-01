
import { checkUser } from "./app";

const btnGetStarted = document.getElementById("btn-get-started");
btnGetStarted.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../auth/signup.html";
} )


// checkUser();