document.addEventListener('DOMContentLoaded', displayResults);

(function () {
    emailjs.init("Q5mH9WW5IYLU5Qlm1");
})();

const correctAnswers = {
    "1": "17",
    "2": "3x-2xy-2y",
    "3": "-3",
    "4": "24/35,5/7,11/14,129/140",
    "5": "27",
    "6": "(3,3)",
    "7": "-1",
};

function displayResults() {
    const answers = JSON.parse(localStorage.getItem('quizAnswers_math'));
    let correctCount = 0;
    let resultsHtml = '';

    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const userAnswer = answers[question];
        if (userAnswer !== undefined) {
            if (userAnswer === correctAnswer) {
                correctCount++;
            }
            resultsHtml += `<p>Вопрос ${question}: Ваш ответ: "${userAnswer}", Правильный ответ: "${correctAnswer}"</p>`;
        }
    }

    resultsHtml = `<h3>Вы правильно ответили на ${correctCount} из ${Object.keys(correctAnswers).length} вопросов</h3>` + resultsHtml;
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
    const incorrectAnswers = getIncorrectAnswers();
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

function getIncorrectAnswers() {
    const answers = JSON.parse(localStorage.getItem('quizAnswers_math'));
    const incorrectAnswers = [];
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const userAnswer = answers[question];
        if (userAnswer !== undefined && userAnswer !== correctAnswer) {
            incorrectAnswers.push(`Вопрос ${question}: Ваш ответ "${userAnswer}", Правильный ответ "${correctAnswer}"`);
        }
    }
    return incorrectAnswers;
}
