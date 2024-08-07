import { updateGoldDisplay, updateUpgradeButton, updateAutoClickerButton, updateGoldMineUI, updateMinePayout, updateWorkersButton, updateFactoryButton, updateSkillButton, showAutoClickerButton, showGameContainer2 } from './ui.js';

let gold = 0;
let goldPerClick = 1000000000;
let upgradeCost = 10;
let upgradeLevel = 1;
let autoClickerInterval = null;
let autoClickerSpeed = 10;
let autoClickerUpgradeCost = 25;
let autoClickerLevel = 1;

let goldMineActive = false;
let goldMineCost = 5000;
let goldMinePayout = 10000000;
let goldMineLevel = 1;
let goldMineInterval = 600;
let goldCartLevel = 1;
let goldCartUpgradeCost = 500;
let goldMineUpgradeCost = 1000;
let mineTimer;

let workersLevel = 0;
let hireWorkersCost = 25000;
let earningsMultiplier = 1;

let factoryLevel = 0;
let factoryCost = 75000;

let skill1Level = 0;
let skill1Cost = 150000;
let skill2Level = 0;
let skill2Cost = 175000;

export function initializeGame() {
    updateGoldDisplay(gold);
    updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier);
    updateAutoClickerButton(autoClickerUpgradeCost, autoClickerLevel);
    updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
    updateMinePayout(goldMinePayout, earningsMultiplier);
    updateWorkersButton(hireWorkersCost, workersLevel);
    updateFactoryButton(factoryCost, factoryLevel);
    updateSkillButton(1, skill1Cost, skill1Level);
    updateSkillButton(2, skill2Cost, skill2Level);
}

export function collectGold() {
    gold += goldPerClick * earningsMultiplier;
    updateGoldDisplay(gold);
}

export function upgradeClick() {
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        goldPerClick += 1;
        upgradeLevel += 1;
        upgradeCost = Math.round(upgradeCost * 1.5);
        updateGoldDisplay(gold);
        updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier);
        if (upgradeLevel >= 10) {
            showAutoClickerButton();
        }
    }
}

export function upgradeAutoClicker() {
    if (gold >= autoClickerUpgradeCost) {
        gold -= autoClickerUpgradeCost;
        autoClickerLevel += 1;
        autoClickerSpeed = Math.max(autoClickerSpeed - 1, 1);
        autoClickerUpgradeCost = Math.round(autoClickerUpgradeCost * 1.8);
        updateGoldDisplay(gold);
        updateAutoClickerButton(autoClickerUpgradeCost, autoClickerLevel);
        if (autoClickerInterval) {
            clearInterval(autoClickerInterval);
            autoClickerInterval = setInterval(() => {
                collectGold();
            }, autoClickerSpeed);
        }
    }
}

export function toggleAutoClicker() {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
        autoClickerInterval = null;
        document.getElementById('auto-click-button').innerText = 'Start Auto-Clicker';
    } else {
        autoClickerInterval = setInterval(() => {
            collectGold();
        }, autoClickerSpeed);
        document.getElementById('auto-click-button').innerText = 'Stop Auto-Clicker';
    }
}

// Add other game logic functions here (e.g., activateGoldMine, hireWorkers, buildFactory, upgradeSkills, etc.)