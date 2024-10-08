// events.js
import {
    activateGoldMine,
    hireWorkers,
    buildFactory,
    upgradeClick,
    upgradeAutoClicker,
    upgradeCarts,
    upgradeMine,
    startAutoClicker,
    applySkill1Effect
} from './game.js';

import {
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

export function initializeEvents() {
    document.getElementById('collect-button').onclick = () => {
        gold += goldPerClick * earningsMultiplier;
        updateGoldDisplay(gold);
    };

    document.getElementById('gold-mine-button').onclick = () => {
        if (!goldMineActive && gold >= goldMineCost) {
            gold -= goldMineCost;
            activateGoldMine();
            updateGoldDisplay(gold);
        }
    };

    document.getElementById('upgrade-click').onclick = () => {
        if (gold >= upgradeCost) {
            upgradeClick();
            updateGoldDisplay(gold);
            updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier);
            checkAutoClickerAvailability();
        }
    };

    document.getElementById('auto-upgrade-click').onclick = () => {
        if (gold >= autoClickerUpgradeCost) {
            upgradeAutoClicker();
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
        startAutoClicker();
    };

    document.getElementById('upgrade-carts-button').onclick = () => {
        if (gold >= goldCartUpgradeCost) {
            upgradeCarts();
            updateGoldDisplay(gold);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
        }
    };

    document.getElementById('upgrade-mine-button').onclick = () => {
        if (gold >= goldMineUpgradeCost) {
            upgradeMine();
            updateGoldDisplay(gold);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
            updateMinePayout(goldMinePayout, earningsMultiplier);
        }
    };

    document.getElementById('hire-workers-button').onclick = () => {
        if (gold >= hireWorkersCost) {
            hireWorkers();
            updateGoldDisplay(gold);
            updateWorkersButton(hireWorkersCost, workersLevel);
            updateGoldMineUI(goldMineCost, goldMineLevel, goldCartLevel, goldCartUpgradeCost, goldMineUpgradeCost, workersLevel, hireWorkersCost);
            updateMinePayout(goldMinePayout, earningsMultiplier);
            updateUpgradeButton(upgradeCost, upgradeLevel, goldPerClick, earningsMultiplier);
        }
    };

    document.getElementById('factory-button').onclick = () => {
        if (gold >= factoryCost) {
            buildFactory();
            updateGoldDisplay(gold);
            updateFactoryButton(factoryCost, factoryLevel);
            showGameContainer2();
            updateGameContainer2(factoryLevel);
        }
    };

    for (let i = 1; i <= 20; i++) {
        document.getElementById(`skill${i}-button`).onclick = () => {
            upgradeSkill(i - 1);
        };
    }
}
