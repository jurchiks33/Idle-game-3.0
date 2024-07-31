let gold = 0;
let goldPerClick = 1;

document.getElementById('Collect-button').onclick = () => {
    gold += goldPerClick;
    updateGoldDisplay();
}

document.getElementById('upgrade-click').onclick = () => {
    if (gold >=10) {
        gold -= 10;
        goldPerClick += 1;
        updateGoldDisplay();
        document.getElementById('upgrade-click').innerText = 'Upgrade Click (Cost: 10 Gold) - Current: ${goldPerClick} per click';

    }
};

function updateGoldDisplay() {
    document.getElementById('gold-amount').innerText = gold;
}