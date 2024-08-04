// script.js
let gold = 0;
let goldPerClick = 1;
let upgradeCost = 10;
let upgradeLevel = 1; 
let autoClickerInterval = null;
let autoClickerSpeed = 10; // Set to 1000 for a real scenario
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

// Workers Variables
let workersLevel = 0;
let hireWorkersCost = 25000;
let earningsMultiplier = 1; // Start with no multiplier

// Factory variables
let factoryLevel = 0;
let factoryCost = 75000;

// Initialize the UI
document.getElementById('gold-mine-button').innerText = `Open Gold Mine (${goldMineCost} Gold)`; // Initial state text
document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`; // Initial state text
document.getElementById('factory-button').innerText = 'Build Factory (${factoryCost} Gold';

// Event Listeners
document.getElementById('collect-button').onclick = () => {
    gold += goldPerClick * earningsMultiplier;
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
                gold += goldPerClick * earningsMultiplier;
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
            gold += goldPerClick * earningsMultiplier;
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
        goldMinePayout = Math.round(goldMinePayout * 1.075); // Increase payout by 0.75%
        goldMineUpgradeCost = Math.round(goldMineUpgradeCost * 1.25); // Increase cost by 50%
        updateGoldDisplay();
        updateGoldMineUI();
        updateMinePayout(); // Update payout amount immediately
    }
};

document.getElementById('hire-workers-button').onclick = () => {
    if (gold >= hireWorkersCost) {
        gold -= hireWorkersCost;
        workersLevel += 1;
        earningsMultiplier = 1 + (workersLevel * 0.1); // Increase earnings by 10% per worker level
        hireWorkersCost = Math.round(hireWorkersCost * 2.3); // Increase cost by 2.3 times
        updateGoldDisplay();
        updateWorkersButton();
        updateGoldMineUI(); // Update mine UI to reflect new earnings
        updateMinePayout(); // Update payout amount immediately
        updateUpgradeButton(); // Update click upgrade button to reflect new earnings
    }
};

// Functions
function activateGoldMine() {
    goldMineActive = true; // Set gold mine as active
    document.getElementById('gold-mine-button').style.display = 'none'; // Hide the button
    document.getElementById('mine-payout').style.display = 'block'; // Show payout
    document.getElementById('workers-level').style.display = 'block'; // Show workers level
    document.getElementById('hire-workers-button').style.display = 'block'; // Show hire workers button
    document.getElementById('gold-mine-upgrades').style.display = 'block'; // Show upgrades
    updateMinePayout(); // Update payout display
    mineTimer = setInterval(() => {
        gold += goldMinePayout * earningsMultiplier;
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
    document.getElementById('gold-amount').innerText = `Gold: ${gold.toFixed(2)}`;
}

function updateUpgradeButton() {
    document.getElementById('upgrade-click').innerText = `Upgrade Click (${upgradeCost} Gold) - Current: ${Math.round(goldPerClick * earningsMultiplier)} per click`;
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
    document.getElementById('workers-level').innerText = `Workers Level: ${workersLevel}`; // Update workers level
    document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`; // Update hire workers cost
}

function updateMinePayout() {
    document.getElementById('mine-payout').innerText = `Payout: ${Math.round(goldMinePayout * earningsMultiplier)} Gold`;
}

function updateWorkersButton() {
    document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`;
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
updateMinePayout();
updateWorkersButton();
