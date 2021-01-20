// html elements
var highscoreEl = document.getElementById("viewHighscores");
var timeEl = document.getElementById("time");
var quizEl = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
var btnContainer = document.getElementById("button");
var quizBtn = btnContainer.querySelectorAll("button");
var rightOrWrong = document.getElementById("rightOrWrong");

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

var questionNumber = 0;
var score = 0
var initials = ""
var timeLeft = 60;

// event that starts quiz and timer
startBtn.addEventListener("click", function(){
    
    startBtn.style.display = "none";

    //cycles through answers based on the array and puts the text into each button
    for (var j=0; j<answers0.length; j++){
        quizBtn[j].style.display = "";
        quizBtn[j].textContent = answers0[j];
    };

    quizEl.children[0].textContent = questions[0];
    quizEl.children[1].textContent = " ";
    
    // change questions index when correct answer is selected
    
    
    timerCount();
    }
);

btnContainer.addEventListener("click", function(event){
    event.stopPropagation();
    
    // sets element to whatever button is clicked
    var element = event.target;

    // prevents code from running if any space outside the buttons is clicked
    if (element.matches("div")) {
        return;
    }; 

    // changes the question and answers if the right answer is selected which is done by comparing the selected answer to the correct answer array
    if (element.textContent !== correctAnswers[questionNumber]) {
        rightOrWrong.textContent = "Wrong!";
        score -= 5;
        timeLeft -= 5
    } 
    else if(questionNumber === 4 && element.textContent === correctAnswers[questionNumber]) {
        quizEl.children[0].textContent = "You Win!";
        timeLeft = 0;
        quizEl.children[1].textContent = "Final Score: " + score + " Please Enter Your Initials!";
        quizEl.children[2].setAttribute("type", "text");
        quizEl.children[3].textContent = "Submit";
        quizEl.children[3].setAttribute("id", "submitBtn");
        return;
    } 
    else {
        questionNumber++;
        quizEl.children[0].textContent = questions[questionNumber];
        quizBtn[0].textContent = answersArray[questionNumber][0];
        quizBtn[1].textContent = answersArray[questionNumber][1];
        quizBtn[2].textContent = answersArray[questionNumber][2];
        quizBtn[3].textContent = answersArray[questionNumber][3];
        rightOrWrong.textContent = "Correct!";
        score += 10;
        };
    });

// starts the timer countdown when the start quiz button is pressed
function timerCount() {

    if (timeLeft !== 60){
        timeLeft = 60;
    };

    var timeInterval = setInterval(function(){
        timeEl.textContent = "Time: " + timeLeft;
        if (timeLeft > 0){
            timeLeft--;
        }
        else if (quizEl.children[0].textContent === "You Win!"){
            timeEl.textContent = "Time: 0";
            clearInterval(timeInterval);
            return;
        }
        else {
            timeEl.textContent = "Time: 0";
            quizEl.children[0].textContent = "You Lose!";
            quizEl.children[1].textContent = "Final Score: " + score + " Please Enter Your Initials!";
            quizEl.children[2].setAttribute("type", "text");
            var submitScore = document.createElement("button");
            quizEl.appendChild(submitScore);
            quizEl.children[3].textContent = "Submit";
            quizEl.children[3].setAttribute("id", "submitBtn");
            clearInterval(timeInterval);
        };


    }, 1000);
    
    var submitBtn = document.getElementById("submitBtn");
    
    submitBtn.addEventListener("click", function(){
        localStorage.setItem("score", JSON.stringify(score));
        localStorage.setItem("initials", JSON.stringify(initials));
    });
};

// function that shows the high scores by removing other elements and shifts the page back to the quiz when another button is clicked
// function for button that clears high scores
// function for button that goes back to main menu
// function that stores high scores into local storage