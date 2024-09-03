function finishQuiz(subject) {
    const userAnswers = {};
    for (let i = 1; i <= 10; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        userAnswers[i] = answer;
    }
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = `results.html?subject=${subject}`; // Переходим на страницу результатов
}
