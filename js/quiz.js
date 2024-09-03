import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Функция для получения предмета из URL
function getSubject() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('subject');
}

// Сохранение ответов в Firestore
async function saveAnswers(subject, answers) {
    try {
        await setDoc(doc(db, "quizzes", subject), answers);
        console.log('Ответы успешно сохранены!');
    } catch (e) {
        console.error('Ошибка сохранения ответов: ', e);
    }
}

// Сохранение ответов и переход к результатам
async function finishQuiz(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    const subject = getSubject(); // Получаем предмет
    const userAnswers = {}; // Собираем ответы пользователя из формы
    for (let i = 1; i <= 7; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        userAnswers[i] = answer;
    }
    await saveAnswers(subject, userAnswers); // Сохраняем ответы
    window.location.href = `results.html?subject=${subject}`; // Переходим на страницу результатов
}

// Инициализация страницы с названием предмета
document.addEventListener('DOMContentLoaded', () => {
    const subject = getSubject();
    document.getElementById('subjectName').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    document.getElementById('quizForm').addEventListener('submit', finishQuiz); // Добавляем обработчик события
});
