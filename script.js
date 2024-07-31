let gold = 0;
let goldPerClick = 1;
let upgradeCost = 10;
let upgradeLevel = 1; 
let autoClickerInterval; 

document.getElementById('collect-button').onclick = () => {
    gold += goldPerClick;
    updateGoldDisplay();
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

document.getElementById('auto-click-button').onclick = () => {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
        autoClickerInterval = null;
        document.getElementById('auto-click-button').innerText = 'Start Auto-Clicker'; 
    } else {
        autoClickerInterval = setInterval(() => {
            gold += goldPerClick;
            updateGoldDisplay();
        }, 100);
        document.getElementById('auto-click-button').innerText = 'Stop Auto-Clicker'; 
    }
};

function updateGoldDisplay() {
    document.getElementById('gold-amount').innerText = gold;
}

function updateUpgradeButton() {
    document.getElementById('upgrade-click').innerText = `Upgrade Click (Cost: ${upgradeCost} Gold) - Current: ${goldPerClick} per click`;
    document.getElementById('upgrade-level').innerText = `Level: ${upgradeLevel}`; 
}

function checkAutoClickerAvailability() {
    if (upgradeLevel >= 10) { 
        document.getElementById('auto-click-button').style.display = 'block';
    }
}

updateUpgradeButton();
