/* global $ */
/* exports isGameOver, whoWon, playTurn, restart, currentQuestion, correctAnswer, numberOfAnswers */

// A constructor function allows us to easily make question objects
function Question (prompt, answers, correctAnswerIndex) {
  this.prompt = prompt;
  this.choices = answers;
  this.correctChoice = correctAnswerIndex;
}

//data variable is a JSON store of Question object instances.
//Ensure that there are even number of questions
// TODO: To store data in external JSON file.
var data = [
    {
        prompt:"All of these animals have large ears (relative to their size) except one.",
        choices: ["Polar bears", "Foxes", "Bats", "Elephants"],
        correctChoice: 1
    },
    {
        prompt: "This species of great apes with long arms and reddish hair suffer habitat destruction due to logging, mining and forest fires.",
        choices: ["Orangutan","Gorilla","Baboons","Chimpanzee"],
        correctChoice:1
    },
    {
        prompt: "Ancient Japanese thought this animal caused earthquakes.",
        choices: ["Birds", "Spiders", "Snakes", "Frogs"],
        correctChoice: 2
    },
    {
        prompt: "This animal can clean its own ears with its 21-inch tongue.",
        choices:["Lizard","Elephant","Lion","Giraffe"],
        correctChoice:4
    },
    {
        prompt: "What is the breed of animal created from the crossing of a male lion and a female tiger?",
        choices:["Tigon","Tiges", "Liger", "Ligon"],
        correctChoice:3
    },
    {
        prompt: "What is the breed of animal created from the crossing of a female lion and a male tiger?",
        choices:["Tigen","Liger", "Tigon", "Liges"],
        correctChoice:3
    },

];

//questionSet  variable calls on function (almost like Constructor) to create an array of Question objects using the data variable.
var questionSet = function() {
        var qns=[];
        for(var i=0; i<data.length; i++){
            var qn = new Question(data[i].prompt, data[i].choices, data[i].correctChoice);
            //console.log(data[i]);
            qns.push(qn);
        }
        return qns;
}();


// we can create an object to represent all of the settings and scores for the quiz
var quiz = {
  currentQuestion: 0,
  questions: questionSet,
  isGameOver: false,
  player1Points: 0,
  player2Points: 0
};

// numberOfQuestions should return an integer that is the number of questions in a game
function numberOfQuestions () {
  return quiz.questions.length;
}

// currentQuestion should return an integer that is the zero-based index of the current question in the quiz
function currentQuestion () {
  return quiz.currentQuestion;
}

// correctAnswer should return an integer that is the zero-based index the correct answer for the currrent question
function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].correctChoice;
}

// numberOfAnswers should return an integer that is the number of choices for the current question
function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].choices.length;
}

// playTurn should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
function playTurn (choice) {
  //change from zero-index to one-index
  choice++;
  if (quiz.isGameOver) {
    return false;
  }
  var correct = false;
  if (choice === quiz.questions[quiz.currentQuestion].correctChoice) {
    correct = true;
    if (quiz.currentQuestion % 2) {quiz.player2Points++;
    } else {
     quiz.player1Points++;
    }
  }
  ++quiz.currentQuestion;
  if (quiz.currentQuestion === numberOfQuestions()) {
      quiz.isGameOver = true;
  }
  return correct;
}

// isGameOver should return a true or false if the quiz is over.
function isGameOver () {
  return quiz.isGameOver;
}

// whoWon should return 0 if the game is not yet finished, 1 or 2 depending on which player won, else 3 if the game is a draw.
function whoWon () {
  if (!quiz.isGameOver) return 0;
  if (quiz.player1Points > quiz.player2Points) return 1;
  if (quiz.player1Points < quiz.player2Points) return 2;
  return 3;
}

// restart should restart the game so it can be played again.
function restart () {
  quiz.currentQuestion = 0;
  quiz.isGameOver = false;
  quiz.player1Points = 0;
  quiz.player2Points = 0;
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
    $('h2').text((quiz.currentQuestion+1) + ') ' + quiz.questions[quiz.currentQuestion].prompt);
    // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
    $('button').eq(0).text(quiz.questions[quiz.currentQuestion].choices[0]);
    $('button').eq(1).text(quiz.questions[quiz.currentQuestion].choices[1]);
    $('button').eq(2).text(quiz.questions[quiz.currentQuestion].choices[2]);
    $('button').eq(3).text(quiz.questions[quiz.currentQuestion].choices[3]);
  }
  // update player scores regardless
  $('h3').eq(0).text('Player 1: ' + quiz.player1Points);
  $('h3').eq(1).text('Player 2: ' + quiz.player2Points);
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
