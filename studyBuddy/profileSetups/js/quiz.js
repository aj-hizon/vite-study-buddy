import { arrayUnion } from "firebase/firestore";
import {
  db,
  auth,
  onAuthStateChanged,
  setDoc,
  doc,
} from "../../config/firebase";
import { dateFormat } from "../../scripts/app";

let currentQuestion = 1;
let responses = []; // Array to store answers
let quizCompleted = false; // Track if the quiz is completed

const questions = [
  {
    question: "Collaboration Style",
    options: ["Pair", "Group", "Alone", "Mixed"],
  },
  {
    question: "Preferred Study Schedule",
    options: ["Morning", "Afternoon", "Evening", "Flexible"],
  },
  {
    question: "Study Style",
    options: [
      "Collaborative discussions",
      "Silent and focused",
      "Frequent breaks with chats",
      "Structured and planned sessions",
    ],
  },
  {
    question: "Study Pace",
    options: [
      "Fast-paced and intense",
      "Moderate",
      "Slow and steady",
      "Varies depending on the topic",
    ],
  },
  {
    question: "Preferred Study Tools",
    options: [
      "Digital (laptops, apps)",
      "Traditional (books, notebooks)",
      "Both",
      "No preference",
    ],
  },
];

// Back button event listener to navigate to previous question
document.querySelector(".back-btn").addEventListener("click", function () {
  if (currentQuestion > 1) {
    currentQuestion--;
    updateQuestion();

    // Highlight previously selected answer if it exists
    const previousAnswer = responses[currentQuestion - 1];
    if (previousAnswer) {
      document.querySelectorAll(".option-btn").forEach((btn) => {
        if (btn.textContent === previousAnswer) {
          btn.classList.add("selected");
        }
      });
    }

    // Update the progress bar step
    document
      .querySelectorAll(".progress-step")
      [currentQuestion].classList.remove("active");
  }
});

// Handle the Confirm button click
document.querySelector(".confirm-btn").addEventListener("click", function () {
  const selectedOption = document.querySelector(".option-btn.selected");
  if (!selectedOption) {
    alert("Please select an option before proceeding.");
    return;
  }

  // Save selected answer
  responses.push(selectedOption.textContent);

  // Move to next question or complete quiz
  if (currentQuestion < 5) {
    currentQuestion++;
    updateQuestion();
  } else {
    quizCompleted = true;
    updateSubmitButton(); // Trigger the button update when the quiz is completed
  }
});

// Option selection functionality
document.querySelectorAll(".option-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove 'selected' class from all buttons
    document
      .querySelectorAll(".option-btn")
      .forEach((b) => b.classList.remove("selected"));

    // Add 'selected' class to the clicked button
    this.classList.add("selected");
  });
});

// Update the question and options
function updateQuestion() {
  // Update question text
  document.querySelector(
    ".question"
  ).textContent = `Question ${currentQuestion}/5`;
  document.querySelector(".question-text").textContent =
    questions[currentQuestion - 1].question;

  // Update options
  const optionsContainer = document.querySelector(".options");
  optionsContainer.innerHTML = ""; // Clear existing options

  questions[currentQuestion - 1].options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;
    optionsContainer.appendChild(button);

    // Attach event listener to each button
    button.addEventListener("click", function () {
      // Highlight selected option
      document
        .querySelectorAll(".option-btn")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // Update progress bar
  document
    .querySelectorAll(".progress-step")
    [currentQuestion - 1].classList.add("active");
}

function updateSubmitButton() {
  const confirmBtn = document.querySelector(".confirm-btn");
  confirmBtn.textContent = "Submit"; // Change button text to 'Submit'

  // Remove previous event listeners to avoid stacking multiple listeners
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  // Add click event listener for redirection
  newConfirmBtn.addEventListener("click", function () {
    // Debugging log to check if event listener is triggered
    console.log("Submit button clicked!");

    // Redirect to splash screen
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const logAction = {
          action: "edit",
          date: dateFormat(new Date()),
          description: "Edited Personal Preferences"
        };

        const userData = {
          userPreference: [
            {
              question: "Collaboration Style",
              answer: responses[0].toLowerCase(),
            }, 
            {
              question: "Study Schedule",
              answer: responses[1].toLowerCase(),
            }, 
            {
              question: "Study Style",
              answer: responses[2].toLowerCase(),
            },
            {
              question: "Study Pace",
              answer: responses[3].toLowerCase(),
            },
            {
              question: "Study Tools",
              answer : responses[4].toLowerCase(),
            }
          ],
          donePersonalizedQuiz: true,
          logHistory: arrayUnion(logAction)
        };
        
        async function addDataAndRedirect(){
            try {
                const docRef = doc(db, 'users', user.uid);
                await setDoc(docRef, userData, {merge: true});
                window.location.href = "../almost-done/index.html";
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
  });
}
