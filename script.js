const quizData={
javascript:[
{q:"What does DOM stand for?",o:["Document Object Model","Data Object Model","Digital Object Method","Desktop Object Model"],a:0,e:"DOM lets JavaScript access and modify HTML elements."},
{q:"Which method adds an element at the end of an array?",o:["pop()","push()","shift()","unshift()"],a:1,e:"push() adds elements to the end of an array."},
{q:"typeof null returns?",o:["null","undefined","object","boolean"],a:2,e:"This is a historical JavaScript bug."},
{q:"Which keyword declares constant?",o:["var","let","const","static"],a:2,e:"const variables cannot be reassigned."},
{q:"JSON stands for?",o:["JavaScript Object Notation","Java Source Object Name","Java Serialized Object","None"],a:0,e:"JSON is used for data exchange."}
],
science:[
{q:"Symbol of Gold?",o:["Go","Au","Ag","Gd"],a:1,e:"Au comes from Latin word Aurum."},
{q:"Human bones count?",o:["186","206","226","246"],a:1,e:"Adults have 206 bones."},
{q:"Red Planet?",o:["Earth","Mars","Venus","Jupiter"],a:1,e:"Mars looks red due to iron oxide."},
{q:"Powerhouse of cell?",o:["Nucleus","Mitochondria","Ribosome","Chloroplast"],a:1,e:"Mitochondria generate energy."},
{q:"Speed of light?",o:["300k km/s","150k km/s","450k km/s","600k km/s"],a:0,e:"≈ 300,000 km/s."}
],
math:[
{q:"Value of π?",o:["3.14","2.71","1.41","4.2"],a:0,e:"π ≈ 3.14"},
{q:"15% of 200?",o:["20","25","30","35"],a:2,e:"(15/100)×200 = 30"},
{q:"√144?",o:["10","11","12","13"],a:2,e:"12×12=144"},
{q:"Longest side of right triangle?",o:["Base","Hypotenuse","Adjacent","Opposite"],a:1,e:"Hypotenuse is longest."},
{q:"7×8?",o:["54","56","58","60"],a:1,e:"7×8 = 56"}
]
};

let questions=[],index=0,answers=[],score=0,time=30,timer;

const startScreen=document.querySelector(".start-screen");
const quizScreen=document.querySelector(".quiz-screen");
const resultScreen=document.querySelector(".result-screen");

function fetchQuestions(cat){
return new Promise(res=>{
setTimeout(()=>res([...quizData[cat]].sort(()=>Math.random()-0.5)),600);
});
}

async function startQuiz(){
startScreen.classList.remove("active");
quizScreen.classList.add("active");
questions=await fetchQuestions(category.value);
index=0;answers=[];score=0;
showQuestion();startTimer();
}

function showQuestion(){
const q=questions[index];
questionText.innerText=q.q;
qCount.innerText=`Question ${index+1}/${questions.length}`;
progressBar.style.width=((index+1)/questions.length*100)+"%";
options.innerHTML="";
q.o.forEach((opt,i)=>{
const d=document.createElement("div");
d.className="option";
d.innerText=opt;
d.onclick=()=>select(i,d);
options.appendChild(d);
});
time=30;
}

function select(i,d){
answers[index]=i;
document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"));
d.classList.add("selected");
}

function nextQuestion(){
if(index<questions.length-1){index++;showQuestion();}
else finishQuiz();
}

function startTimer(){
clearInterval(timer);
timer=setInterval(()=>{
time--;
timer.innerText=`Time: ${time}s`;
if(time<=0) nextQuestion();
},1000);
}

async function finishQuiz(){
clearInterval(timer);
quizScreen.classList.remove("active");
await new Promise(r=>setTimeout(r,300));
resultScreen.classList.add("active");

reviewBox.innerHTML="<h3>Review Your Mistakes 🧐</h3>";
questions.forEach((q,i)=>{
if(answers[i]===q.a) score++;
else{
reviewBox.innerHTML+=`
<div class="review-item">
<p><b>Q:</b> ${q.q}</p>
<p style="color:red"><b>Your:</b> ${q.o[answers[i]]||"Not answered"}</p>
<p style="color:green"><b>Correct:</b> ${q.o[q.a]}</p>
<p><b>Why:</b> ${q.e}</p>
</div>`;
}
});

scoreText.innerText=`${score} / ${questions.length}`;
resultMsg.innerText=score>=4?"Excellent work ⭐":"Keep practicing 💪";
}

function restartQuiz(){
resultScreen.classList.remove("active");
startScreen.classList.add("active");
}
