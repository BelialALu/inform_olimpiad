function finishQuiz(subject) {
    const userAnswers = {};
    const questions = document.querySelectorAll('.question input[type="text"]');
    
    questions.forEach((input, index) => {
        userAnswers[index + 1] = input.value; // Используйте индекс + 1 для соответствия номерам вопросов
    });

    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = `results.html?subject=${subject}`; // Переходим на страницу результатов
}
