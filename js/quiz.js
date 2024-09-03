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
        const answerElement = document.getElementById(`question-${i}`);
        if (answerElement) {
            userAnswers[i] = answerElement.value; // Сохраняем ответ
        }
    }

    // Сохраняем ответы в локальное хранилище
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers));

    // Переходим на страницу результатов
    window.location.href = `results.html?subject=${subject}`;
}

// Инициализация страницы с названием предмета
document.addEventListener('DOMContentLoaded', () => {
    const subject = getSubject();
    if (subject) {
        document.getElementById('subjectName').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    } else {
        console.error('Предмет не указан в URL.');
    }

    // Добавляем обработчик события для кнопки "Завершить и проверить результаты"
    const finishButton = document.getElementById('finishQuizButton');
    if (finishButton) {
        finishButton.addEventListener('click', finishQuiz);
    } else {
        console.error('Кнопка завершения квиза не найдена.');
    }
});
