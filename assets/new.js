const startBtn = document.getElementById("start");
const initialsInput = document.getElementById('high-scorer');
const postHighScoreButton = document.getElementById('post-high-score');
const questionCard = document.getElementById("question-card");
const quizQuestion = document.getElementById("quiz-question");
const answerButton = document.querySelectorAll(".answer-btn");
const gameTimer = document.getElementById('game-timer');
const highScoreInput = document.getElementById('high-score-input');
const clearButton = document.getElementById('clear-high-score');
const restartQuiz = document.getElementById('restart-quiz');
const startScreen = document.getElementById('start-screen');

var currentQuestionIndex = 0;

var secondsLeft = 100;

const questionsArray = [
  {
    question: "Who is the creator of JavaScript?",
    answers: [
      "Steve Jobs",
      "Brendan Eich",
      "Elon Musk",
      "Nikola Tesla",
    ],
    correctAnswer: "1",
  },
  {
    question: "What is the typeof an array?",
    answers: [
      "string",
      "number",
      "boolean",
      "object",
    ],
    correctAnswer: "3",
  },
  {
    question: "Which of these is the modulo operator?",
    answers: [
      "%",
      "+",
      "-",
      "/",
    ],
    correctAnswer: "0",
  },
  {
    question: "Which tag is used to create a paragraph?",
    answers: [
      "&lth1&gt",
      "&lthr&gt",
      "&ltp&gt",
      "&ltbr&gt",
    ],
    correctAnswer: "2"
  },
  {
    question: "Which one of these is not a file type?",
    answers: [
      ".html",
      ".js",
      ".css",
      ".www",
    ],
    correctAnswer: "3"
  },
  {
    question: "How many elements can share an ID in html?",
    answers: [
      "3",
      "1",
      "12",
      "0",
    ],
    correctAnswer: "3"
  },
  {
    question: "Where is the CSS file linked in an HTML file?",
    answers: [
      "At the end of the body",
      "At the end of the Head",
      "Inside the body",
      "Inside the href",
    ],
    correctAnswer: "1"
  }
];

function startGame() {
  startScreen.classList.add("hidden");
  questionCard.classList.remove("hidden");
  time = setInterval(function() {
    secondsLeft--;
    gameTimer.textContent = "Time left: " + secondsLeft;
    
    if(secondsLeft <= 0) {
      clearInterval(time);
      alert('You ran out of time');
      endGame();
    }
  }, 1000);
  setQuestion();
};

function setQuestion() {
  const choices = questionsArray[currentQuestionIndex].answers;
  quizQuestion.innerHTML = questionsArray[currentQuestionIndex].question;
  for (var i = 0; i < choices.length; i++) {
    answerButton[i].innerHTML = choices[i];  
    answerButton[i].setAttribute("data-answer", i)
  }
};

function userAnswerInput(event) {
  const clickedAnswer = event.target.getAttribute("data-answer");
  const rightAnswer = questionsArray[currentQuestionIndex].correctAnswer;
  if (clickedAnswer !== rightAnswer) {
    secondsLeft -= 10;
  } 
  currentQuestionIndex++;
  if (currentQuestionIndex < questionsArray.length){
    setQuestion();
  } else {
    alert('Thanks for playing~')
    endGame();  
  }
};

function storeHighScores() {
  var storedHighScores = [];
  
  console.log(storedHighScores);
  if (localStorage.getItem('userInfo')) {
    storedHighScores = JSON.parse(localStorage.getItem('userInfo'));
  }
  var name = initialsInput.value.trim();
  var timeLeft = JSON.stringify(secondsLeft);
  var leaderboardSpot = {
    initials: name,
    score: timeLeft,
  }
  console.log('right before push', storedHighScores);
  storedHighScores.push(leaderboardSpot);
  var highScoresString = JSON.stringify(storedHighScores);
  localStorage.setItem('userInfo', highScoresString);
  renderHighScores();
};

var highScoreList = document.getElementById('high-score-list');

function renderHighScores() {
  if (highScoreList){
    var allScores = [];
    
    if (localStorage.getItem('userInfo')) {
      allScores = JSON.parse(localStorage.getItem('userInfo'));
    };
    
    highScoreList.innerHTML = "";
    
    allScores.forEach(function(score) {
      var newLi = document.createElement('li');
      newLi.textContent = JSON.stringify(score);
      highScoreList.appendChild(newLi);
    })
  }
};

function init() {
  var savedScores = (localStorage.getItem('userInfo'));
  if (savedScores !== null){   
    renderHighScores();
  }
};

function endGame() {
  clearInterval(time);
  highScoreInput.classList.remove("hidden");
  questionCard.classList.add("hidden");
};

if (postHighScoreButton) {
  postHighScoreButton.addEventListener('click', function(event){
    event.preventDefault();
    storeHighScores();
    window.location.assign('highscores.html');
  });

};

if (startBtn){
  startBtn.addEventListener("click", startGame);
};

if (questionCard) {
  questionCard.addEventListener("click", function (event) {
    if(event.target.classList.contains('answer-btn')){
      userAnswerInput(event)
    }
  })
};

if(restartQuiz){
  restartQuiz.addEventListener('click', function() {
    window.location.assign('index.html');
  })
};

if (clearButton){
  clearButton.addEventListener('click', clearStorage);
}
function clearStorage() {
  localStorage.clear();
  highScoreList.innerHTML = "";
};

init();