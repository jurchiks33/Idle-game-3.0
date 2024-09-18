// main.js

import { initializeGame } from './game.js';
import { initializeUpgradeTree } from './upgradeTree.js';

// Combine game initialization and upgrade tree initialization
function initializeEverything() {
    initializeGame();           // Initialize the game
    initializeUpgradeTree();     // Initialize the upgrade tree
}

// Use DOMContentLoaded to initialize after the document is ready
document.addEventListener("DOMContentLoaded", () => {
    initializeEverything();      // Initialize both the game and the upgrade tree
});
