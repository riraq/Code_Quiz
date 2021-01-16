//html elements
var highscoreEl = document.getElementById("viewHighscores");
var timeEl = document.getElementById("time");
var quizEl = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
//array containing questions
var questions = ["What is JavaScript?", "What HTML element is used to link to a JavaScript file?", "Which is not used to declare a variable in JavaScript?", "What goes inside the parentheses of a function?", "What symbol is used to by the compiler to separate JavaScript statements?"];

//array containing answers
var answers = ["A programming language", "<script>", "be", "argument", ";"]

//function that starts a timer when the start button is clicked and clears when quiz is failed or ends
function timerCount() {
    var timeLeft = 60;

    var timeInterval = setInterval(function(){
        timeEl.textContent = "Time: " + timeLeft;
        timeLeft--;

            if (timeLeft === -1) {
                timeEl.textContent = "Time: 0";
                clearInterval(timeInterval);
            };
    }, 1000);
};

//event that starts quiz and timer
startBtn.addEventListener("click", function(){
    
    timerCount();
    }
);

//function that shows the high scores by removing other elements and shifts the page back to the quiz when another button is clicked
//function for button that clears high scores
//function for button that goes back to main menu
//function that stores high scores into local storage