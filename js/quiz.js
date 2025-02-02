async function startQuiz(quizType) {
  const response = await fetch("json/quizData.json");
  const quizData = await response.json();
  let filteredQuiz = quizData.filter(q => q.type === quizType);
  let quizContainer = document.getElementById(`quizContainer-${quizType}`);
  let html = "";

  filteredQuiz.forEach((q, index) => {
      html += `<p><strong>${q.question}</strong></p>`;
      q.options.forEach((option, i) => {
          html += `<input type="radio" name="q${quizType}-${index}" value="${q.values[i]}"> ${option} <br>`;
      });
  });

  html += `<button onclick="calculateQuiz('${quizType}')" class="btnQuiz">See Result</button>`;
  quizContainer.innerHTML = html;
}

function calculateQuiz(quizType) {
  const questions = document.querySelectorAll(`input[name^='q${quizType}-']`);
  const totalQuestions = new Set([...questions].map(q => q.name)).size; 
  const selectedAnswers = document.querySelectorAll(`input[name^='q${quizType}']:checked`);
  
  if (selectedAnswers.length < totalQuestions) {
    const resultElement = document.getElementById(`quizResult-${quizType}`);
    resultElement.innerText = "Please answer all questions before seeing the result!";
    return;
  }

  const answers = quizType === "onePiece" 
    ? { "Luffy": 0, "Zoro": 0, "Sanji": 0, "Nami": 0 } 
    : { "Super Strength": 0, "Mind Control": 0, "Elemental Powers": 0, "Energy Manipulation": 0 };

  selectedAnswers.forEach(input => answers[input.value]++);

  document.getElementById(`quizResult-${quizType}`).innerText = 
  "Your result: " + Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b) + "!";
}