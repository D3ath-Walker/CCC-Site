const SERVER_URL = "https://ccc-site.onrender.com";

function startExam(){
fetch(`${SERVER_URL}/start-exam`)
.then(res=>res.text())
.then(data=>alert(data));
}

function resetExam(){
fetch(`${SERVER_URL}/reset-exam`)
.then(res=>res.text())
.then(data=>alert(data));
}

function setRound(){

const round =
document.getElementById("roundInput").value;

fetch(`${SERVER_URL}/set-round/${round}`)
.then(res=>res.text())
.then(data=>alert(data));

}

function loadSubmissions(){

fetch(`${SERVER_URL}/submissions`)
.then(res=>res.json())
.then(data=>{

const box =
document.getElementById("submissionsBox");

box.innerHTML = "";

data.forEach(sub => {

box.innerHTML += `
<div class="card">
<p>Name: ${sub.name}</p>
<p>Reg No: ${sub.regno}</p>
<p>Round: ${sub.round}</p>
<p>Time Left: ${sub.timeLeft}</p>
</div>
`;

});

});

}