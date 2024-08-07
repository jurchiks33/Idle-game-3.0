// game.js
import { updateGoldDisplay, updateUpgradeButton, updateAutoClickerButton, updateGoldMineUI, updateMinePayout, updateWorkersButton, updateFactoryButton, updateSkillButton, showAutoClickerButton, showGameContainer2 } from './ui.js';

export let gold = 0;
export let goldPerClick = 1;
export let upgradeCost = 10;
export let upgradeLevel = 1;
export let autoClickerInterval = null;
export let autoClickerSpeed = 1000; 
export let autoClickerUpgradeCost = 25;
export let autoClickerLevel = 1;
export let goldMineActive = false;
export let goldMineCost = 5000;
export let goldMinePayout = 1000;
export let goldMineLevel = 1;
export let goldMineInterval = 60000;
export let goldCartLevel = 1;
export let goldCartUpgradeCost = 500;
export let goldMineUpgradeCost = 1000;
export let mineTimer = null;
export let workersLevel = 0;
export let hireWorkersCost = 25000;
export let earningsMultiplier = 1;
export let factoryLevel = 0;
export let factoryCost = 75000;
export let skillLevel = Array(20).fill(0);
export let skillCost = Array(20).fill(100);

export function activateGoldMine() {
    goldMineActive = true;
    document.getElementById('gold-mine-button').style.display = 'none';
    document.getElementById('mine-payout').style.display = 'block';
    document.getElementById('workers-level').style.display = 'block';
    document.getElementById('hire-workers-button').style.display = 'block';
    document.getElementById('factory-level').style.display = 'block';
    document.getElementById('factory-button').style.display = 'block';
    document.getElementById('gold-mine-upgrades').style.display = 'block';
    updateMinePayout(goldMinePayout, earningsMultiplier);
    mineTimer = setInterval(() => {
        gold += goldMinePayout * earningsMultiplier;
        updateGoldDisplay(gold);
    }, goldMineInterval);
    startMineTimer();
    updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
}

export function hireWorkers() {
    gold -= hireWorkersCost;
    workersLevel += 1;
    earningsMultiplier = 1 + (workersLevel * 0.1);
    hireWorkersCost = Math.round(hireWorkersCost * 2.3);
}

export function buildFactory() {
    gold -= factoryCost;
    factoryLevel += 1;
    factoryCost = Math.round(factoryCost * 1.35);
}

export function upgradeClick() {
    gold -= upgradeCost;
    goldPerClick += 1;
    upgradeLevel += 1;
    upgradeCost = Math.round(upgradeCost * 1.5);
}

export function upgradeAutoClicker() {
    gold -= autoClickerUpgradeCost;
    autoClickerLevel += 1;
    autoClickerSpeed = Math.max(autoClickerSpeed - 1, 1);
    autoClickerUpgradeCost = Math.round(autoClickerUpgradeCost * 1.8);
}

export function startAutoClicker() {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
        autoClickerInterval = null;
        document.getElementById('auto-click-button').innerText = 'Start Auto-Clicker';
    } else {
        autoClickerInterval = setInterval(() => {
            gold += goldPerClick * earningsMultiplier;
            updateGoldDisplay(gold);
        }, autoClickerSpeed);
        document.getElementById('auto-click-button').innerText = 'Stop Auto-Clicker';
    }
}

export function upgradeCarts() {
    gold -= goldCartUpgradeCost;
    goldCartLevel += 1;
    goldMineInterval = Math.max(goldMineInterval - 1000, 1000);
    goldCartUpgradeCost = Math.round(goldCartUpgradeCost * 1.2);
}

export function upgradeMine() {
    gold -= goldMineUpgradeCost;
    goldMineLevel += 1;
    goldMinePayout = Math.round(goldMinePayout * 1.0075);
    goldMineUpgradeCost = Math.round(goldMineUpgradeCost * 1.5);
}

export function upgradeSkill(skillIndex) {
    if (gold >= skillCost[skillIndex]) {
        gold -= skillCost[skillIndex];
        skillLevel[skillIndex] += 1;
        skillCost[skillIndex] = Math.round(skillCost[skillIndex] * 1.35);
    }
}

export function startMineTimer() {
    let countdown = 0;
    const countdownInterval = setInterval(() => {
        countdown += 100;
        let progress = Math.min(countdown / goldMineInterval, 1);
        document.getElementById('mine-payout').style.backgroundImage = 
            `linear-gradient(to right, green ${progress * 100}%, gray ${progress * 100}%)`;
        if (progress === 1) {
            clearInterval(countdownInterval);
            startMineTimer();
        }
    }, 100);
}
