function finishQuiz(subject) {
    const userAnswers = {};
    for (let i = 1; i <= 7; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        if (answer) {
            userAnswers[i] = answer;
        }
    }
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    // Направляем на страницу результатов для выбранного предмета
    window.location.href = `${subject}_results.html`;
}
