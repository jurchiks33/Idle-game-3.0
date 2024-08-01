// script.js
let gold = 0;
let goldPerClick = 1;
let upgradeCost = 10;
let upgradeLevel = 1; 
let autoClickerInterval = null;
let autoClickerSpeed = 10; // 1 second, changed to 0.1 for testing
let autoClickerUpgradeCost = 25;
let autoClickerLevel = 1;

// Gold Mine Variables
let goldMineActive = false;
let goldMineCost = 5000;
let goldMinePayout = 1000;
let goldMineLevel = 1;
let goldMineInterval = 60000; // 60 seconds
let goldCartLevel = 1;
let goldCartUpgradeCost = 500;
let goldMineUpgradeCost = 1000;
let mineTimer;

// Initialize the UI
document.getElementById('gold-mine-button').innerText = `Open Gold Mine (${goldMineCost} Gold)`;

// Event Listeners
document.getElementById('collect-button').onclick = () => {
    gold += goldPerClick;
    updateGoldDisplay();
}

document.getElementById('gold-mine-button').onclick = () => {
    if (!goldMineActive && gold >= goldMineCost) {
        gold -= goldMineCost;
        activateGoldMine();
    }
}

document.getElementById('upgrade-click').onclick = () => {
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        goldPerClick += 1;
        upgradeLevel += 1;
        upgradeCost = Math.round(upgradeCost * 1.5); 
        updateGoldDisplay();
        updateUpgradeButton();
        checkAutoClickerAvailability(); 
    }
};

document.getElementById('auto-upgrade-click').onclick = () => {
    if (gold >= autoClickerUpgradeCost) {
        gold -= autoClickerUpgradeCost;
        autoClickerLevel += 1;
        autoClickerSpeed = Math.max(autoClickerSpeed - 1, 1);
        autoClickerUpgradeCost = Math.round(autoClickerUpgradeCost * 1.8); 
        updateGoldDisplay();
        updateAutoClickerButton();
        if (autoClickerInterval) {
            clearInterval(autoClickerInterval);
            autoClickerInterval = setInterval(() => {
                gold += goldPerClick;
                updateGoldDisplay();
            }, autoClickerSpeed);
        }
    }
};

document.getElementById('auto-click-button').onclick = () => {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
        autoClickerInterval = null;
        document.getElementById('auto-click-button').innerText = 'Start Auto-Clicker'; 
    } else {
        autoClickerInterval = setInterval(() => {
            gold += goldPerClick;
            updateGoldDisplay();
        }, autoClickerSpeed);
        document.getElementById('auto-click-button').innerText = 'Stop Auto-Clicker'; 
    }
};

document.getElementById('upgrade-carts-button').onclick = () => {
    if (gold >= goldCartUpgradeCost) {
        gold -= goldCartUpgradeCost;
        goldCartLevel += 1;
        goldMineInterval = Math.max(goldMineInterval - 10, 1000); // Decrease interval, min 1 sec
        goldCartUpgradeCost = Math.round(goldCartUpgradeCost * 1.2); // Increase cost by 20%
        updateGoldDisplay();
        updateGoldMineUI();
    }
};

document.getElementById('upgrade-mine-button').onclick = () => {
    if (gold >= goldMineUpgradeCost) {
        gold -= goldMineUpgradeCost;
        goldMineLevel += 1;
        goldMinePayout = Math.round(goldMinePayout * 1.0075); // Increase payout by 0.75%
        goldMineUpgradeCost = Math.round(goldMineUpgradeCost * 1.5); // Increase cost by 50%
        updateGoldDisplay();
        updateGoldMineUI();
    }
};

// Functions
function activateGoldMine() {
    goldMineActive = true;
    document.getElementById('gold-mine-button').innerText = `Gold Mine Active - Payout: ${goldMinePayout}`;
    document.getElementById('gold-mine-button').style.backgroundColor = 'green';
    document.getElementById('gold-mine-upgrades').style.display = 'block';
    mineTimer = setInterval(() => {
        gold += goldMinePayout;
        updateGoldDisplay();
    }, goldMineInterval);
    updateGoldMineUI();
}

function updateGoldDisplay() {
    document.getElementById('gold-amount').innerText = gold;
}

function updateUpgradeButton() {
    document.getElementById('upgrade-click').innerText = `Upgrade Click (${upgradeCost} Gold) - Current: ${goldPerClick} per click`;
    document.getElementById('upgrade-level').innerText = `Level: ${upgradeLevel}`; 
}

function updateAutoClickerButton() {
    document.getElementById('auto-upgrade-click').innerText = `Upgrade Auto-Clicker (${autoClickerUpgradeCost} Gold)`;
    document.getElementById('auto-upgrade-level').innerText = `Auto-Clicker Level: ${autoClickerLevel}`;
}

function updateGoldMineUI() {
    document.getElementById('gold-mine-button').innerText = `Gold Mine Active - Payout: ${goldMinePayout}`;
    document.getElementById('mine-level').innerText = `Level: ${goldMineLevel}`;
    document.getElementById('cart-level').innerText = `Cart Level: ${goldCartLevel}`;
    document.getElementById('upgrade-carts-button').innerText = `Upgrade Gold Carts (Cost: ${goldCartUpgradeCost} Gold)`;
    document.getElementById('upgrade-mine-button').innerText = `Upgrade Gold Mine (Cost: ${goldMineUpgradeCost} Gold)`;
}

function checkAutoClickerAvailability() {
    if (upgradeLevel >= 10) { 
        document.getElementById('auto-click-button').style.display = 'block';
    }
}

// Initial UI update
updateUpgradeButton();
updateAutoClickerButton();
updateGoldMineUI();
