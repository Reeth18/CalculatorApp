document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.getElementById("question");
    const userAnswerElement = document.getElementById("user-answer");
    const submitButton = document.getElementById("submit");
    const hintButton = document.getElementById("hint");
    const nextButton = document.getElementById("next");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score-value");
    const timerElement = document.getElementById("time-left");
    const difficultySelector = document.getElementById("difficulty-select");

    let currentQuestion;
    let correctAnswer;
    let score = 0;
    let questionNumber = 0;
    let quizTime = 60; // Set the total time for the quiz in seconds
    let timer;
    let difficultyLevel = "easy"; // Default difficulty level

    // Difficulty settings
    const difficultySettings = {
        easy: { maxNumber: 10, operators: ["+"] },
        medium: { maxNumber: 50, operators: ["+", "-", "*"] },
        hard: { maxNumber: 100, operators: ["+", "-", "*", "/"] },
    };

    function generateQuestion() {
        const maxNumber = difficultySettings[difficultyLevel].maxNumber;
        const num1 = Math.floor(Math.random() * maxNumber) + 1;
        const num2 = Math.floor(Math.random() * maxNumber) + 1;
        const operators = difficultySettings[difficultyLevel].operators;
        const operator = operators[Math.floor(Math.random() * operators.length)];
        correctAnswer = eval(`${num1} ${operator} ${num2}`);
        currentQuestion = `${num1} ${operator} ${num2} = ?`;
        questionElement.textContent = currentQuestion;
    }

    function displayFeedback(isCorrect) {
        if (isCorrect) {
            score++;
            feedbackElement.textContent = "Correct!";
        } else {
            feedbackElement.textContent = "Incorrect. The correct answer is " + correctAnswer;
        }
        questionNumber++;
        setTimeout(nextQuestion, 2000);
    }

    function nextQuestion() {
        userAnswerElement.value = "";
        feedbackElement.textContent = "";
        if (questionNumber < 5) {
            generateQuestion();
        } else {
            finishQuiz();
        }
    }

    function finishQuiz() {
        clearInterval(timer);
        questionElement.textContent = `Quiz Complete! Your Score: ${score}/5`;
        userAnswerElement.style.display = "none";
        submitButton.style.display = "none";
        hintButton.style.display = "none";
        nextButton.style.display = "none";
        scoreElement.textContent = score;
    }

    function updateTimer() {
        if (quizTime <= 0) {
            finishQuiz();
        } else {
            timerElement.textContent = quizTime;
            quizTime--;
        }
    }

    difficultySelector.addEventListener("change", function () {
        difficultyLevel = difficultySelector.value;
    });

    // Start the timer
    timer = setInterval(updateTimer, 1000);

    generateQuestion();

    submitButton.addEventListener("click", function () {
        const userAnswer = parseInt(userAnswerElement.value);
        const isCorrect = userAnswer === correctAnswer;
        displayFeedback(isCorrect);
    });

    hintButton.addEventListener("click", function () {
        const hint = "Think about the operator and the numbers involved.";
        feedbackElement.textContent = hint;
    });

    nextButton.addEventListener("click", function () {
        nextQuestion();
    });
});
