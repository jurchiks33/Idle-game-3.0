// ui.js

export function initializeUI() {
    updateGoldDisplay(0);
    updateUpgradeButton(10, 1, 1000000000, 1);
    updateAutoClickerButton(25, 1);
    updateGoldMineUI(5000, 1, 1, 500, 1000, 0, 25000);
    updateMinePayout(10000000, 1);
    updateWorkersButton(25000, 0);
    updateFactoryButton(75000, 0);

    const cubesContainer = document.getElementById('cubes-container');
    cubesContainer.innerHTML = ''; // Clear the container

    // Create 20 skill cubes but hide them initially
    for (let i = 1; i <= 20; i++) {
        const cube = document.createElement('div');
        cube.className = 'cube';
        cube.id = `cube-${i}`;
        cube.innerHTML = `
            <div id="skill${i}-level" style="display:none;">Skill ${i} Level: 0</div>
            <button id="skill${i}-button" style="display:none;">Skill ${i} (Cost: 0 Gold)</button>
        `;
        cubesContainer.appendChild(cube);
    }
}

export function updateGoldDisplay(gold) {
    document.getElementById('gold-amount').innerText = `Gold: ${gold.toFixed(2)}`;
}

export function updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier) {
    document.getElementById('upgrade-click').innerText = `Upgrade Click (${upgradeCost} Gold) - Current: ${Math.round(goldPerClick * earningsMultiplier)} per click`;
    document.getElementById('upgrade-level').innerText = `Level: ${upgradeLevel}`;
}

export function updateAutoClickerButton(autoClickerUpgradeCost, autoClickerLevel) {
    document.getElementById('auto-upgrade-click').innerText = `Upgrade Auto-Clicker (${autoClickerUpgradeCost} Gold)`;
    document.getElementById('auto-upgrade-level').innerText = `Auto-Clicker Level: ${autoClickerLevel}`;
}

export function updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost) {
    document.getElementById('gold-mine-button').innerText = `Open Gold Mine (${goldMineCost} Gold)`;
    document.getElementById('mine-level').innerText = `Mine Level: ${goldMineLevel}`;
    document.getElementById('cart-level').innerText = `Cart Level: ${goldCartLevel}`;
    document.getElementById('upgrade-carts-button').innerText = `Upgrade Gold Carts (Cost: ${goldCartUpgradeCost} Gold)`;
    document.getElementById('upgrade-mine-button').innerText = `Upgrade Gold Mine (Cost: ${goldMineUpgradeCost} Gold)`;
    document.getElementById('workers-level').innerText = `Workers Level: ${workersLevel}`;
    document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`;
}

export function updateMinePayout(goldMinePayout, earningsMultiplier) {
    document.getElementById('mine-payout').innerText = `Payout: ${Math.round(goldMinePayout * earningsMultiplier)} Gold`;
}

export function updateWorkersButton(hireWorkersCost, workersLevel) {
    document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`;
}

export function updateFactoryButton(factoryCost, factoryLevel) {
    document.getElementById('factory-level').innerText = `Factory Level: ${factoryLevel}`;
    document.getElementById('factory-button').innerText = `Build Factory (${factoryCost} Gold)`;
}

export function updateSkillButton(skillIndex, skillCost, skillLevel) {
    document.getElementById(`skill${skillIndex}-button`).innerText = `Skill ${skillIndex} (Cost: ${skillCost} Gold)`;
    document.getElementById(`skill${skillIndex}-level`).innerText = `Skill ${skillIndex} Level: ${skillLevel}`;
}

export function showAutoClickerButton() {
    document.getElementById('auto-click-button').style.display = 'block';
}

export function showGameContainer2() {
    document.getElementById('game-container-2').style.display = 'block';
}

export function updateGameContainer2(factoryLevel) {
    const cubesToShow = factoryLevel * 2; // Number of cubes to show based on factory level
    for (let i = 1; i <= 20; i++) {
        const cube = document.getElementById(`cube-${i}`);
        if (i <= cubesToShow) {
            cube.style.display = 'block';
            document.getElementById(`skill${i}-level`).style.display = 'block';
            document.getElementById(`skill${i}-button`).style.display = 'block';
        } else {
            cube.style.display = 'none';
        }
    }
}
