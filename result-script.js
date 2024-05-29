window.addEventListener('DOMContentLoaded', function() {
    const finalScoreElement = document.getElementById('finalScore');
    const totalQuestionsElement = document.getElementById('total-questions');
    const correctAnswersElement = document.getElementById('correct-answers');
    const incorrectAnswersElement = document.getElementById('incorrect-answers');

    const queryParams = new URLSearchParams(window.location.search);
    const finalScore = queryParams.get('score');
    const totalQuestions = quizQuestions.length;
    const correctAnswers = finalScore / 10;
    const incorrectAnswers = totalQuestions - correctAnswers;

    finalScoreElement.textContent = `Your final score: ${finalScore}`;
    totalQuestionsElement.textContent = totalQuestions;
    correctAnswersElement.textContent = correctAnswers;
    incorrectAnswersElement.textContent = incorrectAnswers;
});
