'use strict';

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function updateScores(scores, newScore) {
    scores.push(newScore);
    scores.sort((a, b) => b.hits - a.hits || b.percentage - a.percentage);
    return scores.splice(0, 10);
}

export function saveScoresToLocalStorage(scores) {
    localStorage.setItem('scores', JSON.stringify(scores));
}

export function loadScoresFromLocalStorage() {
    const scores = localStorage.getItem('scores');
    return scores ? JSON.parse(scores) : [];
}
