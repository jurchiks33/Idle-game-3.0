import { initializeUI } from './ui.js';
import { initializeGame } from './game.js';
import { initializeEvents } from './events.js';

document.addEventListener("DOMContentLoaded", () => {
    initializeUI();
    initializeGame();
    initializeEvents();
});