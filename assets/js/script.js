// page state variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// DOM element variables
var questionsE1 = document.getElementById("questions");
var timerE1 = document.getElementById("time");
var choicesE1 = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsE1 = document.getElementById("initials");
var feedbackE1 = document.getElementById("feedback");

function beginQuiz() {
    // hide start screen
    var startScreenE1 = document.getElementById("start-screen");
    startScreenE1.setAttribute("class", "hide");

    // show questions
    questionsE1.removeAttribute("class");

    // start timer
    timerId = setInterval(clockTick, 1000);

    timerE1.textContent = time;

    retrieveQuestion();
}

function retrieveQuestion() {
    // get question from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title
    var titleE1 = document.getElementById("question-title");
    titleE1.textContent = currentQuestion.title;

    // clear choices
    choicesE1.innerHTML = "";

    // choice loop
    currentQuestion.choices.forEach(function(choice, i) {
        // create new choice
        var choiceButtons = document.createElement("button");
        choiceButtons.setAttribute("class", "choice");
        choiceButtons.setAttribute("value", choice);

        choiceButtons.textContent = i + 1 + ". " + choice;

        // event listner for each choice
        choiceButtons.onclick = questionSelect;

        choicesE1.appendChild(choiceButtons);
    });
}

function questionSelect() {
    // check for wrong answer
    if (this.value !== questions[currentQuestionIndex].answer) {
        // remove time for incorrect answer
        time -= 10;

        if (time < 0) {
            time = 0;
        }

        // change tiem on page
        timerE1.textContent = time;

        feedbackE1.textContent = "Incorrect!";
    } else {
        feedbackE1.textContent = "Correct!";
    }

    

    // display feedback on page
    feedbackE1.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackE1.setAttribute("class", "feedback hide");
    },1000);

    // next question
    currentQuestionIndex++;

    // end quiz after all questions are answered
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        retrieveQuestion();
    }
}

function endQuiz() {
    // stop time
    clearInterval(timerId);

    // display end screen
    var recordScreenE1 = document.getElementById("end-screen");
    recordScreenE1.removeAttribute("class");

    // display score
    var displayScoreE1 = document.getElementById("display-score");
    displayScoreE1.textContent = time;

    // hide questions
    questionsE1.setAttribute("class", "hide");
}

function clockTick() {
    // expend time
    time--;
    timerE1.textContent = time;

    // check to see if the test was completed before the time expired
    if (time <= 0) {
        endQuiz();
    }
}

function saveHighscore() {
    // get intials by extracting value of text input
    var initials = initialsE1.value.trim();

    // loop for empty input value
    if (initials !== "") {
        // retrieve scores form localStorage array
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to localStorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // move user to highscore page
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    // event for enter key pressed
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// click to enter initials
submitBtn.onclick = saveHighscore;

// click to begin quiz
startBtn.onclick = beginQuiz;

initialsE1.onkeyup = checkForEnter;