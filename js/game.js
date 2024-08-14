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
    updateGameContainer2 // Added this import
} from './ui.js';

let gold = 0;
let goldPerClick = 1000000000;
let upgradeCost = 10;
let upgradeLevel = 1;
let autoClickerInterval = null;
let autoClickerSpeed = 10; // Set to 1000 for a real scenario
let autoClickerUpgradeCost = 25;
let autoClickerLevel = 1;

// Gold Mine Variables
let goldMineActive = false; // Indicates if gold mine is active
let goldMineCost = 5000;
let goldMinePayout = 10000000;
let goldMineLevel = 1;
let goldMineInterval = 600; // 60000 = 60 seconds
let goldCartLevel = 1;
let goldCartUpgradeCost = 500;
let goldMineUpgradeCost = 1000;
let mineTimer;

// Workers Variables
let workersLevel = 0;
let hireWorkersCost = 25000;
let earningsMultiplier = 1; // Start with no multiplier

// Factory Variables
let factoryLevel = 0;
let factoryCost = 75000;

// Skills Variables
let skill1Level = 0;
let skill1Cost = 150000;
let skill2Level = 0;
let skill2Cost = 175000;

export function initializeGame() {
    initializeUI();

    // Event Listeners
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
            goldMineInterval = Math.max(goldMineInterval - 10, 1000); // Decrease interval, min 1 sec
            goldCartUpgradeCost = Math.round(goldCartUpgradeCost * 1.2); // Increase cost by 20%
            updateGoldDisplay(gold);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
        }
    };

    document.getElementById('upgrade-mine-button').onclick = () => {
        if (gold >= goldMineUpgradeCost) {
            gold -= goldMineUpgradeCost;
            goldMineLevel += 1;
            goldMinePayout = Math.round(goldMinePayout * 1.0075); // Increase payout by 0.75%
            goldMineUpgradeCost = Math.round(goldMineUpgradeCost * 1.5); // Increase cost by 50%
            updateGoldDisplay(gold);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
            updateMinePayout(goldMinePayout, earningsMultiplier); // Update payout amount immediately
        }
    };

    document.getElementById('hire-workers-button').onclick = () => {
        if (gold >= hireWorkersCost) {
            gold -= hireWorkersCost;
            workersLevel += 1;
            earningsMultiplier = 1 + (workersLevel * 0.1); // Increase earnings by 10% per worker level
            hireWorkersCost = Math.round(hireWorkersCost * 2.3); // Increase cost by 2.3 times
            updateGoldDisplay(gold);
            updateWorkersButton(hireWorkersCost, workersLevel);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost); // Update mine UI to reflect new earnings
            updateMinePayout(goldMinePayout, earningsMultiplier); // Update payout amount immediately
            updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier); // Update click upgrade button to reflect new earnings
        }
    };

    document.getElementById('factory-button').onclick = () => {
        if (gold >= factoryCost) {
            gold -= factoryCost;
            factoryLevel += 1;
            factoryCost = Math.round(factoryCost * 1.35); // Increase cost by 35%
            updateGoldDisplay(gold);
            updateFactoryButton(factoryCost, factoryLevel);
            updateGameContainer2(factoryLevel); // Call updateGameContainer2 with factoryLevel
        }
    };

    for (let i = 1; i <= 20; i++) {
        document.getElementById(`skill${i}-button`).onclick = () => {
            if (gold >= skill1Cost) {
                gold -= skill1Cost;
                skill1Level += 1;
                skill1Cost = Math.round(skill1Cost * 1.35); // Increase cost by 35%
                updateGoldDisplay(gold);
                updateSkillButton(i, skill1Cost, skill1Level);
                applySkill1Effect();
            }
        };
    }

    function activateGoldMine() {
        goldMineActive = true; // Set gold mine as active
        document.getElementById('gold-mine-button').style.display = 'none'; // Hide the button
        document.getElementById('mine-payout').style.display = 'block'; // Show payout
        document.getElementById('workers-level').style.display = 'block'; // Show workers level
        document.getElementById('hire-workers-button').style.display = 'block'; // Show hire workers button
        document.getElementById('factory-level').style.display = 'block'; // Show factory level
        document.getElementById('factory-button').style.display = 'block'; // Show factory button
        document.getElementById('gold-mine-upgrades').style.display = 'block'; // Show upgrades
        updateMinePayout(goldMinePayout, earningsMultiplier); // Update payout display
        mineTimer = setInterval(() => {
            gold += goldMinePayout * earningsMultiplier;
            updateGoldDisplay(gold);
        }, goldMineInterval);
        startMineTimer(); // Start visual countdown timer
        updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
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

    function applySkill1Effect() {
        // Reduce the cost of all upgrades by 1% per level
        upgradeCost *= 1 - (skill1Level * 0.01);
        autoClickerUpgradeCost *= 1 - (skill1Level * 0.01);
        goldCartUpgradeCost *= 1 - (skill1Level * 0.01);
        goldMineUpgradeCost *= 1 - (skill1Level * 0.01);
        hireWorkersCost *= 1 - (skill1Level * 0.01);
        factoryCost *= 1 - (skill1Level * 0.01);
    }

    function checkAutoClickerAvailability() {
        if (upgradeLevel >= 10) { 
            showAutoClickerButton();
        }
    }
}

