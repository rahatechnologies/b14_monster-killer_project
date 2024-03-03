const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const PLAYER_HEAL_VALUE = 20;

const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';
const HEAL_MODE = 'HEAL';
let hasBonusLife = true;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(100);


function endRound(monsterDamage) {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  console.log(`==============================================`);
  console.log(`playerDamage: ${playerDamage}`);
  console.log(`monsterDamage: ${monsterDamage}`);
  console.log(`currentMonsterHealth:${currentMonsterHealth}`);
  console.log(`currentPlayerHealth:${currentPlayerHealth}`);
  console.log(`==============================================`);

  if(currentPlayerHealth <= 0 && hasBonusLife){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    console.log("You would be dead but the bonus life saved you!")
    setPlayerHealth(initialPlayerHealth);
    console.log(`currentPlayerHealth:${currentPlayerHealth}`);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log(`You won!`);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log(`You lost!`);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log(`You  have a Draw!`);
  }
}

function attackMonster(mode) {
  let maxDamage;
  console.log(mode);

  if (mode === ATTACK_MODE) {
    maxDamage = PLAYER_ATTACK_VALUE;
  } else if (mode === STRONG_ATTACK_MODE) {
    maxDamage = PLAYER_STRONG_ATTACK_VALUE;
  }
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
 
  endRound(monsterDamage);

}


function attackHandler() {
  attackMonster(ATTACK_MODE);
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_MODE);
}

function healPlayerHandler() {
  console.log(HEAL_MODE);
  let updatedHealValue;
  if (currentPlayerHealth >= chosenMaxLife - PLAYER_HEAL_VALUE) {
     console.log(`WARNING - You can't heal more than your max initial health i.e. ${chosenMaxLife}`);                
     updatedHealValue = chosenMaxLife - currentPlayerHealth;
    
  } else {
    updatedHealValue = PLAYER_HEAL_VALUE;

  }

  // UI / HTML progress bar update
  increasePlayerHealth(updatedHealValue);

  // internal data update
  currentPlayerHealth += updatedHealValue;
  
  //  Attack Player and check winning conditions
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);