const startBtn = document.getElementById('start');
const nextQuestonBtn = document.getElementById('next-question');
const questionCard = document.getElementById('question-card');


function startGame() {
    console.log('working');
    startBtn.classList.add('hidden');
    nextQuestonBtn.classList.remove('hidden');
    questionCard.classList.remove('hidden');
};

function nextQuestion() {
    console.log('this is also working');
};

function userAnswerInput(){

};

startBtn.addEventListener('click', startGame);

nextQuestonBtn.addEventListener('click', nextQuestion);