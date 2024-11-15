'use strict';

const wordBank = [
  'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
  'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
  'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
  'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
  'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone',
  'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
  'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze',
  'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology',
  'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
  'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
  'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown',
  'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
  'beach', 'economy', 'interview', 'awesome', 'challenge', 'science',
  'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software',
  'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep',
  'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary',
  'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil',
  'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
  'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort',
  'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media',
  'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond',
  'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon',
  'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust',
  'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony',
  'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision',
  'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet',
  'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo',
  'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure',
  'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle',
  'film', 'jupiter'
  ];

let words = [...wordBank];
let score = 0;
let interval;
let currentWord;
const startingTimer = 15;
const scores = [];

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

timerDisplay.textContent = startingTimer;

class Score {
    #date;
    #hits;
    #percentage;
    constructor(date, hits, percentage) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }
    get date() { return this.#date; }
    get hits() { return this.#hits; }
    get percentage() { return this.#percentage; }
}

function startGame() {
    score = 0;
    let timer = startingTimer;
    words = [...wordBank];
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
    if (words.length === 0) return endGame();
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words.splice(randomIndex, 1)[0];
    wordDisplay.textContent = currentWord;
}

function endGame() {
    clearInterval(interval);
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.load();
    wordInput.disabled = true;

    endGameSound.currentTime = 0;
    endGameSound.play();

    const date = new Date().toLocaleDateString();
    const percentage = ((score / wordBank.length) * 100).toFixed(2);
    const newScore = new Score(date, score, percentage);
    scores.push(newScore);
    displayScores();
}

function displayScores() {
  let scoreHistoryHtml = '';
    scores.reverse().forEach(score => {
      scoreHistoryHtml += `<p>${score.date} - Hits: ${score.hits}, Percentage: ${score.percentage}%</p>`;
    });
    scoreHistory.innerHTML = scoreHistoryHtml;
}

wordInput.addEventListener('input', () => {
    if (wordInput.value.trim() === currentWord) {
        score++;
        scoreDisplay.textContent = score;
        wordInput.value = '';
        nextWord();
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);