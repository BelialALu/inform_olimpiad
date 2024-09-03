function finishQuiz() {
    const userAnswers = {};
    for (let i = 1; i <= 7; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        if (answer) {
            userAnswers[i] = answer;
        }
    }
    localStorage.setItem('quizAnswers_informatics', JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = 'results_informatics.html'; // Перенаправляем на страницу результатов
}

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем отправку формы
    finishQuiz();
});
