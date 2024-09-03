function finishQuiz(subject) {
    const userAnswers = {};
    let allFieldsFilled = true;

    // Проверка и сбор ответов
    for (let i = 1; i <= 7; i++) {
        const element = document.getElementById(`question-${i}`);
        if (element) {
            const answer = element.value.trim();
            if (answer) {
                userAnswers[i] = answer;
            } else {
                allFieldsFilled = false; // Не все поля заполнены
            }
        } else {
            console.error(`Элемент с id "question-${i}" не найден.`);
            allFieldsFilled = false;
        }
    }

    if (allFieldsFilled) {
        localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
        // Направляем на страницу результатов для выбранного предмета
        window.location.href = `${subject}_results.html`;
    } else {
        alert('Пожалуйста, заполните все вопросы перед отправкой.');
    }
}

// Обработчик отправки формы
document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    const subject = 'informatics'; // Замените на соответствующее значение для теста
    finishQuiz(subject);
});
