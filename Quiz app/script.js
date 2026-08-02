const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Goa", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Delhi", correct: false },
        ]
    },
    {
        question: "How many states does India have?",
        answers: [
            { text: "24", correct: false },
            { text: "28", correct: false },
            { text: "29", correct: true },
            { text: "30", correct: false },
        ]
    },
    {
        question: "How many stars are there in the sky?",
        answers: [
            { text: "240", correct: false },
            { text: "258", correct: false },
            { text: "2089", correct: false },
            { text: "infinite", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    answerButtonElement.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
    }

    // Disable all answer buttons after an answer is selected
    const answerButtons = document.querySelectorAll('.btn');
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    // Enable the "Next" button
    nextButton.disabled = false;

    // Add 'selected' class to the selected button
    selectedButton.classList.add('selected');
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.disabled = true; // Disable the "Next" button until an answer is selected for the next question
    } else {
        endQuiz();
    }
}


function endQuiz() {
    // Display final score or any other end-of-quiz message
    questionElement.innerText = `Quiz ended! Your score: ${score}/${questions.length}`;
    answerButtonElement.innerHTML = '';
    nextButton.style.display = "none";
}

// Start the quiz when the page loads
startQuiz();
