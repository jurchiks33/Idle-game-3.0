// script.js
let gold = 0;
let goldPerClick = 1;  // increasing from 1 to 100 for testing
let upgradeCost = 10;
let upgradeLevel = 1; 
let autoClickerInterval = null;
let autoClickerSpeed = 10;   // adjusted for test from 1000 to 10
let autoClickerUpgradeCost = 25;
let autoClickerLevel = 1;

// Gold Mine Variables
let goldMineActive = false; // Indicates if gold mine is active
let goldMineCost = 5000;
let goldMinePayout = 1000;
let goldMineLevel = 1;
let goldMineInterval = 60000; // 60 seconds
let goldCartLevel = 1;
let goldCartUpgradeCost = 500;
let goldMineUpgradeCost = 1000;
let mineTimer;

// Initialize the UI
document.getElementById('gold-mine-button').innerText = `Open Gold Mine (${goldMineCost} Gold)`; // Initial state text

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
        updateMinePayout(); // Update payout amount immediately
    }
};

// Functions
function activateGoldMine() {
    goldMineActive = true; // Set gold mine as active
    document.getElementById('gold-mine-button').style.display = 'none'; // Hide the button
    document.getElementById('mine-payout').style.display = 'block'; // Show payout
    document.getElementById('gold-mine-upgrades').style.display = 'block'; // Show upgrades
    updateMinePayout(); // Update payout display
    mineTimer = setInterval(() => {
        gold += goldMinePayout;
        updateGoldDisplay();
    }, goldMineInterval);
    startMineTimer(); // Start visual countdown timer
    updateGoldMineUI();
}

function startMineTimer() {
    let countdown = 0;
    const countdownInterval = setInterval(() => {
        countdown += 100;
        let progress = Math.min(countdown / goldMineInterval, 1); // Calculate progress
        document.getElementById('mine-payout').style.backgroundImage = 
            `linear-gradient(to right, green ${progress * 100}%, gray ${progress * 100}%)`;
        if (progress === 1) {
            clearInterval(countdownInterval);
            startMineTimer(); // Restart timer for continuous updates
        }
    }, 100);
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
    document.getElementById('mine-level').innerText = `Mine Level: ${goldMineLevel}`;
    document.getElementById('cart-level').innerText = `Cart Level: ${goldCartLevel}`;
    document.getElementById('upgrade-carts-button').innerText = `Upgrade Gold Carts (Cost: ${goldCartUpgradeCost} Gold)`;
    document.getElementById('upgrade-mine-button').innerText = `Upgrade Gold Mine (Cost: ${goldMineUpgradeCost} Gold)`;
}

function updateMinePayout() {
    document.getElementById('mine-payout').innerText = `Payout: ${goldMinePayout} Gold`;
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
