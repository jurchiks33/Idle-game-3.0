export function initializeUI() {
    updateGoldDisplay(0);
    updateUpgradeButton(10, 1, 1000000000, 1);
    updateAutoClickerButton(25, 1);
    updateGoldMineUI(5000, 1, 1, 500, 1000, 0, 25000);
    updateMinePayout(10000000, 1);
    updateWorkersButton(25000, 0);
    updateFactoryButton(75000, 0);

    const cubesContainer = document.getElementById('cubes-container');
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

