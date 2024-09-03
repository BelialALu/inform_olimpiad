document.addEventListener('DOMContentLoaded', displayResults);

(function () {
    emailjs.init("Q5mH9WW5IYLU5Qlm1");  // Замените YOUR_PUBLIC_API_KEY на ваш Public API Key
})();

const correctAnswers = {
    "mathematics": {
        "1": "17",
        "2": "3x-2xy-2y",
        "3": "-3",
        "4": "24/35,5/7,11/14,129/140",
        "5": "27",
        "6": "(3,3)",
        "7": "-1",
    },
    "russian": {
        "1": "правильный ответ 1",
        "2": "правильный ответ 2",
        // добавьте ответы на остальные вопросы
    },
    "informatics": {
        "1": "17",
        "2": "3x-2xy-2y",
        "3": "-3",
        "4": "24/35,5/7,11/14,129/140",
        "5": "27",
        "6": "(3,3)",
        "7": "-1",
    }
};

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayResults() {
    const subject = getQueryParam('subject');
    const answers = JSON.parse(localStorage.getItem(`quizAnswers_${subject}`));
    const correctAnswersForSubject = correctAnswers[subject];
    let correctCount = 0;
    let resultsHtml = '';

    for (const [question, answer] of Object.entries(answers)) {
        const correctAnswer = correctAnswersForSubject[question];
        if (answer === correctAnswer) {
            correctCount++;
        }
        resultsHtml += `<p>Вопрос ${question}: Ваш ответ: "${answer}", Правильный ответ: "${correctAnswer}"</p>`;
    }

    resultsHtml = `<h3>Вы правильно ответили на ${correctCount} из 10 вопросов</h3>` + resultsHtml;
    document.getElementById('results').innerHTML = resultsHtml;
}

function openEmailModal() {
    document.getElementById('emailModal').style.display = 'block';
}

function closeEmailModal() {
    document.getElementById('emailModal').style.display = 'none';
}

function sendEmail() {
    const email = document.getElementById('emailInput').value;
    const subject = getQueryParam('subject');
    const incorrectAnswers = getIncorrectAnswers(subject);  // Функция для получения неверных ответов
    if (email) {
        emailjs.send("service_nj9r4m3", "template_fio3l8v", {
            to_email: email,
            incorrect_answers: incorrectAnswers.join("\n")
        })
        .then(function (response) {
            alert('Письмо успешно отправлено!');
            closeEmailModal();
        }, function (error) {
            alert('Ошибка при отправке письма: ' + JSON.stringify(error));
        });
    } else {
        alert('Пожалуйста, введите корректный email.');
    }
}

function getIncorrectAnswers(subject) {
    const answers = JSON.parse(localStorage.getItem(`quizAnswers_${subject}`));
    const incorrectAnswers = [];
    const correctAnswersForSubject = correctAnswers[subject];
    for (const [question, answer] of Object.entries(answers)) {
        if (correctAnswersForSubject[question] !== answer) {
            incorrectAnswers.push(`Вопрос ${question}: Ваш ответ "${answer}", Правильный ответ "${correctAnswersForSubject[question]}"`);
        }
    }
    return incorrectAnswers;
}
