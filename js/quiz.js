// Функция для получения предмета из URL
function getSubject() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('subject');
}

// Сохранение ответов и переход к результатам
function finishQuiz() {
    const subject = getSubject(); // Получаем предмет из URL

    if (!subject) {
        alert('Предмет не указан в URL.');
        return;
    }

    const userAnswers = {}; // Создаем объект для хранения ответов пользователя

    // Собираем ответы пользователя из формы
    for (let i = 1; i <= 7; i++) {
        const answerElement = document.getElementById(`question${i}`);
        if (answerElement) {
            userAnswers[i] = answerElement.value; // Сохраняем ответ пользователя
        }
    }

    // Сохраняем ответы пользователя в локальное хранилище
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers));

    // Переходим на страницу результатов
    window.location.href = `results.html?subject=${subject}`;
}

// Инициализация страницы и обработка события при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
    const subject = getSubject(); // Получаем предмет

    if (subject) {
        const subjectNameElement = document.getElementById('subjectName'); // Получаем элемент для отображения имени предмета
        if (subjectNameElement) {
            subjectNameElement.textContent = subject.charAt(0).toUpperCase() + subject.slice(1); // Устанавливаем имя предмета
        }

        // Находим кнопку завершения квиза и добавляем к ней обработчик события
        const finishButton = document.querySelector('button[type="submit"]');
        if (finishButton) {
            finishButton.addEventListener('click', (event) => {
                event.preventDefault(); // Предотвращаем стандартное поведение формы
                finishQuiz();
            });
        }
    }
});
