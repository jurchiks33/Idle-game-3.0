// upgradeTree.js

// defining upgrade tree structure, add more as needed
const upgrades = 
{
    clickUpgrade: {level: 0, 
                   maxLevel: 100,
                   cost: 10, 
                   multiplier: 1.1,
                   dependencies: []},
    autoClicker: {level: 0,
                  maxLevel: 100,
                  cost: 25,
                  multiplier: 1.2,
                  dependencies: []},
    goldMine: {level: 0,
               maxLevel: 100,
               cost: 5000,
               multiplier: 1.5,
               dependencies: []},
    // add more here as needed
}

// function for specific upgrades
function upgrade(upgradeKey)
{
    const upgrade = upgrades[upgradeKey];
    if (upgrade.level >= upgrade.maxLevel) 
    {
        alert('Maximum level reached!');
        return;
    }
    if (gold >= upgrade.cost)
    {
        gold -= upgrade.cost;
        upgrade.level += 1;
        upgrade.cost = Math.round(upgrade.cost * upgrade.multiplier);
        updateUpgradeDisplay(upgradeKey);
    }
}