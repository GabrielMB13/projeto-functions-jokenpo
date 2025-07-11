

// Pegando os botões do HTML pelo ID
const buttonRock = document.getElementById("rock");
const buttonPaper = document.getElementById("paper");
const buttonScissors = document.getElementById("scissors");

// Definindo os emojis usados no jogo
const emojis = {
  rock: "✊",
  paper: "🖐️",
  scissors: "✌️"
};

// ENUMS *** evita erros de digitação, organiza melhor o código, deixa claro quais são os valores válidos de uma variável.
const GAME_OPTIONS ={
  ROCK: "rock",
  PAPER: "paper",
  SCISSORS: "scissors"
}

// Pegando as <div class="emoji"> que vão exibir as jogadas
const humanEmojiDivs = document.querySelectorAll("#human-emoji .emoji");
const machineEmojiDivs = document.querySelectorAll("#machine-emoji .emoji");

// Pegando os <span> que mostram a pontuação
const yourScoreSpan = document.querySelector(".your-score span");
const machineScoreSpan = document.querySelector(".machine-score span");

// Inicializando as variáveis de pontuação
let yourScore = 0;
let machineScore = 0;
let gameOver = false; // Controle para parar o jogo após a vitória

// Essa função recebe a jogada e mostra o emoji correspondente
function showEmoji(targetDivs, choice) {
  // Primeiro, faz todos esmaecerem com uma transição
  targetDivs.forEach(div => {
    div.style.transition = "opacity 0.01s";  // adiciona transição suave
    div.style.opacity = 0; // esmaece todos
  });

  // Aguarda o fade-out terminar antes de mostrar o emoji escolhido
  setTimeout(() => {
    targetDivs.forEach(div => {
      // Mostra o emoji correspondente (fade in)
      div.style.opacity = div.textContent === emojis[choice] ? 1 : 0;
    });
  }, 300); // espera 300ms (tempo da transição)
}

// Sorteia aleatoriamente a jogada da máquina
function playMachine() {
  const choices = [GAME_OPTIONS.ROCK, GAME_OPTIONS.PAPER, GAME_OPTIONS.SCISSORS];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Determina quem venceu a rodada
function getWinner(human, machine) {
  if (human === machine) return "draw";
  if (
    (human === GAME_OPTIONS.ROCK && machine === GAME_OPTIONS.SCISSORS) ||
    (human === GAME_OPTIONS.PAPER && machine === GAME_OPTIONS.ROCK) ||
    (human === GAME_OPTIONS.SCISSORS && machine === GAME_OPTIONS.PAPER)
  ) return "human";
  return "machine";
}

// Função principal que acontece quando o jogador clica em um botão
function playHuman(humanChoice) {
  if (gameOver) return; // Evita continuar se o jogo acabou

  // Etapa 1: mostra emoji da jogada do humano imediatamente
  showEmoji(humanEmojiDivs, humanChoice);

  // Etapa 2: depois de 300ms, sorteia a jogada da máquina e mostra o emoji
  setTimeout(() => {
    const machineChoice = playMachine();
    showEmoji(machineEmojiDivs, machineChoice);

    // Etapa 3: depois de mais 200ms (total 1100ms), atualiza o placar
    setTimeout(() => {
      const winner = getWinner(humanChoice, machineChoice);

      if (winner === "human") yourScore++;
      else if (winner === "machine") machineScore++;

      yourScoreSpan.textContent = yourScore;
      machineScoreSpan.textContent = machineScore;

      if (yourScore === 5 || machineScore === 5) endGame(); // Checa se alguém venceu
    }, 800);
  }, 300);
}

// Mostra mensagem de vitória ou derrota e reinicia o jogo ao clicar
function endGame() {
  gameOver = true;

  const message = document.createElement("div");
  message.textContent = yourScore === 5 ? "🎉 Vencedor!" : "😢 Sinto muito!";

  // Estiliza dinamicamente a caixa da mensagem final
  Object.assign(message.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "50px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px black",
    animation: "pulse 1s infinite alternate",
    zIndex: 9999
  });

  document.body.appendChild(message);

  // Um clique em qualquer parte da tela reinicia o jogo
  document.body.addEventListener("click", () => location.reload(), { once: true });
}

// Adiciona eventos de clique aos botões para iniciar o jogo
buttonRock.addEventListener("click", () => playHuman(GAME_OPTIONS.ROCK));
buttonPaper.addEventListener("click", () => playHuman(GAME_OPTIONS.PAPER));
buttonScissors.addEventListener("click", () => playHuman(GAME_OPTIONS.SCISSORS));