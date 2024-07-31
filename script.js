let gold = 0;
let goldPerClick = 1;
let upgradeCost = 10;

document.getElementById('collect-button').onclick = () => {
    gold += goldPerClick;
    updateGoldDisplay();
}

document.getElementById('upgrade-click').onclick = () => {
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        goldPerClick += 1;
        upgradeCost = Math.round(upgradeCost * 1.5); // Increase the cost by 1.5 times
        updateGoldDisplay();
        updateUpgradeButton();
    }
};

function updateGoldDisplay() {
    document.getElementById('gold-amount').innerText = gold;
}

function updateUpgradeButton() {
    document.getElementById('upgrade-click').innerText = `Upgrade Click (Cost: ${upgradeCost} Gold) - Current: ${goldPerClick} per click`;
}

updateUpgradeButton();
