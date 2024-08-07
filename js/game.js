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