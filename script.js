// script.js
document.addEventListener("DOMContentLoaded", () => {
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

    // Generate 20 cubes dynamically
    const cubesContainer = document.getElementById('cubes-container');
    if (cubesContainer) {
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

    // Initialize the UI
    document.getElementById('gold-mine-button').innerText = `Open Gold Mine (${goldMineCost} Gold)`; // Initial state text
    document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`; // Initial state text
    document.getElementById('factory-button').innerText = `Build Factory (${factoryCost} Gold)`; // Initial state text

    // Event Listeners
    document.getElementById('collect-button').onclick = () => {
        gold += goldPerClick * earningsMultiplier;
        updateGoldDisplay();
    }

    document.getElementById('gold-mine-button').onclick = () => {
        if (!goldMineActive && gold >= goldMineCost) {
            gold -= goldMineCost;
            activateGoldMine();
        }
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
                    gold += goldPerClick * earningsMultiplier;
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
                gold += goldPerClick * earningsMultiplier;
                updateGoldDisplay();
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
            updateGoldDisplay();
            updateGoldMineUI();
        }
    };

    document.getElementById('upgrade-mine-button').onclick = () => {
        if (gold >= goldMineUpgradeCost) {
            gold -= goldMineUpgradeCost;
            goldMineLevel += 1;
            goldMinePayout = Math.round(goldMinePayout * 1.0075); // Increase payout by 0.75%
            goldMineUpgradeCost = Math.round(goldMineUpgradeCost * 1.5); // Increase cost by 50%
            updateGoldDisplay();
            updateGoldMineUI();
            updateMinePayout(); // Update payout amount immediately
        }
    };

    document.getElementById('hire-workers-button').onclick = () => {
        if (gold >= hireWorkersCost) {
            gold -= hireWorkersCost;
            workersLevel += 1;
            earningsMultiplier = 1 + (workersLevel * 0.1); // Increase earnings by 10% per worker level
            hireWorkersCost = Math.round(hireWorkersCost * 2.3); // Increase cost by 2.3 times
            updateGoldDisplay();
            updateWorkersButton();
            updateGoldMineUI(); // Update mine UI to reflect new earnings
            updateMinePayout(); // Update payout amount immediately
            updateUpgradeButton(); // Update click upgrade button to reflect new earnings
        }
    };

    document.getElementById('factory-button').onclick = () => {
        if (gold >= factoryCost) {
            gold -= factoryCost;
            factoryLevel += 1;
            factoryCost = Math.round(factoryCost * 1.35); // Increase cost by 35%
            updateGoldDisplay();
            updateFactoryButton();
            updateGameContainer2();
        }
    };

    for (let i = 1; i <= 20; i++) {
        const skillButton = document.getElementById(`skill${i}-button`);
        if (skillButton) {
            skillButton.onclick = () => {
                if (gold >= skill1Cost) {
                    gold -= skill1Cost;
                    skill1Level += 1;
                    skill1Cost = Math.round(skill1Cost * 1.35); // Increase cost by 35%
                    updateGoldDisplay();
                    updateSkillButton(i); // Update the specific skill button
                    applySkillEffect(i); // Apply the effect of the specific skill
                }
            };
        }
    }

    // Functions
    function activateGoldMine() {
        goldMineActive = true; // Set gold mine as active
        document.getElementById('gold-mine-button').style.display = 'none'; // Hide the button
        document.getElementById('mine-payout').style.display = 'block'; // Show payout
        document.getElementById('workers-level').style.display = 'block'; // Show workers level
        document.getElementById('hire-workers-button').style.display = 'block'; // Show hire workers button
        document.getElementById('factory-level').style.display = 'block'; // Show factory level
        document.getElementById('factory-button').style.display = 'block'; // Show factory button
        document.getElementById('gold-mine-upgrades').style.display = 'block'; // Show upgrades
        updateMinePayout(); // Update payout display
        mineTimer = setInterval(() => {
            gold += goldMinePayout * earningsMultiplier;
            updateGoldDisplay();
        }, goldMineInterval);
        startMineTimer(); // Start visual countdown timer
        updateGoldMineUI();
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

    function updateGoldDisplay() {
        document.getElementById('gold-amount').innerText = `Gold: ${gold.toFixed(2)}`;
    }

    function updateUpgradeButton() {
        document.getElementById('upgrade-click').innerText = `Upgrade Click (${upgradeCost} Gold) - Current: ${Math.round(goldPerClick * earningsMultiplier)} per click`;
        document.getElementById('upgrade-level').innerText = `Level: ${upgradeLevel}`; 
    }

    function updateAutoClickerButton() {
        document.getElementById('auto-upgrade-click').innerText = `Upgrade Auto-Clicker (${autoClickerUpgradeCost} Gold)`;
        document.getElementById('auto-upgrade-level').innerText = `Auto-Clicker Level: ${autoClickerLevel}`;
    }

    function updateGoldMineUI() {
        document.getElementById('mine-level').innerText = `Mine Level: ${goldMineLevel}`;
        document.getElementById('cart-level').innerText = `Cart Level: ${goldCartLevel}`;
        document.getElementById('upgrade-carts-button').innerText = `Upgrade Gold Carts (Cost: ${goldCartUpgradeCost} Gold)`;
        document.getElementById('upgrade-mine-button').innerText = `Upgrade Gold Mine (Cost: ${goldMineUpgradeCost} Gold)`;
        document.getElementById('workers-level').innerText = `Workers Level: ${workersLevel}`; // Update workers level
        document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`; // Update hire workers cost
    }

    function updateMinePayout() {
        document.getElementById('mine-payout').innerText = `Payout: ${Math.round(goldMinePayout * earningsMultiplier)} Gold`;
    }

    function updateWorkersButton() {
        document.getElementById('hire-workers-button').innerText = `Hire Workers (${hireWorkersCost} Gold)`;
    }

    function updateFactoryButton() {
        document.getElementById('factory-level').innerText = `Factory Level: ${factoryLevel}`;
        document.getElementById('factory-button').innerText = `Build Factory (${factoryCost} Gold)`;
    }

    function updateGameContainer2() {
        const container2 = document.getElementById('game-container-2');
        container2.style.display = 'block'; // Show the second game container

        // Calculate the number of cubes to unlock
        const cubesToUnlock = factoryLevel * 2;
        for (let i = 1; i <= 20; i++) {
            const cube = document.getElementById(`cube-${i}`);
            if (i <= cubesToUnlock) {
                cube.style.display = 'block';
            } else {
                cube.style.display = 'none';
            }
        }
    }

    function updateSkillButton(skillIndex) {
        document.getElementById(`skill${skillIndex}-button`).innerText = `Skill ${skillIndex} (Cost: ${skill1Cost} Gold)`;
        document.getElementById(`skill${skillIndex}-level`).innerText = `Skill ${skillIndex} Level: ${skill1Level}`;
    }

    function applySkillEffect(skillIndex) {
        // Implement the specific effect of the skill based on the skillIndex
        if (skillIndex === 1) {
            // Example: Reduce the cost of all upgrades by 1% per level
            upgradeCost *= 1 - (skill1Level * 0.01);
            autoClickerUpgradeCost *= 1 - (skill1Level * 0.01);
            goldCartUpgradeCost *= 1 - (skill1Level * 0.01);
            goldMineUpgradeCost *= 1 - (skill1Level * 0.01);
            hireWorkersCost *= 1 - (skill1Level * 0.01);
            factoryCost *= 1 - (skill1Level * 0.01);
        } else if (skillIndex === 2) {
            // Example: Increase all income by 15% per level
            earningsMultiplier *= 1 + (skill2Level * 0.15);
        }
        // Add more skill effects as needed
    }

    function checkAutoClickerAvailability() {
        if (upgradeLevel >= 10) { 
            document.getElementById('auto-click-button').style.display = 'block';
        }
    }

    // Initial UI update
    updateUpgradeButton();
    updateAutoClickerButton();
    updateGoldMineUI();
    updateMinePayout();
    updateWorkersButton();
    updateFactoryButton();
    updateSkillButton(1);
    updateSkillButton(2);
});
