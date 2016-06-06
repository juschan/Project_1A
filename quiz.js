/* global $ */
/* exports isGameOver, whoWon, playTurn, restart, currentQuestion, correctAnswer, numberOfAnswers */


var currentPlayer=1;
var currentQn=1;
var score=[0,0];

var questionSet=[ ["All of these animals have large ears (relative to their size) except one.", ["Polar bears", "Foxes", "Bats", "Elephants"], 0],
    ["This species of great apes with long arms and reddish hair suffer habitat destruction due to logging, mining and forest fires.", ["Orangutan","Gorilla","Baboons","Chimpanzee"], 0],
    ["Ancient Japanese thought this animal caused earthquakes.",["Birds", "Spiders", "Snakes", "Frogs"], 1],
    ["This animal can clean its own ears with its 21-inch tongue.", ["Lizard","Elephant","Lion","Giraffe"], 3],
    ["What is the breed of animal created from the crossing of a male lion and a female tiger?", ["Tigon","Tiges", "Ligon", "Liger"], 3],
    ["What is the breed of animal created from the crossing of a female lion and a male tiger?", ["Tigen","Liger", "Tigon", "Liges"], 2]
];


function currentQuestion() { return currentQn; }

function numberOfAnswers() {return questionSet[currentQuestion()][1].length;}

function correctAnswer() { return questionSet[currentQuestion()][2];}

function numberOfQuestions() {return questionSet.length;}



// playTurn should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
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

// isGameOver should return a true or false if the quiz is over.
function isGameOver() {
    return whoWon()? true: false;
}

// whoWon should return 0 if the game is not yet finished, 1 or 2 depending on which player won, else 3 if the game is a draw.
function whoWon() {
    if (currentQn === numberOfQuestions()) {
        //test for Draw
        if(score[0]===score[1]) return 3;
        return (score[0]>score[1])? 1: 2;
    }
    return 0;
}

// restart should restart the game so it can be played again.
function restart() {
    currentPlayer=1;
    currentQn=0;
    score=[0,0];
}

// a function to update the display whenever the data changes
function updateDisplay () {
  if (isGameOver()) {
    var status=["Game Over. The winner is Player 1.",
        "Game Over. The winner is Player 2",
        "Game Over. It is a DRAW!"];
    $('h2').text(status[whoWon()-1]);//update
    $('div').toggle();//hide
    $('start').toggle();//show
  } else {
    $('h2').text((currentQuestion()+1) + ') ' + questionSet[currentQuestion()][0]);
    // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
    $('button').eq(0).text(questionSet[currentQuestion()][1][0]);
    $('button').eq(1).text(questionSet[currentQuestion()][1][1]);
    $('button').eq(2).text(questionSet[currentQuestion()][1][2]);
    $('button').eq(3).text(questionSet[currentQuestion()][1][3]);
  }
  // update player scores regardless
  $('h3').eq(0).text('Player 1: ' + score[0]);
  $('h3').eq(1).text('Player 2: ' + score[1]);
}

// the jQuery ready function will add click listeners once the dom is loaded
$(function () {

  //When start button is pressed
  $('start').click(function () {
      $('div').show();
      $('start').toggle();
      restart();
      updateDisplay();
  });


  $('button').click(function () {
    // if gameover then restart else log a player turn
    if (isGameOver()) {

    } else {
      // can use jquery index() to find the position of this element in relation to its siblings. works as only answers are in this container
      playTurn($(this).index());
      //console.log("Index: " + $(this).index());
    }
    updateDisplay();
  });




});
