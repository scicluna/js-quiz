//DOMS
const pregame = document.getElementById('pregame')
const gameOne = document.getElementById('game-page-one')
const gameTwo = document.getElementById('game-page-two')
const gallery = document.getElementById('gallery')
const qPrompt = document.getElementById('prompt')
const answerOne = document.getElementById('a1')
const answerTwo = document.getElementById('a2')
const answerThree = document.getElementById('a3')
const answerFour = document.getElementById('a4')
const result = document.getElementById('result')
const highScoreList = document.getElementById('high-scores')
const timeLeft = document.getElementById('time')
const finalScore = document.getElementById('final-score')
let initials = document.getElementById('initials')
const startBtn = document.getElementById('start')
const answerBtns = document.querySelectorAll('.answer')
const submitBtn = document.getElementById('submit')
const highScoreBtn = document.getElementById('high-score')
const backBtn = document.getElementById('back')
const tryBtn = document.getElementById('try-again')

//Our question bank (expand to see)
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
    16: {
        prompt: "What syntax denotes a conditional?",
        choices: ["for", "if", "let", "when"],
        answer: "if"
    },
    17: {
        prompt: "How do we normally begin a for loop?",
        choices: ["for (let i=0;i<array.length;i++)", "for (i<array)", "for let i=0;i<array.length;i++", "for i=array.length;i++"],
        answer: "for (let i=0;i<array.length;i++)"
    },
    18: {
        prompt: "What do we use for equal comparisons",
        choices: ["=", "!=", "===", "!"],
        answer: "==="
    },
    19: {
        prompt: "What is the symbol for 'not' in javascript?",
        choices: ["?", "!!", ">", "!"],
        answer: "!"
    },
    20: {
        prompt: "What array method would you call inorder to join two arrays together?",
        choices: [".join()", ".combine()", ".together()", ".concat()"],
        answer: ".concat()"
    },
    21: {
        prompt: "How do we feel about Javascript?",
        choices: ["WE LOVE IT", "WE LOVE IT", "WE LOVE IT", "WE LOVE IT"],
        answer: "WE LOVE IT"
    },
    22: {
        prompt: "Which is an example of a booleon",
        choices: ["x===y", "x+y", "y/x", "x+x"],
        answer: "x===y"
    },
    23: {
        prompt: "Booleons can be either ____ or False",
        choices: ["true", "correct", "good", "greater"],
        answer: "true"
    },
    24: {
        prompt: "What syntax denotes an object",
        choices: ["[]", "()", "<>", "{}"],
        answer: "{}"
    },
    24: {
        prompt: "If x=0 and y=1, what does console.log(x+y) print?",
        choices: ["x+y", "xy", "NaN", "1"],
        answer: "1"
    },
    25: {
        prompt: "Which method adds an event listener to a DOM element?",
        choices: [".listenclick", ".addeventlistener", ".clickon", ".addEventListener"],
        answer: ".addEventListener"
    },
    26: {
        prompt: "What data-type is NaN?",
        choices: ["number", "booleon", "string", "object"],
        answer: "number"
    },
    27: {
        prompt: "Inside which HTML tag do we link our JS file",
        choices: ["<style>", "<href>", "<rel>", "<script>"],
        answer: "<script>"
    },
    28: {
        prompt: "What is the syntax used to grab an HTML element based on its ID?",
        choices: ["document.getId(element)", "document.querySelector(element)", "document.getElement(element)", "document.getElementById(element)"],
        answer: "document.getElementById(element)"
    },
    29: {
        prompt: "Which is an example of calling a function",
        choices: ["theFunction()", "theFunction(){}", "call theFunction()", "do theFunction()"],
        answer: "theFunction()"
    },
    30: {
        prompt: "What does the syntax: while do?",
        choices: ["It runs a code block repeatedly for so long as a conditional is still true", "It checks the state of a code block", "It ends a for-loop", "While isn't a real syntax"],
        answer: "It runs a code block repeatedly for so long as a conditional is still true"
    },
    31: {
        prompt: "Which is an example of initializing a variable?",
        choices: ["let x = 5", "x = 5", "init x = 5", "x is 5"],
        answer: "let x = 5"
    },
    32: {
        prompt: "What method would we call upon to sort an array?",
        choices: [".arrange()", ".reorder()", ".order()", ".sort()"],
        answer: ".sort()"
    },
    33: {
        prompt: "What method would we call upon to determine the length of a string or array?",
        choices: [".length", ".size", ".number", ".value"],
        answer: ".length"
    },
    34: {
        prompt: "What method allows us to turn a string into an array?",
        choices: [".splice()", ".split()", ".slice()", ".join()"],
        answer: ".split()"
    },
    35: {
        prompt: "What method would we call upon to make letters in a string lowercase?",
        choices: [".toLowerCase()", ".LowerCase()", ".small", ".toUpperCase()"],
        answer: ".toLowerCase()"
    },
    36: {
        prompt: "What syntax do we use to get a random number 0-1",
        choices: ["Math.random()", "math.random()", "random.math()", ".roulette()"],
        answer: "Math.random()"
    },
    37: {
        prompt: "What array method do we use to reverse the order of the array?",
        choices: [".direction()", ".reversesort()", ".change()", ".reverse()"],
        answer: ".reverse()"
    },
    38: {
        prompt: "What does the following code output? let x; console.log(x)",
        choices: ["undefined", "NaN", "x", "let x"],
        answer: "undefined"
    },
    39: {
        prompt: "What syntax is a shortcut for adding one to a variable value?",
        choices: ["++", "+=", "+", "+1"],
        answer: "++"
    },
    40: {
        prompt: "What array index always points to the last element of the array?",
        choices: ["[arraylength]", "[length]", "[array.length]", "[array.length-1]"],
        answer: "[array.length-1]"
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
    questionChoices.sort((a,b) => 0.5 - Math.random()) //***** Optional for grader: How does this work?
    writeQuestion()
}

