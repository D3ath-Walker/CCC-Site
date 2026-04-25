const SERVER_URL = "https://ccc-site.onrender.com";

const registrationForm = document.getElementById('registration-form');
const registrationSection = document.getElementById('registration-section');
const examSection = document.getElementById('exam-section');
const showQuestionBtn = document.getElementById('show-question-btn');
const questionArea = document.getElementById('question-area');
const questionCode = document.getElementById('question-code');
const submitAnswerBtn = document.getElementById('submit-answer-btn');
const timerDisplay = document.getElementById('timer');
const examMessage = document.getElementById('exam-message');
const answerField = document.getElementById('answer');
const roundDisplay = document.getElementById("current-round");
const thankyouSection = document.getElementById("thankyou-section");

let examSubmitted = false;

setInterval(() => {

fetch(`${SERVER_URL}/exam-status`)
.then(res => res.json())
.then(data => {

if(data.examStarted){

showQuestionBtn.disabled = false;

examMessage.textContent =
"CCC has started. Click Show Question.";

}

});

},2000);

let countdownInterval = null;
let secondsLeft = 300;
let questionVisible = false;

const sampleQuestion = `function greet() {
  console.log("Hello, world!)
}

greet();`;

const correctedHint = `function greet() {
  console.log("Hello, world!");
}

greet();`;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

function enableExam() {
  showQuestionBtn.disabled = false;
  examMessage.textContent = 'The CCC is ready. Click "Show Question" when instructed.';
}

function loadRound(){
fetch(`${SERVER_URL}/round`)
.then(res=>res.json())
.then(data=>{
roundDisplay.textContent =
data.round;
});
}

function startTimer() {
  secondsLeft = 300;
  timerDisplay.textContent = formatTime(secondsLeft);
  submitAnswerBtn.disabled = false;
  questionVisible = true;
  questionArea.classList.remove('hidden');
  showQuestionBtn.disabled = true;
  examMessage.textContent = 'Write the corrected code below and submit before time ends.';

  countdownInterval = setInterval(() => {
    secondsLeft -= 1;
    timerDisplay.textContent = formatTime(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(countdownInterval);
      submitAnswerBtn.disabled = true;
      timerDisplay.textContent = '00:00';
      examMessage.textContent = 'Time is up. The submission is closed.';
    }
  }, 1000);
}

// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable copy/paste
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("paste", e => e.preventDefault());

// Detect tab switching
let warningCount = 0;

document.addEventListener("visibilitychange", () => {
    if(document.hidden && !examSubmitted){
        warningCount++;

        alert(`Warning! Tab switching detected (${warningCount}/3)`);

        if(warningCount >= 10){
            alert("You switched tabs too many times. Auto-submitting exam.");

            submitAnswerBtn.click();
        }
    }
});

// Disable inspect shortcuts
document.addEventListener("keydown", function(e){
    if(
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u")
    ){
        e.preventDefault();
    }
});

document.documentElement.requestFullscreen();

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  registrationSection.classList.add('hidden');
  examSection.classList.remove('hidden');

  examMessage.textContent = "Waiting for CCC to start...";
  loadRound();
  setInterval(loadRound,2000);
});

showQuestionBtn.addEventListener('click', () => {
if (!showQuestionBtn.disabled && !questionVisible) {
fetch(`${SERVER_URL}/question`)
.then(res => res.json())
.then(data => {
questionCode.textContent = data.question;
answerField.value = '';
startTimer();
});
}
});

submitAnswerBtn.addEventListener("click", () => 
{
  timeLeft: timerDisplay.textContent
  const answer = answerField.value;
  fetch(`${SERVER_URL}/submit-answer`,
  {
      method:"POST",
      headers:
      {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(
    {
        name: document.getElementById("name").value,
        regno: document.getElementById("regno").value,
        answer: answer,
        question: questionCode.textContent,
        timeLeft: timerDisplay.textContent 
    })
  })
  .then(res => res.text())
  .then(data => 
{
    if(data === "Submission saved")
    {
        submitAnswerBtn.disabled = true;
        examSubmitted = true;
        window.location.href = "thank.html";
    }
    else
    {
        alert(data);
    }
});
});

// Developer control: manually activate the question button by calling enableExam() in browser console.
window.enableExam = enableExam;
