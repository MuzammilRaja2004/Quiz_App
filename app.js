const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')



let currentQuestion = [];
let acceptingAnswers = false;
let score = 0;
let QuestionCounter = 0;
let availableQuestion = [];

let questions = [
    
    {
        question: "Q1:What does HTML stand for?",
        choice1: "Home Tool Markup Language",
        choice2: "Hyperlinks text Markup Language",
        choice3: "Hyper Text Markup Language",
        choice4: "Hey Text Markup Language",
        answer: 3
    },
    {
        question: "Q2:Who is making the Web standards?",
        choice1: "Google",
        choice2: "Mozila",
        choice3: "Microsoft",
        choice4: "The World Wide Web Consortium",
        answer: 1
    },
    {
        question: "Q3:Choose the correct HTML element for the largest heading",
        choice1: "<h1>",
        choice2: "<h6>",
        choice3: "<head>",
        choice4: "<heading>",
        answer: 1
    },
    {
        question: "Q4:What is the correct HTML element for inserting a line break?",
        choice1: "<break>",
        choice2: "<br>",
        choice3: "<lb>",
        choice4: "<bl>",
        answer: 2
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTION = 4;

startGame = () => {
    QuestionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    console.log(availableQuestion);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestion.length === 0 || QuestionCounter > MAX_QUESTION) {
        localStorage.setItem('mostRecentScore',score);

        return window.location.assign('/end.html')
    }
    QuestionCounter++;
    progressText.innerHTML = `Question${QuestionCounter}/${MAX_QUESTION}`;


    // Update The Progress Bar
    progressBarFull.style.width = `${(QuestionCounter / MAX_QUESTION) * 100}% `

    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestion.splice(questionIndex, 1);
    acceptingAnswers = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;

        const selectedAnswer = selectedChoice.dataset['number']

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000);

    });
});

incrementScore = num => {
    score += num;;
    scoreText.innerHTML = score;
}

startGame();
