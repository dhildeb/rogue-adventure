// base stats
let hpMax = 10
let defenseMax = 0
let powerMax = 3
let magicMax = 0
let speedMax = 2

let hp = 0
let defense = 0
let power = 0
let magic = 0
let speed = 0

let exp = 0
let lvl = 0
let turn = 0 
let days = 0

// characters
let rogue = {name: "rogue", hpMax: hpMax + 5, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax + 1,hp: hpMax + 5, defense: defenseMax, power: powerMax, magic: magicMax, speed: speedMax + 1, lvl: lvl, exp: exp}
let barbarian = {name: "barbarian", hpMax: hpMax + 15, defenseMax: defenseMax, powerMax: powerMax + 2, magicMax: magicMax, speedMax: speedMax,hp: hpMax + 15, defense: defenseMax, power: powerMax + 2, magic: magicMax, speed: speedMax, lvl: lvl, exp: exp}
let paladin = {name: "paladin", hpMax: hpMax + 10, defenseMax: defenseMax + 1, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, hp: hpMax + 10, defense: defenseMax + 1, power: powerMax, magic: magicMax, speed: speedMax,  lvl: lvl, exp: exp}
let wizard = {name: "wizard", hpMax: hpMax, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax + 3, speedMax: speedMax, hp: hpMax, defense: defenseMax, power: powerMax, magic: magicMax + 3, speed: speedMax, lvl: lvl, exp: exp}

let player = []

// enemies
let enemy = {hpMax
  : hpMax
  , defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, speed: speedMax, lvl: lvl}
  
  //visibility
  function hideStart(){
      document.getElementById("start").classList.add("hidden")
      document.getElementById("game").classList.remove("hidden")
      document.getElementById("events").classList.remove("hidden")
  }

  function hideGame(){
    document.getElementById("events").classList.add("hidden")
    document.getElementById("actions").classList.add("hidden")
      document.getElementById("game").classList.add("hidden")
      document.getElementById("start").classList.remove("hidden")
  }
  
  // actions
  function attack(){
    let attack = player.power
    attack -= enemy.defenseMax

    if(attack < 1){
      attack = 0
    }
    enemy.hpMax -= attack
    player.speed--

    drawPlayer()
    drawEnemy()
    victory()
    turnTracker()
  }
  
  function block(){
    player.defense += player.power
    player.speed--
    turnTracker()
    drawPlayer()
  }
  
  function rest(){
    player.hp = player.hpMax
    drawPlayer()
  }
  
  // games
  function setCharacter(character){
    event.preventDefault()
    player = character
    savePlayer()
    drawPlayer()
    hideStart()
    location.reload()
  }
  
  function savePlayer(){
    window.localStorage.setItem("player", JSON.stringify(player))
    drawPlayer()
  }
  
  function loadPlayer(){
    let load = JSON.parse(window.localStorage.getItem("player"))
    
    if(load){
      console.log("loaded")
      player = load
        drawPlayer()
      hideStart()
    }else{
      console.log("blank load")
      hideGame()
    }
  }
  
  function drawPlayer(){
    let template = `
    <div class="mt-1 mb-1 p-2">
    <h3 class="mt-1 mb-1">
    ${player.name}
    </h3>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    hp: ${player.hp}/${player.hpMax}
    </span>
    </p>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    defense: ${player.defense}
    </span>
    </p>
    </div>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    Power: ${player.power}
    </span>
    </p>
    </div>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    Magic: ${player.magic}/${player.magicMax}
    </span>
    </p>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    Speed: ${player.speed}/${player.speedMax}
    </span>
    </p>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    Level: ${player.lvl}
    </span>
    </p>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    EXP: ${player.exp}
    </span>
    </p>
    </div>
    </div>
    `
      document.getElementById("player").innerHTML = template
  }
  
  function enemyGenerator(){
    let monsters = ["giant rat", "giant bat", "giant spider", "grey ooze", "goblin", "thug", "orc", "shadow", "kobold", "skeleton", "wolf", "zombie", "bandit", "cultist"]
    
    enemy.name = monsters[Math.floor(Math.random()*monsters.length)]
    enemy.hpMax = Math.floor(Math.random()*10)+10
enemy.powerMax = Math.floor(Math.random()*3)+1
enemy.defenseMax = Math.floor(Math.random()*2)
    enemy.lvl = 1
    console.log(enemy)
  }

  function spawnEnemy(){
    document.getElementById("enemy").classList.remove("hidden")
    enemyGenerator()
    drawEnemy()
    document.getElementById("actions").classList.remove("hidden")
    document.getElementById("events").classList.add("hidden")
  }

  function drawEnemy(){
    let template = `
    <section class="container p-2">    
    <div class="card mt-1 mb-1">
    <h3 class="mt-1 mb-1">
    ${enemy.name}
    </h3>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    hp: ${enemy.hpMax }
    </span>
    </p>
    </div>
    <div class="d-flex space-between">
    <p>
    <span>
    Power: ${enemy.powerMax}
    </span>
    </p>
    </div>
    `

      document.getElementById("enemy").innerHTML = template
  }

  // implement and refine following code >>>>
  function turnTracker(){
  
    if(player.speed == 0){
      enemyTurn()
      turn++
      player.defense = player.defenseMax
      player.power = player.powerMax
drawPlayer()
    }
  }
  
  //enemy

  function enemyAttack(){
    let attack = enemy.powerMax
    attack -= player.defenseMax
    attack -= player.defense
    player.defense -= (enemy.powerMax - player.defenseMax)

    if(player.defense < 0){
      player.defense = 0
    }
    if(attack < 1){
      attack = 0
    }

    player.hp -= attack

    drawEnemy()
    drawPlayer()
    window.alert("you take "+attack+" damage")
  }

  //perform random action
  function enemyTurn(){
    enemy.speed = enemy.speedMax
    while(enemy.speed > 0){
      enemyAttack()
      enemy.speed--
  }
if(player.hp <= 0){
  window.alert("you died! that sucks.... try again?")
  localStorage.removeItem("player")
  hideGame()
  location.reload()
}
  player.speed = player.speedMax
  drawPlayer()
  }

  function victory(){
  if (enemy.hpMax <= 0){
player.exp += enemy.lvl
player.speed = player.speedMax
window.alert("YOU WON!")
document.getElementById("enemy").classList.add("hidden")
document.getElementById("events").classList.remove("hidden")
document.getElementById("actions").classList.add("hidden")
enemy.hpMax = hpMax
drawPlayer()
  }

}

loadPlayer()
drawPlayer()
