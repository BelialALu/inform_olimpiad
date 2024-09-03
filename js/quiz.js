// Функция для получения предмета из URL
function getSubject() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('subject');
}

// Сохранение ответов и переход к результатам
function finishQuiz() {
    const subject = getSubject(); // Получаем предмет
    const userAnswers = {}; // Собираем ответы пользователя из формы
    for (let i = 1; i <= 7; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        userAnswers[i] = answer;
    }
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = `results.html?subject=${subject}`; // Переходим на страницу результатов
}

// Инициализация страницы с названием предмета
document.addEventListener('DOMContentLoaded', () => {
    const subject = getSubject();
    document.getElementById('subjectName').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
});
