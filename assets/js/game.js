'use strict';

import { wordBank } from './words.js';
import { shuffleArray, updateScores, saveScoresToLocalStorage, loadScoresFromLocalStorage } from './utils.js';

const words = [];
let score = 0;
let interval;
let currentWord;
let currentIndex = 0;
const startingTimer = 15;
const scores = loadScoresFromLocalStorage();

const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const timerDisplay = document.querySelector('.timer');
const scoreDisplay = document.querySelector('.score');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const bgMusic = document.querySelector('.background-music');
const endGameSound = document.querySelector('.end-game-sound');
const startGameSound = document.querySelector('.start-game-sound');
const scoreHistory = document.querySelector('.score-history');
const scoreContainer = document.querySelector('.score-container');

timerDisplay.textContent = startingTimer;

function startGame() {
    hideScoreContainer();

    score = 0;
    let timer = startingTimer;
    words.splice(0, words.length, ...wordBank);
    shuffleArray(words);
    currentIndex = 0;
    nextWord();
    wordInput.disabled = false;
    wordInput.focus();
    startBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    startGameSound.play();
    bgMusic.play();
    interval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) endGame();
    }, 1000);
}

function restartGame() {
    clearInterval(interval);
    bgMusic.currentTime = 0;
    bgMusic.load();
    wordInput.value = '';
    scoreDisplay.textContent = score = 0;
    timerDisplay.textContent = startingTimer;
    startGame();
}

function nextWord() {
    if (currentIndex >= words.length) return endGame();
    currentWord = words[currentIndex];
    currentIndex++;
    wordDisplay.textContent = currentWord;
}

function endGame() {
    showScoreContainer();

    clearInterval(interval);
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.load();
    wordInput.disabled = true;

    endGameSound.currentTime = 0;
    endGameSound.play();

    const date = new Date();
    const options = { 
        year: '2-digit', 
        month: '2-digit',
        day: '2-digit' 
    };
    const formattedDate = date.toLocaleDateString('en-CA', options);
    const percentage = ((score / wordBank.length) * 100).toFixed(2);
    const newScore = { formattedDate, hits: score, percentage };

    let existingScores = loadScoresFromLocalStorage();
    
    const updatedScores = updateScores(existingScores, newScore);
    saveScoresToLocalStorage(updatedScores);

    displayScores(updatedScores);
}

function displayScores(scores) {
    if (scores.length === 0) {
        scoreHistory.innerHTML = '<p>No games played yet.</p>';
        return;
    }

    const scoreHistoryHtml = scores
        .map((score, index) => `<p> #${index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        ${score.formattedDate} - Hits: ${score.hits}, Percentage: ${score.percentage}%</p>`)
        .join('');
    scoreHistory.innerHTML = scoreHistoryHtml;
}

function hideScoreContainer() {
    scoreContainer.classList.add('score-hidden');
}

function showScoreContainer() {
    scoreContainer.classList.remove('score-hidden');
}

displayScores(scores);

wordInput.addEventListener('input', () => {
    if (wordInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        score++;
        scoreDisplay.textContent = score;
        wordInput.value = '';
        nextWord();
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
