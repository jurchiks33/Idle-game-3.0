import { collectGold, upgradeClick, upgradeAutoClicker, toggleAutoClicker } from './game.js';

export function initializeEvents() {
    document.getElementById('collect-button').onclick = collectGold;
    document.getElementById('upgrade-click').onclick = upgradeClick;
    document.getElementById('auto-upgrade-click').onclick = upgradeAutoClicker;
    document.getElementById('auto-click-button').onclick = toggleAutoClicker;

    // Add other event listeners here (e.g., goldMineButton, hireWorkersButton, factoryButton, skillButtons, etc.)
}
