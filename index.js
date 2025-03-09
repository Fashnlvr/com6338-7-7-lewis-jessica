document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz");
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const timeLimit = 30;
    let timeLeft = timeLimit;
    
    window.questionsArr = [
      {
        question: "Which luxury brand is known for its red-soled shoes?",
        answer: "Christian Louboutin",
        options: ["Jimmy Choo", "Christian Louboutin", "Manolo Blahnik", "Gucci"]
      },
      {
        question: "Who is considered the father of haute couture?",
        answer: "Charles Frederick Worth",
        options: ["Karl Lagerfeld", "Christian Dior", "Charles Frederick Worth", "Giorgio Armani"]
      },
      {
        question: "Which fashion house introduced the iconic 'little black dress'?",
        answer: "Chanel",
        options: ["Chanel", "Versace", "Valentino", "Yves Saint Laurent"]
      },
      {
        question: "Which city is considered the fashion capital of the world?",
        answer: "Paris",
        options: ["Milan", "Paris", "New York", "London"]
      },
      {
        question: "What is the name of the signature plaid pattern used by Burberry?",
        answer: "Haymarket Check",
        options: ["Glen Plaid", "Tartan", "Houndstooth", "Haymarket Check"]
      }
    ];
  
    function showStartScreen() {
      quizContainer.innerHTML = "";
      const previousScore = localStorage.getItem("previous-score");
      if (previousScore !== null) {
        const scoreText = document.createElement("p");
        scoreText.textContent = `Previous Score: ${previousScore}%`;
        quizContainer.appendChild(scoreText);
      }
      const startButton = document.createElement("button");
      startButton.id = "start-quiz";
      startButton.textContent = "Start Quiz!";
      startButton.addEventListener("click", startQuiz);
      quizContainer.appendChild(startButton);
    }
    
    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
    }
    
    function showQuestion() {
      if (currentQuestionIndex >= window.questionsArr.length) {
        return endGame();
      }
      timeLeft = timeLimit;
      clearInterval(timer);
      
      const questionObj = window.questionsArr[currentQuestionIndex];
      quizContainer.innerHTML = `<p>${questionObj.question}</p>`;
      
      const choicesDiv = document.createElement("div");
      questionObj.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => handleAnswer(option));
        choicesDiv.appendChild(button);
      });
      
      quizContainer.appendChild(choicesDiv);
      const timerDisplay = document.createElement("p");
      timerDisplay.id = "timer";
      timerDisplay.textContent = timeLeft;
      quizContainer.appendChild(timerDisplay);
      
      timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          nextQuestion();
        }
      }, 1000);
    }
    
    function handleAnswer(selectedOption) {
      clearInterval(timer);
      const correctAnswer = window.questionsArr[currentQuestionIndex].answer;
      if (selectedOption === correctAnswer) {
        score++;
      }
      nextQuestion();
    }
    
    function nextQuestion() {
      currentQuestionIndex++;
      showQuestion();
    }
    
    function endGame() {
      clearInterval(timer);
      const finalScore = Math.round((score / window.questionsArr.length) * 100);
      localStorage.setItem("previous-score", finalScore);
      showStartScreen();
    }
  
    showStartScreen();
  });
  