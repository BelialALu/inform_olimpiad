import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Ваша конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCerm0NUbEOnB9kQu0ZnvDPYKQ9bfBDD2Q",
    authDomain: "olimp-cdee3.firebaseapp.com",
    projectId: "olimp-cdee3",
    storageBucket: "olimp-cdee3.appspot.com",
    messagingSenderId: "741159614517",
    appId: "1:741159614517:web:3f142b99eb36cf3ad9d97c",
    measurementId: "G-EW9HQV9J7F"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const correctAnswers = {
    "math": {
        "1": "17",
        "2": "3x-2xy-2y",
        "3": "-3",
        "4": "24/35,5/7,11/14,129/140",
        "5": "27",
        "6": "(3,3)",
        "7": "-1",
    },
    "russian": {
        "1": "2",
        "2": "234",
        "3": "подлещик",
        "4": "переиздаются",
        "5": "которая",
        "6": "нужна",
        "7": "суффиксальный"
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

async function displayResults() {
    const subject = getQueryParam('subject');
    const docRef = doc(db, "quizzes", subject);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const answers = docSnap.data();
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

        resultsHtml = `<h3>Вы правильно ответили на ${correctCount} из 7 вопросов</h3>` + resultsHtml;
        document.getElementById('results').innerHTML = resultsHtml;
    } else {
        document.getElementById('results').innerHTML = 'Нет данных для отображения.';
    }
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
    const docRef = doc(db, "quizzes", subject);
    return getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
            const answers = docSnap.data();
            const incorrectAnswers = [];
            const correctAnswersForSubject = correctAnswers[subject];
            for (const [question, answer] of Object.entries(answers)) {
                if (correctAnswersForSubject[question] !== answer) {
                    incorrectAnswers.push(`Вопрос ${question}: Ваш ответ "${answer}", Правильный ответ "${correctAnswersForSubject[question]}"`);
                }
            }
            return incorrectAnswers;
        } else {
            return [];
        }
    });
}

document.addEventListener('DOMContentLoaded', displayResults);

(function () {
    emailjs.init("Q5mH9WW5IYLU5Qlm1");  // Замените YOUR_PUBLIC_API_KEY на ваш Public API Key
})();
