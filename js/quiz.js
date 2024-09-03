function finishQuiz(subject) {
    const userAnswers = {};
    let i = 1;

    // Перебираем все возможные вопросы и сохраняем ответы, если они есть
    while (document.getElementById(`question-${i}`)) {
        const answerElement = document.getElementById(`question-${i}`);
        if (answerElement) {
            const answer = answerElement.value.trim();
            if (answer) { // Проверяем, что ответ не пустой
                userAnswers[i] = answer;
            }
        }
        i++;
    }

    if (Object.keys(userAnswers).length === 0) {
        alert('Вы не ответили ни на один вопрос.');
        return;
    }

    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы

    // Переходим на страницу результатов
    window.location.href = `results.html?subject=${subject}`;
}