//Write answers to the DOM
function writeQuestion(){
    qPrompt.innerText = questionPrompt
    answerOne.innerText = questionChoices[0]
    answerTwo.innerText = questionChoices[1]
    answerThree.innerText = questionChoices[2]
    answerFour.innerText = questionChoices[3]
}

//Start our timer
function timer(){
    //reset to the top of our timer
    timeLeft.innerText = 75
    //Begin the setInterval
    time = setInterval(function(){
        //Tick timeLeft down every second
        timeLeft.innerText--
        //Ending the game if the time is 0 or lower
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
    //Else, it must have been wrong, so deduct 10 seconds -> then generate a new question
    } else {
        result.innerText = `Incorrect, the answer was: ${questionAnswer}`
        //If we had less than 10 seconds left, the game ends and the timer is set to 0
        if (timeLeft.innerText < 10){
            timeLeft.innerText  = 0
            clearInterval(time)
            endGame()
        } else timeLeft.innerText -= 10
        generateNewQuestion()
    }
    //If we're out of time, the game ends and the timer clears. Just an extra check to make sure the game ends on time.
    if (timeLeft.innerText<=0){
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
    highscores.sort().reverse()
    //Some formatting hacks to make sure that the highscore list is ordered from top score to lowest score
    if (correct < 10){
        highscore = `0${correct} ${initials.value}`
    } else highscore = `${correct} ${initials.value}`
    //Keeping the high-score list to only the top 10 items for the sake of presentation and storage
    if (highscores.length > 9){
        highscores.pop()
    }
    //Push the highscore message into the highscores array
    highscores.push(highscore)
    //Setting that highscores array into local storage
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
    
    //Sorting the highscores
    highscores.sort().reverse()

    //Displaying all of the highscores
    highScoreList.innerText=''
    for (let i=0 ;i<highscores.length;i++){
        let hs = document.createElement("li")
        let hscontent = highscores[i]
        hs.append(hscontent)
        highScoreList.append(hs)
    }
}

//Moving us back to the pregame screen
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
