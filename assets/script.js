// html elements
var highscoreEl = document.getElementById("viewHighscores");
var timeEl = document.getElementById("time");
var quizEl = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
var quizBtn = document.querySelector(".button");
// array containing questions
var questions = ["What is JavaScript?", "What HTML element is used to link to a JavaScript file?", "Which is not used to declare a variable in JavaScript?", "What goes inside the parentheses of a function?", "What symbol is used to by the compiler to separate JavaScript statements?"];

// array containing answers
var correctAnswers = ["programming language", "<script>", "be", "argument", ";"]

var answers0 = ["programming language", "sandwich", "coffee movie script", "reference book"]
var answers1 = ["<html>", "<script>", "<link>", "<java>"];
var answers2 = ["var", "let", "be", "const"];
var answers3 = ["conflict", "debate", "disagreement", "argument"];
var answers4 = [";", ":", "/", "$"]; 
var answersArray = [answers0, answers1, answers2, answers3, answers4];

// create buttons for choices on quiz
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");
var btnArray = [btn1, btn2, btn3, btn4];

var btnContainer = document.querySelector(".button");

var questionNumber = 0;

var score = 0

btnContainer.addEventListener("click", function(event){
    event.stopPropagation();
    // does not run while the timer = 0
    console.log(timeLeft)
    if (timeEl.textContent === 0 || timeEl.textContent === 60) {
        return;
    };
   
    // sets element to whatever button is clicked
    var element = event.target;
    
    // changes the question and answers if the right answer is selected which is done by comparing the selected answer to the correct answer array
    // ADD RIGHT AND WRONG TEXT UNDER BUTTONS WHEN ANSWERED, I THINK THIS WILL SOLVE THE PROBLEM TO MAKE THE ERROR FIRST EG (element.textContent !== correctAnswers[questionNumber] || questionNumber !== 5), (if wrong, then say wrong, else, say right)
    if (element.textContent !== correctAnswers[questionNumber]) {
        quizEl.children[3].textContent = "Wrong!";
        score -= 5;
        timeLeft -= 5
    } else {
        questionNumber++;
        quizEl.children[0].textContent = questions[questionNumber];
        quizBtn.children[0].textContent = answersArray[questionNumber][0];
        quizBtn.children[1].textContent = answersArray[questionNumber][1];
        quizBtn.children[2].textContent = answersArray[questionNumber][2];
        quizBtn.children[3].textContent = answersArray[questionNumber][3];
        quizEl.children[3].textContent = "Correct!";
        score += 10;
        };
    });

// function that starts a timer when the start button is clicked and clears when quiz is failed or ends
function quizQuestions(){
    startBtn.remove();
    quizEl.children[0].textContent = questions[0];
    quizEl.children[1].textContent = "";
    var rightOrWrong = document.createElement("div");
    quizEl.appendChild(rightOrWrong);
    
    // change questions index when correct answer is selected


    
    for (var j=0; j<btnArray.length; j++){
        // appends buttons to the question
        quizBtn.appendChild(btnArray[j]);
        //cycles through answers based on the array and puts the text into each button
        quizBtn.children[j].textContent = answers0[j];
    };
    
};

var timeLeft = 60;

// starts the timer countdown when the start quiz button is pressed
function timerCount() {

    var timeInterval = setInterval(function(){
        timeEl.textContent = "Time: " + timeLeft;
        timeLeft--;

            if (timeLeft <= -1) {
                timeEl.textContent = "Time: 0";
                clearInterval(timeInterval);
            };
    }, 1000);
};

// event that starts quiz and timer
startBtn.addEventListener("click", function(){
    timerCount();
    quizQuestions();
    }
);

// function that shows the high scores by removing other elements and shifts the page back to the quiz when another button is clicked
// function for button that clears high scores
// function for button that goes back to main menu
// function that stores high scores into local storage