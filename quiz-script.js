const quizQuestions = [
    {
        questionText: 'What is the correct HTML tag for inserting a line break?',
        options: ['<br>', '<break>', '<lb>', '<newline>'],
        correctAnswer: 1
    },
    {
        questionText: 'Which CSS property is used to control the text size?',
        options: ['text-size', 'font-style', 'font-weight', 'font-size'],
        correctAnswer: 4
    },
    {
        questionText: 'What is the shorthand property in CSS for setting all padding properties at once?',
        options: ['padding-all', 'pad', 'set-padding', 'padding'],
        correctAnswer: 4
    }
];

const questionText = document.getElementById('question-text');
const choiceOptions = document.querySelectorAll('.choice-option');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-value');
const progressBar = document.getElementById('progress-bar');

let currentQuestion = {};
let isAnswerAllowed = false;
let playerScore = 0;
let questionIndex = 0;
let availableQuestions = [...quizQuestions];

function displayNextQuestion() {
    questionIndex++;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    questionText.innerText = currentQuestion.questionText;
    choiceOptions.forEach((option, index) => {
        const choiceNumber = index + 1;
        option.innerText = currentQuestion.options[index];
    });

    availableQuestions.splice(randomIndex, 1);
    isAnswerAllowed = true;

    questionCounter.innerText = `Question ${questionIndex} / ${quizQuestions.length}`;

    const progressPercentage = (questionIndex / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

choiceOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
        if (!isAnswerAllowed) return;

        isAnswerAllowed = false;
        const selectedOption = e.target;
        const selectedAnswer = parseInt(selectedOption.dataset.choice);
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        const optionClass = isCorrect ? 'correct' : 'incorrect';

        if (isCorrect) {
            incrementScore();
        }

        selectedOption.classList.add(optionClass);

        if (availableQuestions.length === 0) {
            window.location.href = 'result.html?score=' + playerScore;
        } else {
            setTimeout(() => {
                selectedOption.classList.remove(optionClass);
                displayNextQuestion();
            }, 1000);
        }
    });
});

function incrementScore() {
    playerScore += 10;
    scoreDisplay.innerText = playerScore;
}

window.addEventListener('DOMContentLoaded', function() {
    const retryButton = document.getElementById('retry');
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            playerScore = 0;
            questionIndex = 0;
            availableQuestions = [...quizQuestions];
            displayNextQuestion();
        });
    }
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const queryParams = new URLSearchParams(window.location.search);
        const finalScore = queryParams.get('score');
        finalScoreElement.textContent = `Your final score: ${finalScore}`;
    }
});

displayNextQuestion();