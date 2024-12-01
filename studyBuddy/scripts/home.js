// Log out

import { auth } from "../config/firebase";
import { checkUser } from "./app";

const homeLogoutBtn  = document.getElementById("home-logout-btn");
homeLogoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click")
  auth.signOut();
})


