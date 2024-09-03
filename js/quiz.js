// Функция для получения предмета из URL
function getSubject() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('subject');
}

// Сохранение ответов и переход к результатам
function finishQuiz() {
    const subject = getSubject(); // Получаем предмет
    if (!subject) return; // Если предмет не указан, выходим

    const userAnswers = {}; // Собираем ответы пользователя из формы
    for (let i = 1; i <= 7; i++) {
        const answer = document.getElementById(`question-${i}`);
        if (answer) { // Проверка на наличие элемента
            userAnswers[i] = answer.value;
        }
    }
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = `results.html?subject=${subject}`; // Переходим на страницу результатов
}

// Инициализация страницы с названием предмета
document.addEventListener('DOMContentLoaded', () => {
    const subject = getSubject();
    const subjectNameElement = document.getElementById('subjectName');
    
    if (subjectNameElement && subject) {  // Проверка на наличие элемента и параметра subject
        subjectNameElement.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    }

    // Добавляем событие на отправку формы
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем перезагрузку страницы
            finishQuiz(); // Вызываем функцию завершения теста
        });
    }
});
