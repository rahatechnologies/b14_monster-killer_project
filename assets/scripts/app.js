const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const PLAYER_HEAL_VALUE = 20;

const PLAYER_ATTACK_MODE = 'PLAYER_ATTACK';
const PLAYER_STRONG_ATTACK_MODE = 'PLAYER_STRONG_ATTACK';
const MONSTER_ATTACK_MODE = 'MONSTER_ATTACK';
const PLAYER_HEAL_MODE = 'PLAYER_HEAL';
const GAME_OVER = 'GAME_OVER'

let hasBonusLife = true;


let battleLog = [];


function writeToLog(event, value, currentMonsterHealth, currentPlayerHealth){
  let logEntry = {
    event,
    value,
    currentMonsterHealth,
    currentPlayerHealth
  };

  if (event === PLAYER_ATTACK_MODE) {
    logEntry.target = 'MONSTER';
  } else if (event === PLAYER_STRONG_ATTACK_MODE) {
    logEntry.target = 'MONSTER';
  } else if (event === MONSTER_ATTACK_MODE) {
    logEntry.target = 'PLAYER';
  } else if (event === PLAYER_HEAL_MODE) {
    logEntry.target = 'PLAYER';
  } 
  // else if (ev === GAME_OVER) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     finalMonsterHealth: currentMonsterHealth,
  //     finalPlayerHealth: currentPlayerHealth
  //   };
    
  // } 
  battleLog.push(logEntry); 
}

function printLogHandler(){
  console.log(battleLog);
}

const enteredValue = prompt(`Maximum life for you and the Monster!`,'100');
// alert(`maximum value : 100`);

let chosenMaxLife = enteredValue!==null ? parseInt(enteredValue.trim()): 100;
console.log(`Current choose nmax life : ${chosenMaxLife}`);


if(isNaN(chosenMaxLife) || chosenMaxLife <= 0){
 chosenMaxLife =100;
 console.log(`Warning - You have entered wrong data. Hence using deafult value for max life i.e. 100`);
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


function reset() {
console.log(`Game reset completed!`);
  // internal data update
currentMonsterHealth = chosenMaxLife;
currentPlayerHealth = chosenMaxLife

// ui update
resetGame(chosenMaxLife);
}


function endRound(monsterDamage) {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

writeToLog (
  MONSTER_ATTACK_MODE,
  playerDamage,
  currentMonsterHealth,
  currentPlayerHealth
)

  // console.log(`==============================================`);
  // console.log(`playerDamage: ${playerDamage}`);
  // console.log(`monsterDamage: ${monsterDamage}`);
  // console.log(`currentMonsterHealth:${currentMonsterHealth}`);
  // console.log(`currentPlayerHealth:${currentPlayerHealth}`);
  // console.log(`==============================================`);

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
    writeToLog(
      GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log(`You lost!`);   
    writeToLog(
      GAME_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log(`You  have a Draw!`);
    writeToLog(
      GAME_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

 if (
    currentMonsterHealth <= 0  ||currentPlayerHealth <= 0 ) {
    reset();
  }
}

function attackMonster(mode) {
let maxDamage;
let logEvent;
  //  ternary operator example
  // let maxDamage =
  //   (mode === PLAYER_ATTACK_MODE )? PLAYER_ATTACK_VALUE : PLAYER_STRONG_ATTACK_VALUE;

// let maxDamage =
//   mode === ATTACK_MODE
//     ? 5 === 5
//       ? 'nested value'
//       : 'nested alternative value'
//     : `outer if alternative Value`;


  // console.log(mode);



  if (mode === PLAYER_ATTACK_MODE) {
    maxDamage = PLAYER_ATTACK_VALUE;
    logEvent = PLAYER_ATTACK_MODE;
  } else if (mode === PLAYER_STRONG_ATTACK_MODE) {
    maxDamage = PLAYER_STRONG_ATTACK_VALUE;
    logEvent = PLAYER_STRONG_ATTACK_MODE;

  }
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
 
  writeToLog(
    logEvent,
    monsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );


  endRound(monsterDamage);

}


function attackHandler() {
  attackMonster(PLAYER_ATTACK_MODE);
}

function strongAttackHandler() {
  attackMonster(PLAYER_STRONG_ATTACK_MODE);
}

function healPlayerHandler() {
  console.log(PLAYER_HEAL_MODE);
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
  
writeToLog(PLAYER_HEAL_MODE, PLAYER_HEAL_VALUE, currentMonsterHealth, currentPlayerHealth);


  //  Attack Player and check winning conditions
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);