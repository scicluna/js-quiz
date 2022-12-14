//DOMS
const qPrompt = document.getElementById('prompt')
const answerOne = document.getElementById('a1')
const answerTwo = document.getElementById('a2')
const answerThree = document.getElementById('a3')
const answerFour = document.getElementById('a4')
const result = document.getElementById('result')
const startBtn = document.getElementById('start')
const timeLeft = document.getElementById('time')
const answerBtns = document.querySelectorAll('.answer')

//Our question bank
const questionbank = {
    0: {
        prompt: "What is javascript?",
        choices: ["I don't know", "A computer", "A word processor", "A programming language"],
        answer: "A programming language"
    },
    1: {
        prompt: "What number do indexes begin at in javascript?",
        choices: ["0", "1", "-1", "It depends"],
        answer: "0"
    },
    2: {
        prompt: "What syntax denotes an array?",
        choices: ["[]", "{}", "()", "."],
        answer: "[]"
    }
}
//Useful variables
let questionPrompt;
let questionChoices;
let questionAnswer;
let time;

//Pick a random question from our questionbank
function randomQuestion(){
    let randomIndex = Math.floor(Math.random()*Object.keys(questionbank).length)
    return questionbank[randomIndex]
}

//Generate a new question prompt/choices/answer
function generateNewQuestion(){
    let question = randomQuestion()
    questionPrompt = question.prompt
    questionChoices = question.choices
    questionAnswer = question.answer
    //alg to shuffle an array provided by https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    questionChoices.sort((a,b) => 0.5 - Math.random())
    writeDom()
}

//Write answers to the DOM
function writeDom(){
    qPrompt.innerText = questionPrompt
    answerOne.innerText = questionChoices[0]
    answerTwo.innerText = questionChoices[1]
    answerThree.innerText = questionChoices[2]
    answerFour.innerText = questionChoices[3]
}

//Start our timer
function timer(){
    time = setInterval(function(){
        timeLeft.innerText--
        if(timeLeft.innerText <= 0){
            clearInterval(time)
            console.log("Out of time! -> Insert end screen here")}
    }, 1000)    
}

//Activate our answer buttons
function initAnswers(){
    answerBtns.forEach(answer => {
        answer.addEventListener('click', answerCheck);
    })
}

function answerCheck(e){
    let answer = e.target.innerText
    if (answer === questionAnswer){
        result.innerText = "Correct!"
        generateNewQuestion()
    } else {
        result.innerText = `Incorrect, the answer was: ${questionAnswer}`
        timeLeft.innerText -= 10
        generateNewQuestion()
    }
}


//Initiate the game
function startGame(){
    generateNewQuestion()
    timer()
    initAnswers()
}

//Start button functionality --- once:true makes it so you can't click it again
startBtn.addEventListener("click", startGame, {once:true})
