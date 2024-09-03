// Функция для получения предмета из URL
function getSubject() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('subject');
}

// Сохранение ответов и переход к результатам
function finishQuiz() {
    const subject = getSubject(); // Получаем предмет
    if (!subject) {
        console.error("Предмет не указан в URL.");
        return; // Если предмет не указан, выходим
    }

    const userAnswers = {}; // Собираем ответы пользователя из формы
    for (let i = 1; i <= 7; i++) {
        const answerElement = document.getElementById(`question-${i}`);
        if (answerElement) { // Проверка на наличие элемента
            userAnswers[i] = answerElement.value;
        }
    }

    // Сохраняем ответы пользователя в localStorage
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers));

    // Переход на страницу результатов
    window.location.href = `results.html?subject=${subject}`;
}

// Инициализация страницы и добавление обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    const subject = getSubject();
    const subjectNameElement = document.getElementById('subjectName');
    
    if (subjectNameElement && subject) {  // Проверка на наличие элемента и параметра subject
        subjectNameElement.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    } else {
        console.error("Элемент или предмет не найден.");
    }

    // Добавляем событие на отправку формы
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем перезагрузку страницы
            finishQuiz(); // Вызываем функцию завершения теста
        });
    } else {
        console.error("Форма с ID 'quizForm' не найдена.");
    }
});
