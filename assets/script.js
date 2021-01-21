// html elements
var highscoreEl = document.getElementById("viewHighscores");
var timeEl = document.getElementById("time");
var quizEl = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
var btnContainer = document.getElementById("button");
var quizBtn = btnContainer.querySelectorAll("button");
var rightOrWrong = document.getElementById("rightOrWrong");
var inputForm = document.getElementById("finalScoreInput");
var submitBtn = document.getElementById("submitBtn");
var viewHighScoresPage = JSON.parse(localStorage.getItem("userInitialAndScore"))

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
    
    if (startBtn.textContent === "Main Menu"){
        window.location.reload()
        return;
    };
    // hides start button and view highscores when game is started
    startBtn.style.display = "none";
    highscoreEl.style.display = "none";

    //cycles through answers based on the array and puts the text into each button
    for (var j=0; j<answers0.length; j++){
        quizBtn[j].style.display = "initial";
        quizBtn[j].textContent = answers0[j];
    };

    // places first question into html 
    quizEl.children[0].textContent = questions[0];
    // removes game explaination
    quizEl.children[1].textContent = " ";
    // starts timer  
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
        score = score + timeLeft
        timeLeft = 0;
        startBtn.style.display = ""
        startBtn.textContent = "Main Menu"
        quizEl.children[1].textContent = "Final Score: " + score + " Please Enter Your Initials!";
        inputForm.textContent = "Please Enter Your Initials!";
        inputForm.style.display = "initial";
        submitBtn.style.display = "initial";
        for (var j=0; j<answers0.length; j++){
            quizBtn[j].style.display = "none";
            quizBtn[j].textContent = "";
        };
        rightOrWrong.textContent = ""
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
            quizEl.children[0].textContent = "Game Over!";
            score = score + timeLeft
            timeLeft = 0;
            startBtn.style.display = ""
            startBtn.textContent = "Main Menu"
            quizEl.children[1].textContent = "Final Score: " + score + " Please Enter Your Initials!";
            inputForm.textContent = "Please Enter Your Initials!";
            inputForm.style.display = "";
            submitBtn.style.display = "";
            for (var j=0; j<answers0.length; j++){
                quizBtn[j].style.display = "none";
                quizBtn[j].textContent = "";
            };
            rightOrWrong.textContent = ""
            clearInterval(timeInterval);
        };


    }, 1000);
    
};

  
submitBtn.addEventListener("click", function(){
    if (submitBtn.textContent === "Main Menu"){
        window.location.reload();
        return;
    };
    
    if (viewHighScoresPage === null || viewHighScoresPage.score < score) {
        quizEl.children[1].textContent = "Score Submitted!"
        var userInitialAndScore = {
            score: score,
            inputForm: inputForm.value.trim(),
        };
        
        localStorage.setItem("userInitialAndScore", JSON.stringify(userInitialAndScore));
        submitBtn.style.display = "none";
        }

    else if (viewHighScoresPage.score >= score){
        quizEl.children[1].textContent = "Sorry! Score Too Low!";
        inputForm.style.display = "none";
        submitBtn.style.display = "none";
        return;
    }
    ;
});



highscoreEl.addEventListener("click", function(){
    if (viewHighScoresPage !== null){
    timeEl.innerHTML = "";
    highscoreEl.textContent = "";
    startBtn.style.display = "none"
    quizEl.children[0].innerHTML = "High Scores";
    quizEl.children[1].textContent = "Initials: " + viewHighScoresPage.inputForm;
    quizEl.children[3].textContent = "Score: " + viewHighScoresPage.score;
    submitBtn.style.display = ""
    submitBtn.textContent = "Main Menu"
    }
    else {
    highscoreEl.textContent = "None to Display...Yet!"
    };
});
// function that shows the high scores by removing other elements and shifts the page back to the quiz when another button is clicked
// function for button that clears high scores
// function for button that goes back to main menu
// function that stores high scores into local storage