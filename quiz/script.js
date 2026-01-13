/* Project: Live Quiz Application | Author: Ayush Kumar Dubey (11741) */

const quizData = [
    { question: "Which data structure follows LIFO?", a: "Queue", b: "Array", c: "Stack", d: "Tree", correct: "c" },
    { question: "What does CSS stand for?", a: "Creative Style", b: "Computer Style", c: "Cascading Style Sheets", d: "Colorful Style", correct: "c" },
    { question: "Tag for hyperlink in HTML?", a: "<a>", b: "<link>", c: "<href>", d: "<p>", correct: "a" },
    { question: "Logical AND symbol in C?", a: "&", b: "&&", c: "||", d: "$", correct: "b" },
    { question: "Which is NOT an OS?", a: "Linux", b: "Windows", c: "Oracle", d: "MacOS", correct: "c" }
];

const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const questionEl = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const nextBtn = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer-display');
const countDisplay = document.getElementById('question-count');

let currentQuiz = 0;
let score = 0;
let timer;
let timeLeft = 15;

function loadQuiz() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.classList.remove('time-low');
    optionsList.innerHTML = "";
    nextBtn.classList.add('hidden');

    const currentData = quizData[currentQuiz];
    questionEl.innerText = currentData.question;
    countDisplay.innerText = `Question: ${currentQuiz + 1}/${quizData.length}`;
    timerDisplay.innerText = `Time: ${timeLeft}s`;

    startTimer();

    ['a', 'b', 'c', 'd'].forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = currentData[opt];
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => selectAnswer(opt, btn));
        optionsList.appendChild(btn);
    });
}

function selectAnswer(selected, btn) {
    clearInterval(timer);
    const correct = quizData[currentQuiz].correct;
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

    if (selected === correct) {
        score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        showCorrect(correct);
    }
    nextBtn.classList.remove('hidden');
}

function showCorrect(key) {
    const map = {'a':0, 'b':1, 'c':2, 'd':3};
    document.querySelectorAll('.option-btn')[map[key]].classList.add('correct');
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time: ${timeLeft}s`;
        if (timeLeft < 5) timerDisplay.classList.add('time-low');
        if (timeLeft === 0) {
            clearInterval(timer);
            document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
            showCorrect(quizData[currentQuiz].correct);
            nextBtn.classList.remove('hidden');
        }
    }, 1000);
}

nextBtn.addEventListener('click', () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) loadQuiz();
    else showResults();
});

function showResults() {
    quizArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    document.getElementById('total-score').innerText = quizData.length;
    document.getElementById('remarks').innerText = score >= 3 ? "Great job!" : "Keep practicing!";
}

loadQuiz();
