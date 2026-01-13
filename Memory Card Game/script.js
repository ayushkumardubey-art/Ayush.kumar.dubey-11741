/* Project: Memory Game | Author: Ayush Kumar Dubey (11741) */

const grid = document.getElementById('gameGrid');
const movesDisplay = document.getElementById('moves');
const icons = ['🚀', '💻', '🍕', '⚽', '🎧', '🎸', '🐶', '🚗'];
let cards = [...icons, ...icons]; // Duplicate for pairs

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;

function shuffle() {
    cards.sort(() => 0.5 - Math.random());
}

function createBoard() {
    shuffle();
    cards.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;

        const front = document.createElement('div');
        front.classList.add('front');
        front.innerText = icon;

        const back = document.createElement('div');
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.innerText = moves;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

createBoard();
