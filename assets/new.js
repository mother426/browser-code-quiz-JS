const startBtn = document.getElementById("start");
const initialsInput = document.getElementById('high-scorer');
const postHighScoreButton = document.getElementById('post-high-score');
const nextQuestonBtn = document.getElementById("next-question");
const questionCard = document.getElementById("question-card");
const quizQuestion = document.getElementById("quiz-question");
const answerButton = document.querySelectorAll(".answer-btn");
const gameTimer = document.getElementById('game-timer');
const highScoreSection = document.getElementById('high-score-section');

var currentQuestionIndex = 0;

var secondsLeft = 100;

const questionsArray = [
  {
    question: "this is the text for question number 1 ",
    answers: [
      "option a",
      "correct answer",
      "option c",
      "option d",
    ],
    correctAnswer: "1",
  },
  {
    question: "2+2",
    answers: [
      "option a",
      "option b",
      "option c",
      "4",
    ],
    correctAnswer: "3",
  },
  {
    question: "this is the text for question number 3",
    answers: [
      "correct answer",
      "option b",
      "option c",
      "option d",
    ],
    correctAnswer: "0",
  },
];

// var initials = "";

postHighScoreButton.addEventListener('click', function(event){
  event.preventDefault();
  // console.log('key-value', leaderboardSpot)
  // console.log('name', name);
  // console.log('time', timeLeft);
  // localStorage.setItem("user", user);
  // localStorage.setItem("score", secondsLeft);
  storeHighScores();
});


function storeHighScores() {
  var storedHighScores = [];

  console.log(storedHighScores);
  if (localStorage.getItem('userInfo')) {
    storedHighScores = JSON.parse(localStorage.getItem('userInfo'));
  }
  var name = initialsInput.value.trim();
  var timeLeft = JSON.stringify(secondsLeft);
  // create a new leaderboardSpot object
  var leaderboardSpot = {
    initials: name,
    score: timeLeft,
  }
  console.log('right before push', storedHighScores);
  storedHighScores.push(leaderboardSpot);
  var highScoresString = JSON.stringify(storedHighScores);
  localStorage.setItem('userInfo', highScoresString);
  console.log(highScoresString)
  // now with submitted and rendered high score, save the list of scores to localstorage
  console.log(leaderboardSpot)
  renderHighScores();
};


var highScoreList = document.getElementById('high-score-list');

function renderHighScores() {
  // empty out the list in html
  highScoreList.innerHTML = "";
  // pull up local high score data AS AN ARRAY
  var allScores = JSON.parse(localStorage.getItem('userInfo'));
  // use new array to 
  allScores.forEach(function(score) {
    console.log(score);
    var newLi = document.createElement('li');
    newLi.textContent = JSON.stringify(score);
    highScoreList.appendChild(newLi);
  });
  
};


// initialsInput.addEventListener('input', function(event){
//   initials = (event.target.value);
// });
// function submitHighScore() {
//   // highScoreList.innerHTML = "";
  
//   // var newLi = document.createElement('li');
//   renderHighScores();
// };
function init() {
  // check to see if there are stored values
  // if there are stored values, render them in the score section 
  var savedScores = (localStorage.getItem('userInfo'));
  // var storedScore = (localStorage.getItem('score'));
  console.log(savedScores)
  // console.log(storedScore)
  if (savedScores !== null){
    
    renderHighScores();
  }
}





function startGame() {
  startBtn.classList.add("hidden");
  nextQuestonBtn.classList.add("hidden");
  questionCard.classList.remove("hidden");
  time = setInterval(function() {
    secondsLeft--;
    gameTimer.textContent = "Time left: " + secondsLeft;
    
    if(secondsLeft <= 0) {
        clearInterval(time);
        console.log('time up')
        endGame();
      }
  }, 1000);
  setQuestion();
}

function setQuestion() {
  const choices = questionsArray[currentQuestionIndex].answers;
  quizQuestion.innerHTML = questionsArray[currentQuestionIndex].question;
  // populate answer buttons with answers in questionsArray
  for (var i = 0; i < choices.length; i++) {
    answerButton[i].innerHTML = choices[i];  
    answerButton[i].setAttribute("data-answer", i)
  }
  // buttons linked to userAnswerInput function
}
function userAnswerInput(event) {
  const clickedAnswer = event.target.getAttribute("data-answer");
  const rightAnswer = questionsArray[currentQuestionIndex].correctAnswer;
  // check to see if user input matches correct answer
   if (clickedAnswer !== rightAnswer) {
     secondsLeft -= 10;
   } 
   currentQuestionIndex++;
   //check if any questions left 
   // if so
   if (currentQuestionIndex < questionsArray.length){
   setQuestion();
   } else {
       alert('game end')
       endGame();  
   }
};


function endGame() {
    
    clearInterval(time);
    highScoreSection.classList.remove("hidden");
    questionCard.classList.add("hidden");
};

// function goToNextQuestion() {
//   let choices = questionsArray[currentQuestionIndex].answers;
//   let buttonArray = Array.from(answerButton);
//   quizQuestion.innerHTML = questionsArray[currentQuestionIndex].question;
//   // populate answer buttons with answers in questionsArray
//   answerButton[0].innerHTML = choices.a;
//   answerButton[1].innerHTML = choices.b;
//   answerButton[2].innerHTML = choices.c;
//   answerButton[3].innerHTML = choices.d;
//   // buttons linked to userAnswerInput function
//   for (var i = 0; i < buttonArray.length; i++) {
//     buttonArray[i].addEventListener("click", userAnswerInput);
//   }
//   // if (currentQuestionIndex === questionsArray.length){
//   //     alert('no more questions')
//   // }
//   if (questionsArray.length === currentQuestionIndex) {
//     console.log("quiz end reached");
//   }
//   console.log(currentQuestionIndex);
// }


startBtn.addEventListener("click", startGame);


questionCard.addEventListener("click", function (event) {
  if(event.target.classList.contains('answer-btn')){
    userAnswerInput(event)
  }
});

init ();