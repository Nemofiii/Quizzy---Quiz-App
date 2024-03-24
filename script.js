const questions = [
    {
        question:"Which animal is known as the king of the jungle?", 
        answers: [
            {text: "Tiger", correct: false},
            {text: "Lion", correct: true},
            {text: "Cheetah", correct: false},
            {text: "Elephant", correct: false}
        ]
    },
    {
        question:"How many continents are there in the world?", 
        answers: [
            {text: "5", correct: false},
            {text: "9", correct: false},
            {text: "6", correct: false},
            {text: "7", correct: true}
        ]
    },
    {
        question:"Which is the largest mammal?", 
        answers: [
            {text: "Elephant", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Giraffe", correct: false},
            {text: "Bear", correct: false}
        ]
    },
    {
        question:"Which is the largest planet of our Solar System?", 
        answers: [
            {text: "Mars", correct: false},
            {text: "Saturn", correct: false},
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: true}
        ]
    },
    {
        question:"Which is the longest river on the Earth", 
        answers: [
            {text: "Ganga", correct: false},
            {text: "Amazon", correct: false},
            {text: "Nile", correct: true},
            {text: "Mississippi", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button =>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

startQuiz();