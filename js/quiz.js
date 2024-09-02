document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = [];
    for (let i = 1; i <= 10; i++) {
        answers.push(document.getElementById('question' + i).value);
    }

    // Сохраняем ответы в localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(answers));

    // Переход на страницу с результатами
    window.location.href = 'results.html';
});

