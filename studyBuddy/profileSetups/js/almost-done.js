import {
  db,
  auth,
  onAuthStateChanged,
  setDoc,
  doc,
} from "../../config/firebase";

function triggerFileInput() {
  // Trigger file input when user clicks on profile photo
  document.getElementById("profilePhotoInput").click();
}

function previewPhoto(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const profilePhotoDiv = document.querySelector(".profile-photo");

  // Check if a valid image file was selected
  if (file && file.type.startsWith("image/")) {
    reader.onload = function () {
      // Set the profile photo as the background image
      profilePhotoDiv.style.backgroundImage = `url(${reader.result})`;
      profilePhotoDiv.style.backgroundSize = "cover";
      profilePhotoDiv.style.backgroundPosition = "center";
      profilePhotoDiv.style.backgroundRepeat = "no-repeat";

      // Add class to remove the '+' symbol
      profilePhotoDiv.classList.add("has-photo");
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please upload a valid image file");
  }
}

function confirmSetup() {
  const bioField = document.querySelector("textarea");

  // Check if the bio field is filled in with sufficient content
  if (bioField.value.trim().length < 10) {
    alert("Please enter a longer bio (at least 10 characters).");
    return; // Stop function if bio is insufficient
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          shortBio: shortBio.value.trim(),
        };

        async function addDataAndRedirect() {
          try {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, userData, { merge: true });
            window.location.href = "../profile-created/index.html";
          } catch (error) {
            console.error();
            alert("Something went wrong. Please try again.");
          }
        }

        addDataAndRedirect();
      } else {
        // If user is not logged in, redirect to login page
        window.location.href = "../../auth/signup.html";
      }
    });
  }

  // Redirect to the intended page after the alert
}

function skipSetup() {
  // alert("Setup skipped!");
  // Add any additional logic here for skipping setup steps

  // Redirect to the intended page after the alert
  window.location.href = "../profile-created/index.html";
}

window.triggerFileInput = triggerFileInput;
window.previewPhoto = previewPhoto;
window.confirmSetup = confirmSetup;
window.skipSetup = skipSetup;
