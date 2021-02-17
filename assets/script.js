const startBtn = document.getElementById("start");
const nextQuestonBtn = document.getElementById("next-question");
const questionCard = document.getElementById("question-card");
const quizQuestion = document.getElementById("quiz-question");
const answerButton = document.querySelectorAll(".answer-btn");
var currentQuestionIndex = 0;

const questionsArray = [
  {
    question: "this is the text for question number 1 ",
    answers: {
      a: "option a",
      b: "option b",
      c: "correct answer",
      d: "option d",
    },
    correctAnswer: "correct answer",
  },
  {
    question: "2+2",
    answers: {
      a: "option a",
      b: "option b",
      c: "option c",
      d: "4",
    },
    correctAnswer: "4",
  },
  {
    question: "this is the text for question number 3",
    answers: {
      a: "correct answer",
      b: "option b",
      c: "option c",
      d: "option d",
    },
    correctAnswer: "correct answer",
  },
];

function startGame() {
  startBtn.classList.add("hidden");
  nextQuestonBtn.classList.remove("hidden");
  questionCard.classList.remove("hidden");
  setQuestion();
}

function setQuestion() {
  let choices = questionsArray[currentQuestionIndex].answers;
  let buttonArray = Array.from(answerButton);
  quizQuestion.innerHTML = questionsArray[currentQuestionIndex].question;
  // populate answer buttons with answers in questionsArray
  answerButton[0].innerHTML = choices.a;
  answerButton[1].innerHTML = choices.b;
  answerButton[2].innerHTML = choices.c;
  answerButton[3].innerHTML = choices.d;
  // buttons linked to userAnswerInput function
  for (var i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener("click", userAnswerInput);
  }
}

function userAnswerInput(event) {
  const clickedAnswer = event.target.textContent;
  const rightAnswer = questionsArray[currentQuestionIndex].correctAnswer;
  // check to see if user input matches correct answer
  if (clickedAnswer === rightAnswer) {
    alert("correct!");
    currentQuestionIndex++;
    if (questionsArray.length === currentQuestionIndex) {
      alert("no more questions");
    } else {
      goToNextQuestion();
    }
  } else {
    alert("try again");
  }
}

function goToNextQuestion() {
  let choices = questionsArray[currentQuestionIndex].answers;
  let buttonArray = Array.from(answerButton);
  quizQuestion.innerHTML = questionsArray[currentQuestionIndex].question;
  // populate answer buttons with answers in questionsArray
  answerButton[0].innerHTML = choices.a;
  answerButton[1].innerHTML = choices.b;
  answerButton[2].innerHTML = choices.c;
  answerButton[3].innerHTML = choices.d;
  // buttons linked to userAnswerInput function
  for (var i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener("click", userAnswerInput);
  }
  // if (currentQuestionIndex === questionsArray.length){
  //     alert('no more questions')
  // }
  if (questionsArray.length === currentQuestionIndex) {
    console.log("quiz end reached");
  }
  console.log(currentQuestionIndex);
}

startBtn.addEventListener("click", startGame);

nextQuestonBtn.addEventListener("click", setQuestion);
