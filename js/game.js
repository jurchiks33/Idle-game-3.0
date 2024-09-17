// game.js

import {
    initializeUI,
    updateGoldDisplay,
    updateUpgradeButton,
    updateAutoClickerButton,
    updateGoldMineUI,
    updateMinePayout,
    updateWorkersButton,
    updateFactoryButton,
    updateSkillButton,
    showAutoClickerButton,
    showGameContainer2,
    updateGameContainer2
} from './ui.js';

let gold = 0;
let goldPerClick = 1000000000;
let upgradeCost = 10;
let upgradeLevel = 1;
let autoClickerInterval = null;
let autoClickerSpeed = 10; 
let autoClickerUpgradeCost = 25;
let autoClickerLevel = 1;

// Gold Mine Variables
let goldMineActive = false;
let goldMineCost = 5000;
let goldMinePayout = 10000000;
let goldMineLevel = 1;
let goldMineInterval = 600;
let goldCartLevel = 1;
let goldCartUpgradeCost = 500;
let goldMineUpgradeCost = 1000;
let mineTimer;

// Workers Variables
let workersLevel = 0;
let hireWorkersCost = 25000;
let earningsMultiplier = 1;

// Factory Variables
let factoryLevel = 0;
let factoryCost = 75000;

// Skills Variables (use an array to manage skills)
let skills = [
    { level: 0, cost: 100 },
    { level: 0, cost: 200 },
    { level: 0, cost: 300 },
    { level: 0, cost: 400 },
    { level: 0, cost: 500 },
    { level: 0, cost: 600 },
    { level: 0, cost: 700 },
    { level: 0, cost: 800 },
    { level: 0, cost: 900 },
    { level: 0, cost: 1000 },
    { level: 0, cost: 1100 },
    { level: 0, cost: 1200 },
    { level: 0, cost: 1300 },
    { level: 0, cost: 1400 },
    { level: 0, cost: 1500 },
    { level: 0, cost: 1600 },
    { level: 0, cost: 1700 },
    { level: 0, cost: 1800 },
    { level: 0, cost: 1900 },
    { level: 0, cost: 2000 }
];

export function initializeGame() {
    initializeUI();

    document.getElementById('collect-button').onclick = () => {
        gold += goldPerClick * earningsMultiplier;
        updateGoldDisplay(gold);
    };

    document.getElementById('gold-mine-button').onclick = () => {
        if (!goldMineActive && gold >= goldMineCost) {
            gold -= goldMineCost;
            activateGoldMine();
        }
    };

    document.getElementById('upgrade-click').onclick = () => {
        if (gold >= upgradeCost) {
            gold -= upgradeCost;
            goldPerClick += 1;
            upgradeLevel += 1;
            upgradeCost = Math.round(upgradeCost * 1.5); 
            updateGoldDisplay(gold);
            updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier);
            checkAutoClickerAvailability(); 
        }
    };

    document.getElementById('auto-upgrade-click').onclick = () => {
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
                    gold += goldPerClick * earningsMultiplier;
                    updateGoldDisplay(gold);
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
                updateGoldDisplay(gold);
            }, autoClickerSpeed);
            document.getElementById('auto-click-button').innerText = 'Stop Auto-Clicker'; 
        }
    };

    document.getElementById('upgrade-carts-button').onclick = () => {
        if (gold >= goldCartUpgradeCost) {
            gold -= goldCartUpgradeCost;
            goldCartLevel += 1;
            goldMineInterval = Math.max(goldMineInterval - 10, 1000); 
            goldCartUpgradeCost = Math.round(goldCartUpgradeCost * 1.2); 
            updateGoldDisplay(gold);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
        }
    };

    document.getElementById('upgrade-mine-button').onclick = () => {
        if (gold >= goldMineUpgradeCost) {
            gold -= goldMineUpgradeCost;
            goldMineLevel += 1;
            goldMinePayout = Math.round(goldMinePayout * 1.0075); 
            goldMineUpgradeCost = Math.round(goldMineUpgradeCost * 1.5); 
            updateGoldDisplay(gold);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
            updateMinePayout(goldMinePayout, earningsMultiplier);
        }
    };

    document.getElementById('hire-workers-button').onclick = () => {
        if (gold >= hireWorkersCost) {
            gold -= hireWorkersCost;
            workersLevel += 1;
            earningsMultiplier = 1 + (workersLevel * 0.1);
            hireWorkersCost = Math.round(hireWorkersCost * 2.3); 
            updateGoldDisplay(gold);
            updateWorkersButton(hireWorkersCost, workersLevel);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost); 
            updateMinePayout(goldMinePayout, earningsMultiplier); 
            updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier);
        }
    };

    document.getElementById('factory-button').onclick = () => {
        if (factoryLevel >= 20) {
            alert('Factory cannot be upgraded beyond level 20!');
            return; // Prevent further upgrades
        }
        if (gold >= factoryCost) {
            gold -= factoryCost;
            factoryLevel += 1;
            factoryCost = Math.round(factoryCost * 1.35); 
            updateGoldDisplay(gold);
            updateFactoryButton(factoryCost, factoryLevel);
            showGameContainer2(); 
            updateGameContainer2(factoryLevel);
        }
    };
    

    // Bind skill upgrade buttons
    for (let i = 1; i <= 20; i++) {
        document.getElementById(`skill${i}-button`).onclick = () => {
            upgradeSkill(i - 1);
        };
    }
}

function upgradeSkill(index) {
    if (gold >= skills[index].cost) {
        gold -= skills[index].cost;
        skills[index].level += 1;
        skills[index].cost = Math.round(skills[index].cost * 1.35); 
        updateGoldDisplay(gold);
        updateSkillButton(index + 1, skills[index].cost, skills[index].level);
    }
}

function activateGoldMine() {
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

function startMineTimer() {
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

function checkAutoClickerAvailability() {
    if (upgradeLevel >= 10) {
        showAutoClickerButton();
    }
}

export function applySkill1Effect() {
    upgradeCost *= 1 - (skills[0].level * 0.01);
    autoClickerUpgradeCost *= 1 - (skills[0].level * 0.01);
    goldCartUpgradeCost *= 1 - (skills[0].level * 0.01);
    goldMineUpgradeCost *= 1 - (skills[0].level * 0.01);
    hireWorkersCost *= 1 - (skills[0].level * 0.01);
    factoryCost *= 1 - (skills[0].level * 0.01);
}
