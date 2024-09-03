function finishQuiz(subject) {
    const userAnswers = {};
    for (let i = 1; i <= 10; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        userAnswers[i] = answer;
    }
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers));
    
    // Перенаправление на соответствующую страницу результатов
    const resultsPages = {
        "math": "results_math.html",
        "russian": "results_russian.html",
        "informatics": "results_informatics.html"
    };
    
    window.location.href = resultsPages[subject];
}
