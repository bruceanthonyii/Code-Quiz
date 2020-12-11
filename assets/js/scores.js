function printHighscores() {
    // get scores from local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        // generate li element for each score
        var liGen = document.createElement("li");
        liGen.textContent = score.initials + " - " + score.score;

        // display score
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liGen);
    });
}

// clear score function
function clearScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearScores;

// begin script upon page open
printHighscores();