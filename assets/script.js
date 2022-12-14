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
const tryBtn = document.getElementById('try-again')

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
    },
    3: {
        prompt: "Which is an example of camel case?",
        choices: ["CoRrEcTaNsWeR", "CorrectAnswer", "correctAnswer", "correctanswer"],
        answer: "correctAnswer"
    },
    4: {
        prompt: "What is the output? console.log('hello world!')",
        choices: ["null", "NaN", "undefined", "hello world!"],
        answer: "hello world!"
    },
    5: {
        prompt: "What is the output? console.log('a+b')",
        choices: ["null", "undefined", "a+b", "ab"],
        answer: "a+b"
    },
    6: {
        prompt: "What is the output? console.log(5+5)",
        choices: ["undefined", "55", "5+5", "10"],
        answer: "10"
    },
    7: {
        prompt: "What is the output? console.log('a'+5)",
        choices: ["a5", "a+5", "NaN", "undefined"],
        answer: "a5"
    },
    8: {
        prompt: "What is the output? console.log('word'+'fact')",
        choices: ["wordfact", "word+fact", "undefined", "word fact"],
        answer: "wordfact"
    },
    9: {
        prompt: "What is the output? console.log(5*5)",
        choices: ["NaN", "10", "25", "55"],
        answer: "25"
    },
    10: {
        prompt: "What is the output? console.log(this)",
        choices: ["error", "undefined", "this", "Window Object"],
        answer: "Window Object"
    },
    11: {
        prompt: "What is the output? console.log('a'-'b')",
        choices: ["a-b", "ab", "ba", "NaN"],
        answer: "NaN"
    },
    12: {
        prompt: "Which is the proper format for a function?",
        choices: ["function({})", "function{}", "function{}", "function(){}"],
        answer: "function(){}"
    },
    13: {
        prompt: "Which array is formatted properly?",
        choices: ["[1.2.3.4]", "[1/2/3/4]", "[1 2 3 4]", "[1,2,3,4]"],
        answer: "[1,2,3,4]"
    },
    14: {
        prompt: "Which answer is a string?",
        choices: ["{word}", "[word]", "'word'", "let word"],
        answer: "'word'"
    },
    15: {
        prompt: "What is x called? function(x){}",
        choices: ["A key", "A code", "A string", "A perameter"],
        answer: "A perameter"
    },

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
    timeLeft.innerText = 75
    time = setInterval(function(){
        timeLeft.innerText--
        if(timeLeft.innerText <= 0){
            clearInterval(time)
            endGame()
            }
    }, 1000)    
}

//Activate our answer buttons --- to prevent weird nonsense like pre-game clicking
function initAnswers(){
    answerBtns.forEach(answer => {
        answer.addEventListener('click', answerCheck);
    })
}

//Check for the correct answers
function answerCheck(e){
    let answer = e.target.innerText
    //If it's correct, tick up correct -> then generate a new question
    if (answer === questionAnswer){
        result.innerText = "Correct!"
        correct++
        generateNewQuestion()
    //else, it must have been wrong, so deduct 10 seconds -> then generate a new question
    } else {
        result.innerText = `Incorrect, the answer was: ${questionAnswer}`
        timeLeft.innerText -= 10
        generateNewQuestion()
    }
    if (timeLeft.innerText<0){
        clearInterval(time)
        endGame()
    }
}

//Initiate the game
function startGame(){
    correct = 0
    result.innerText = ''
    //"Moving" through 'pages'
    pregame.classList.add("hide")
    gameOne.classList.remove("hide")
    //Generating our first question, starting our timers, and activating our answer buttons
    generateNewQuestion()
    timer()
    initAnswers()
}

//Forcing the player to the finished 'page'
function endGame(){
    gameOne.classList.add("hide")
    gameTwo.classList.remove("hide")
    finalScore.innerText = correct
}

//Submitting the high score and saving it into local storage
function submitHighScore(){
    let highscore;
    highscores.sort(sortThings) 
    if (correct < 10){
        highscore = `0${correct} ${initials.value}`
    } else highscore = `${correct} ${initials.value}`

    if (highscores.length > 9){
        highscores.pop()
    }
    highscores.push(highscore)
    localStorage.setItem("highscores", JSON.stringify(highscores))
    //Moving us back to pregame
    gameTwo.classList.add("hide")
    pregame.classList.remove("hide")
}

//Handling the "view high scores" button
function enterGallery(){
    //Stop the time
    clearInterval(time)
    //Moving us to the gallery
    gameOne.classList.add("hide")
    gameTwo.classList.add("hide")
    pregame.classList.add("hide")
    gallery.classList.remove("hide")
    
    //Sorting the highscores (see below for credit)
    highscores.sort(sortThings) 

    //Displaying all of the highscores
    highScoreList.innerText=''
    for (let i=0 ;i<highscores.length;i++){
        let hs = document.createElement("li")
        let hscontent = highscores[i]
        hs.append(hscontent)
        highScoreList.append(hs)
    }
}

//Moving us from our gallery back to the pregame screen
function back(){
    gallery.classList.add("hide")
    gameTwo.classList.add("hide")
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
//Try again
tryBtn.addEventListener("click", back)

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

