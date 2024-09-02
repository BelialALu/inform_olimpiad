document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.getElementById('results');
    const answers = JSON.parse(localStorage.getItem('quizAnswers'));

    if (answers) {
        answers.forEach((answer, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.innerText = `Вопрос ${index + 1}: Ваш ответ - ${answer}`;
            resultsContainer.appendChild(resultDiv);
        });
    } else {
        resultsContainer.innerText = "Нет результатов для отображения.";
    }
});
