// script.js
let gold = 0;
let goldPerClick = 1;
let upgradeCost = 10;
let upgradeLevel = 1; 
let autoClickerInterval = null;
let autoClickerSpeed = 1000;
let autoClickerUpgradeCost = 25;
let autoClickerLevel = 1;

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

function updateGoldDisplay() {
    document.getElementById('gold-amount').innerText = gold;
}

function updateUpgradeButton() {
    document.getElementById('upgrade-click').innerText = `Upgrade Click (${upgradeCost} Gold) - Current: ${goldPerClick} per click`;
    document.getElementById('upgrade-level').innerText = `Level: ${upgradeLevel}`; 
}

function updateAutoClickerButton() {
    document.getElementById('auto-upgrade-click').innerText = `Upgrade Auto-Clicker (${autoClickerUpgradeCost} Gold)`;
    document.getElementById('auto-upgrade-level').innerText = `Auto-Clicker Level: ${autoClickerLevel} (1000)`;
}

function checkAutoClickerAvailability() {
    if (upgradeLevel >= 10) { 
        document.getElementById('auto-click-button').style.display = 'block';
    }
}

updateUpgradeButton();
updateAutoClickerButton();
