
// Array de preguntas 
const questions = [
  { question: "¿Qué palabra clave se usa para declarar una variable en JavaScript?", options: ["var", "let", "const", "Todas"], answer: "Todas" },
  { question: "¿Qué método se usa para imprimir algo en la consola?", options: ["console.log()", "print()", "log()", "console.write()"], answer: "console.log()" },
  { question: "¿Qué tipo de dato devuelve typeof null?", options: ["null", "undefined", "object", "string"], answer: "object" },
  { question: "¿Qué método se utiliza para unir dos arrays?", options: ["concat()", "push()", "join()", "merge()"], answer: "concat()" },
  { question: "¿Qué método convierte un string a un número entero?", options: ["parseInt()", "parseFloat()", "Number()", "toString()"], answer: "parseInt()" },
  { question: "¿Qué palabra clave detiene un bucle?", options: ["continue", "break", "stop", "end"], answer: "break" },
  { question: "¿Qué operador se usa para asignar un valor a una variable?", options: ["=", "==", "===", ":"], answer: "=" },
  { question: "¿Qué método convierte un array en un string?", options: ["join()", "toString()", "split()", "map()"], answer: "join()" },
  { question: "¿Cómo se declara una función en JavaScript?", options: ["function miFuncion()", "func miFuncion()", "def miFuncion()", "fn miFuncion()"], answer: "function miFuncion()" },
  { question: "¿Qué objeto se usa para trabajar con fechas en JavaScript?", options: ["Date", "Time", "Calendar", "Datetime"], answer: "Date" },
  { question: "¿Qué símbolo se utiliza para los comentarios en una sola línea?", options: ["//", "/*", "#", "<!--"], answer: "//" },
  { question: "¿Cuál es el valor booleano de la expresión '2 > 5'?", options: ["true", "false", "undefined", "null"], answer: "false" },
  { question: "¿Cómo se puede agregar un elemento al final de un array?", options: ["push()", "pop()", "unshift()", "shift()"], answer: "push()" },
  { question: "¿Cómo se define una constante en JavaScript?", options: ["const", "let", "var", "constant"], answer: "const" },
  { question: "¿Qué método devuelve la longitud de un string?", options: [".size", ".length", ".count", ".chars"], answer: ".length" },
  { question: "¿Cómo se verifica si una variable no está definida?", options: ["if (typeof x === 'undefined')", "if (!x)", "if (x === null)", "if (x == undefined)"], answer: "if (typeof x === 'undefined')" },
  { question: "¿Qué método se utiliza para recorrer cada elemento de un array?", options: ["forEach()", "map()", "filter()", "reduce()"], answer: "forEach()" },
  { question: "¿Qué operador lógico se usa para 'y lógico'?", options: ["&&", "||", "!", "&"], answer: "&&" },
  { question: "¿Qué significa NaN en JavaScript?", options: ["Not a Number", "Null and None", "No Assigned Name", "Next Available Number"], answer: "Not a Number" },
  { question: "¿Qué método devuelve una parte específica de un string?", options: ["slice()", "split()", "substring()", "substr()"], answer: "slice()" }
];

let selectedQuestions = [];
let score = 0;
let playerName = ""; // Nombre del jugador

// Función para solicitar el nombre del jugador
const askPlayerName = () => {
  Swal.fire({
    title: "¡Bienvenido!",
    input: "text",
    inputLabel: "Ingresa tu nombre para empezar",
    inputPlaceholder: "Nombre del jugador",
    confirmButtonText: "Comenzar",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Por favor, ingresa tu nombre.";
      }
    },
  }).then((result) => {
    playerName = result.value;
    document.getElementById("player-name").textContent = playerName; // Actualizar nombre en el HTML
    startGame();
  });
};

// Función para iniciar el juego
const startGame = () => {
  if (questions.length < 5) {
    Swal.fire("Error", "No hay suficientes preguntas para jugar.", "error");
    return;
  }

  score = 0;
  document.getElementById("score").textContent = score;
  selectedQuestions = [];

  // Selección de 5 preguntas únicas
  while (selectedQuestions.length < 5) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    if (!selectedQuestions.includes(questions[randomIndex])) {
      selectedQuestions.push(questions[randomIndex]);
    }
  }

  renderQuestions();
};

// Función para renderizar preguntas
const renderQuestions = () => {
  const container = document.getElementById("quiz-container");
  container.innerHTML = ""; // Limpiar preguntas anteriores

  selectedQuestions.forEach((q, index) => {
    const questionCard = document.createElement("div");
    questionCard.classList.add("mb-4");

    questionCard.innerHTML = `
      <h5>${index + 1}. ${q.question}</h5>
      ${q.options
        .map(
          (option) => `
          <button class="btn btn-outline-secondary my-2 d-block" 
            data-index="${index}" 
            data-option="${option}" 
            onclick="checkAnswer('${option}', '${q.answer}', ${index})">${option}</button>
        `
        )
        .join("")}
    `;

    container.appendChild(questionCard);
  });
};

// Función para validar la respuesta
const checkAnswer = (selectedOption, correctAnswer, index) => {
  const questionCard = document.getElementById("quiz-container").children[index];

  if (selectedOption === correctAnswer) {
    score += 10;
    Swal.fire("¡Correcto!", "Has ganado 10 puntos.", "success");
  } else {
    score -= 5;
    Swal.fire("¡Incorrecto!", "Has perdido 5 puntos.", "error");
  }

  document.getElementById("score").textContent = score;

  // Deshabilitar botones de la pregunta actual
  Array.from(questionCard.querySelectorAll("button")).forEach((btn) => {
    btn.disabled = true;
    btn.classList.add(btn.textContent === correctAnswer ? "btn-success" : "btn-danger");
  });

  // Guardar la puntuación en localStorage
  localStorage.setItem("playerData", JSON.stringify({ name: playerName, score: score }));
};

// Asegurarse de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-btn");
  startButton.addEventListener("click", askPlayerName);

  // Exponer la función checkAnswer al entorno global
  window.checkAnswer = checkAnswer;
});
