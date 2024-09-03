function finishQuiz(subject) {
    console.log('finishQuiz вызвана с предметом:', subject);
    const userAnswers = {};
    for (let i = 1; i <= 7; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        console.log(`Вопрос ${i}: ${answer}`);
        if (answer) {
            userAnswers[i] = answer;
        }
    }
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    console.log('Ответы сохранены:', userAnswers);
    // Направляем на страницу результатов для выбранного предмета
    window.location.href = `${subject}_results.html`;
}
