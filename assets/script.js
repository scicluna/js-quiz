//DOMS
const pregame = document.getElementById('pregame')
const gameOne = document.getElementById('game-page-one')
const gameTwo = document.getElementById('game-page-two')
const qPrompt = document.getElementById('prompt')
const answerOne = document.getElementById('a1')
const answerTwo = document.getElementById('a2')
const answerThree = document.getElementById('a3')
const answerFour = document.getElementById('a4')
const result = document.getElementById('result')
const startBtn = document.getElementById('start')
const timeLeft = document.getElementById('time')
const answerBtns = document.querySelectorAll('.answer')
const finalScore = document.getElementById('final-score')
let initials = document.getElementById('initials')
const submitBtn = document.getElementById('submit')
const highScoreBtn = document.getElementById('high-score')
const backBtn = document.getElementById('back')
const highScoreList = document.getElementById('high-scores')
const gallery = document.getElementById('gallery')

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
let correct = 0

//stored variable
let highscores = JSON.parse(localStorage.getItem("highscores"))
if (!highscores){
    highscores = []
}

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
            endGame()
            }
    }, 1000)    
}

//Activate our answer buttons
function initAnswers(){
    answerBtns.forEach(answer => {
        answer.addEventListener('click', answerCheck);
    })
}

//Check for the correct answerc
function answerCheck(e){
    let answer = e.target.innerText
    if (answer === questionAnswer){
        result.innerText = "Correct!"
        correct++
        generateNewQuestion()
    } else {
        result.innerText = `Incorrect, the answer was: ${questionAnswer}`
        timeLeft.innerText -= 10
        generateNewQuestion()
    }
}

//Initiate the game
function startGame(){
    pregame.classList.add("hide")
    gameOne.classList.remove("hide")
    generateNewQuestion()
    timer()
    initAnswers()
}

function endGame(){
    gameOne.classList.add("hide")
    gameTwo.classList.remove("hide")
    finalScore.innerText = correct
}

function submitHighScore(){
    let highscore = `${correct} ${initials.value}`
    highscores.push(highscore)
    localStorage.setItem("highscores", JSON.stringify(highscores))
    gameTwo.classList.add("hide")
    pregame.classList.remove("hide")
}

function enterGallery(){
    clearInterval(time)
    gameOne.classList.add("hide")
    gameTwo.classList.add("hide")
    pregame.classList.add("hide")
    gallery.classList.remove("hide")
    
    //sorting the highscores (see below for credit)
    highscores.sort(sortThings) 

    highScoreList.innerText=''
    for (let i=0 ;i<highscores.length;i++){
        let hs = document.createElement("li")
        let hscontent = highscores[i]
        hs.append(hscontent)
        highScoreList.append(hs)
    }
}

function back(){
    gallery.classList.add("hide")
    pregame.classList.remove("hide")
}

//Start button functionality 
startBtn.addEventListener("click", startGame)
//Submit button functionality
submitBtn.addEventListener("click", submitHighScore)
//View highscores
highScoreBtn.addEventListener("click", enterGallery)
//Back button
backBtn.addEventListener("click", back)

//Sorting alg from https://www.digitalocean.com/community/tutorials/js-array-sort-strings -- used to sort the highscores
function sortThings(b, a) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    }
}

