const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const questions = require("./question");

mongoose.connect("mongodb://anmol:anmol123@ac-lgjvfp7-shard-00-00.uofn4he.mongodb.net:27017,ac-lgjvfp7-shard-00-01.uofn4he.mongodb.net:27017,ac-lgjvfp7-shard-00-02.uofn4he.mongodb.net:27017/cccDB?ssl=true&replicaSet=atlas-muk7e0-shard-0&authSource=admin&appName=Technova-ccc", {
  
    
})
.then(()=>{
console.log("MongoDB connected");
})
.catch(err=>{
console.log(err);
});

const submissionSchema = new mongoose.Schema({

name: String,

regno: String,

round: Number,

answer: String,

question: String,

timeLeft: String

});

const Submission =
mongoose.model("Submission", submissionSchema);

const app = express();

app.use(cors());
app.use(express.json());


// exam state
let examStarted = false;

// current round
let currentRound = 1;

// check exam status
app.get("/exam-status", (req,res)=>{

res.json({
examStarted: examStarted
})

});


// start exam (admin)
app.get("/start-exam",(req,res)=>{

examStarted = true;

res.send("Exam started");

});

// reset exam (admin)
app.get("/reset-exam",(req,res)=>{

examStarted = false;

res.send("Exam reset");

});


// get random question
app.get("/question",(req,res)=>{

if(!examStarted){

return res.status(403).json({
message:"Exam not started yet"
});

}

const randomIndex =
Math.floor(Math.random()*questions.length);
res.json({
question: questions[randomIndex]
});

});

function getFormattedTime(){
const date = new Date();
const minutes = date.getMinutes().toString().padStart(2,'0');
const seconds = date.getSeconds().toString().padStart(2,'0');
return `${minutes}:${seconds}`;
}

// set current round (admin)
app.get("/set-round/:round",(req,res)=>{

currentRound = Number(req.params.round);

res.send("Round set to " + currentRound);

});

// receive answer
app.post("/submit-answer", async (req,res)=>{
try{
const existing =
await Submission.findOne({
regno: req.body.regno,
round: currentRound
});
if(existing){
return res.status(400).send("Already submitted in this round");
}
const submission =
new Submission({
name: req.body.name,
regno: req.body.regno,
round: currentRound,
answer: req.body.answer,
question: req.body.question,
timeLeft: req.body.timeLeft 
});

await submission.save();
console.log("Saved to MongoDB");
res.send("Submission saved");
}
catch(error){
console.log(error);
res.status(500).send("Error saving");
}
});

// get current round
app.get("/round",(req,res)=>{
res.json({
round: currentRound
});

});
// start server
app.listen(3000,()=>{

console.log("CCC server running on port 3000");

});