// main.js
import { initializeUI } from './ui.js';
import { initializeEvents } from './events.js';
import { initializeGame } from './game.js';

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
    initializeUI();
    initializeEvents();
});
