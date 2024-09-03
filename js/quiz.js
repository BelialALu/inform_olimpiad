function finishQuiz(subject) {
    const userAnswers = {};
    let i = 1;

    while (document.getElementById(`question-${i}`)) {
        const answer = document.getElementById(`question-${i}`).value;
        userAnswers[i] = answer;
        i++;
    }

    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = `results.html?subject=${subject}`; // Переходим на страницу результатов
}
