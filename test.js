/*global isGameOver, whoWon, playTurn, restart, currentQuestion, numberOfQuestions, numberOfAnswers,  correctAnswer*/
/* quiz-tester.js
This script will test the game logic of your multiple choice quiz.
To use it you will need to include it in your html file after you main quiz script.
You will need to declare the following functions in the global scope:
# numberOfQuestions()
It should return an integer that is the number of questions in a game
# currentQuestion()
It should return an integer that is the zero-based index of the current question in the quiz
# correctAnswer()
It should return an integer that is the zero-based index the correct answer for the currrent question
# numberOfAnswers()
It should return an integer that is the number of choices for the current question



Else it should return either 1 or 2 depending on which player won.
It should return 3 if the game is a draw.

ASSUMPTIONS
It is assumed that the turns of the player will be automatically changed after each turn.
The application will console log all the passed or failed test */

var currentPlayer=1;
var currentQn=1;
var score=[0,0];

//qn, choice of answers, answer (zero-based index)
var questionSet=[ ["Q1", ["C", "W", "W", "W"], 0],
    ["Q1", ["C", "W", "W", "W"], 0],
    ["Q1", ["C", "W", "W", "W"], 0],
    ["Q1", ["C", "W", "W", "W"], 0]
];

// # restart()
// It should restart the game so it can be played again.
function restart() {
    currentPlayer=1;
    currentQn=0;
    score=[0,0];
}

// # isGameOver()
// It should return a true or false if the quiz is over.
function isGameOver() {
    return whoWon()? true: false;
}

// # whoWon()
// It should return 0 if the game is not yet finished.
function whoWon() {
    if (currentQn === numberOfQuestions()) {
        //test for Draw
        if(score[0]===score[1]) return 3;
        return (score[0]>score[1])? 1: 2;
    }
    return 0;
}

function numberOfQuestions() {
    return questionSet.length;
}

// # playTurn(choice)
// It should take a single integer, which specifies which choice the current player wants to make.
// It should return a boolean true/false if the answer is correct.
function playTurn(choice) {
    if(isGameOver()) {return false;}

    var correct=false;
    //check for correct answer.
    if(correctAnswer()===choice) {
        score[currentPlayer-1]++;
        correct=true;
    }
    //update qn and change player
    currentQn += (currentQn < numberOfQuestions())? 1: 0;
    currentPlayer = (currentPlayer===1)? 2:1;

    return correct;
}

function currentQuestion() {
    return currentQn;
}

function numberOfAnswers() {
    return questionSet[currentQuestion()][1].length;
}

function correctAnswer() {
    return questionSet[currentQuestion()][2];
}
