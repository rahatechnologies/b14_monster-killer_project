const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(100);

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

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  console.log(`==============================================`);
  console.log(`currentMonsterHealth:${currentMonsterHealth}`);
  console.log(`currentPlayerHealth:${currentPlayerHealth}`);
  console.log(`==============================================`);

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log(`You won!`);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log(`You lost!`);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log(`You  have a Draw!`);
  }
}

function attackHandler() {
  attackMonster(ATTACK_MODE);
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_MODE);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
