const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {   
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.left = `${marioPosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
    }
}, 10);

    let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // Recupera o recorde salvo

const elementoScore = document.getElementById("score-atual");
const elementoHiScore = document.getElementById("hi-score-texto");

// Função para formatar o número com zeros (ex: 5 vira 00005)
function formatarScore(num) {
    return num.toString().padStart(5, '0');
}

// Mostrar o High Score logo de cara se ele existir
if (highScore > 0) {
    elementoHiScore.innerText = "HI " + formatarScore(highScore);
}

function atualizarContador() {
    score++; // Aumenta 1 ponto por frame (ou ciclo)
    elementoScore.innerText = formatarScore(score);

    // Se bater o recorde atual, o HI score brilha ou atualiza junto (opcional)
    if (score > highScore) {
        highScore = score;
        elementoHiScore.innerText = "HI " + formatarScore(highScore);
    }

    // Loop do jogo (roda a ~60fps)
    requestAnimationFrame(atualizarContador);
}

// Inicia o contador
atualizarContador();

// Função para chamar quando o Dino bater (Game Over)
function gameOver() { 
    localStorage.setItem("highScore", highScore); // Salva o recorde permanentemente
    alert("Game Over! Score: " + score);
}



document.addEventListener('keydown', jump)