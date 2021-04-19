//variables

// base stats
let hpMax = 10
let defenseMax = 0
let powerMax = 3
let magicMax = 0
let speedMax = 2
// adjustable stats
let hp = 0
let block = 0
let power = 0
let magic = 0
let speed = 0
let exp = 0
let lvl = 0
let equipment = []

//abilities
let evade = 0

//general
let turn = 0 
let days = 0
let expMax = 5


// characters
let rogue = {name: "rogue", hpMax: hpMax + 5, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax + 1,hp: hpMax + 5, block: block, power: powerMax, magic: magicMax, speed: speedMax + 1, lvl: lvl, exp: exp, expMax: expMax, evade: evade}
let barbarian = {name: "barbarian", hpMax: hpMax + 15, defenseMax: defenseMax, powerMax: powerMax + 2, magicMax: magicMax, speedMax: speedMax,hp: hpMax + 15, block: block, power: powerMax + 2, magic: magicMax, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax}
let paladin = {name: "paladin", hpMax: hpMax + 10, defenseMax: defenseMax + 1, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, hp: hpMax + 10, block: block, power: powerMax, magic: magicMax, speed: speedMax,  lvl: lvl, exp: exp, expMax: expMax}
let wizard = {name: "wizard", hpMax: hpMax, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax + 3, speedMax: speedMax, hp: hpMax, block: block, power: powerMax, magic: magicMax + 3, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax}

let player = []

// enemies
let enemy = {hpMax
  : hpMax
  , defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, speed: speedMax, lvl: lvl}
  
  // loot
  let dagger = "dagger"
  let buckler = "buckler"
  let magicBoots = "magic boots"
  let paddedArmor = "padded armor"
  let healingPot = "healing potion"
  let gem = "gem"
  let copper = Math.floor(Math.random()*25)
  let silver = Math.floor(Math.random()*10)
  let gold = Math.floor(Math.random()*5)
  let platinum = 1
  
  let loot = [dagger, buckler, magicBoots, paddedArmor, healingPot, gem]
  let coinPouch = [copper, silver, gold, platinum]

  //game data
  function setCharacter(character){
    
    player = character

    savePlayer()
    drawPlayer()
    hideStart()
  }

  function resetCharacter(){

    if(confirm("are you sure you want to commit suicide?")){
      if(confirm("are you really ready to just give up?")){
        window.alert("you impaled youself. as you stare up at the sky as you quickly bleed out your last thought is: why?")
    localStorage.removeItem("player")
    localStorage.removeItem("items")
    localStorage.removeItem("coinPouch")
    hideGame()
    location.reload()
      }else {
        window.alert("woah what were you even thinking! of course you want to live!")
      }
  }else{
window.alert("yeah that would be pretty stupid.")
  }
  }

  function drawPlayerImage(){
    if(player.name == "rogue"){
      document.getElementById("rogue").classList.remove("hidden")
    }
    else if(player.name == "barbarian"){
      document.getElementById("barbarian").classList.remove("hidden")
    }
    else if(player.name == "paladin"){
      document.getElementById("paladin").classList.remove("hidden")
    }
    else if(player.name == "wizard"){
      document.getElementById("wizard").classList.remove("hidden")
    }
  }

  function savePlayer(){
    window.localStorage.setItem("player", JSON.stringify(player))
    window.localStorage.setItem("items", JSON.stringify(equipment))
    window.localStorage.setItem("coinPouch", JSON.stringify(coinPouch))
    drawPlayer()
  }
  
  function loadPlayer(){
    let load = JSON.parse(window.localStorage.getItem("player"))
    
    if(load){
      console.log("loaded")
      player = load
      equipment = JSON.parse(window.localStorage.getItem("items"))
     coinPouch = JSON.parse(window.localStorage.getItem("coinPouch"))
        drawPlayer()
      hideStart()
    }else{
      console.log("blank load")
      hideGame()
    }
  }
  
  
  
  //buffs
  function buffPower(){
    player.powerMax++
    drawPlayer()
  }
  function buffDefense(){
    player.defenseMax++
    drawPlayer()
  }
  function buffSpeed(){
    player.speedMax++
    drawPlayer()
  }
  function buffHp(){
    player.hp += 5
    drawPlayer()
  }
  
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
  function leave(){
    document.getElementById("shop").classList.add("hidden")
    document.getElementById("events").classList.remove("hidden")
    document.getElementById("pouch").classList.add("hidden")
    document.getElementById("cancel").classList.remove("hidden")
  }
  function openPouch(){
    document.getElementById("actions").classList.add("hidden")
    document.getElementById("enemy").classList.add("hidden")
    document.getElementById("pouch").classList.remove("hidden")
  }
  function exitPouch(){
    document.getElementById("actions").classList.remove("hidden")
    document.getElementById("enemy").classList.remove("hidden")
    document.getElementById("pouch").classList.add("hidden")
  }
  function tempAlert(msg,duration,area){

 let el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:"+area+"%;left:20%;background-color:white;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}
  
  //events
  function rest(){
    player.hp = player.hpMax
    savePlayer()
  }
  
  function shop(){
    drawItems()
  document.getElementById("shop").classList.remove("hidden")
  document.getElementById("pouch").classList.remove("hidden")
  document.getElementById("cancel").classList.add("hidden")    
  document.getElementById("events").classList.add("hidden")
}

  function deleteItem(index){
    let getItemName = JSON.parse(window.localStorage.getItem('items'));
    
    equipment.splice(index,1)
    getItemName.splice(index,1);
}

function sell(event){
  event.preventDefault()
  let form = event.target
  let item = form.name.value
  let found = equipment.find(item => item);
  let index = equipment.indexOf(item)

  if(found == item){

    deleteItem(index)
 
    coinPouch[2] += 50
    tempAlert("you sold "+item+" for 50 gp",1000)
    savePlayer()
    loadPlayer()
    drawItems()
    document.getElementById("cancel").classList.add("hidden") 
    document.getElementById("events").classList.add("hidden")  
  }else{
    window.alert("i dont want yer '"+item+"'. take it and scram!")
  }
  form.reset()
}
function buy(){
  if(coinPouch[2] > 49){
    coinPouch[2] -= 50
    equipment.push("healing potion")
    tempAlert("heres yer potion",1500,50)
  }else if(coinPouch[1] > 499){
    coinPouch[1] -= 500
    equipment.push("healing potion")
    tempAlert("heres yer potion",1500,50)
  }else if(coinPouch[3] > 4){
    coinPouch[3] -= 5
    equipment.push("healing potion")
    tempAlert("heres yer potion",1500,50)
  }else if(coinPouch[0] > 4999){
    coinPouch[0] -= 5000
    equipment.push("healing potion")
    tempAlert("heres yer potion",1500,50)
  }
  else{
    window.alert("this aint no charity!")
  }
  savePlayer()
  loadPlayer()
  drawItems()
  document.getElementById("events").classList.add("hidden") 
  document.getElementById("cancel").classList.add("hidden") 
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
  
  function blocking(){
    player.block += player.power
    player.speed--
    turnTracker()
    drawPlayer()
  }

// games

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
  HP: ${player.hp}/${player.hpMax}
  </span>
  </p>
  </div>
  <div class="d-flex space-between">
  <p>
  <span>
  Defense: ${player.defenseMax}
  </span>
  </p>
  </div>
  <div class="d-flex space-between">
  <p>
  <span>
  Block: ${player.block}
  </span>
  </p>
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
  EXP: ${player.exp}/${player.expMax}(next lvl)
  </span>
  </p>
  </div>
  </div>
  `
  if(player.name == "rogue"){
    template += `<div class="d-flex space-between">
    <p>
    <span>
    Evade: ${Math.floor(player.evade * 100)} %
    </span>
    </p>
    </div>`
  }

  template += `
  <div class="d-flex space-between">
  <p>
  <button type="button" onclick="resetCharacter()">reset
  </button>
  </p>
  </div>
  `
  document.getElementById("player").innerHTML = template

  drawPlayerImage()
}

function drawItems(){
  openPouch()
  
  let template = `
  <div id="cancel" class="m-1 d-flex justify-content-center">
  <button type="button" onclick="exitPouch()">cancel</button>
  </div>
  <p>
  coin pouch:
  <p>
  cp : ${coinPouch[0]}, sp : ${coinPouch[1]}, gp : ${coinPouch[2]}, pp : ${coinPouch[3]}
  </p>
  </p>
  <p>
  Equipment:
  </p>
  `
  
  equipment.forEach(item => {
    template +=
    `
    <div class="m-1">
    ${item}
    </div>
    `
  });
  document.getElementById("pouch").innerHTML = template

}

function enemyGenerator(){
  let monsters = ["giant rat", "giant bat", "giant spider", "grey ooze", "goblin", "thug", "orc", "shadow", "kobold", "skeleton", "wolf", "zombie", "bandit", "cultist"]
  let monsters2 = ["animated armor", "bandit captian", "berserker", "dragon wyrmling", "death dog", "dire wolf", "dread warrior", "fire snake", "ghast", "ghoul", "giant boar", "giant toad", "drake", "grick", "maw demon", "mimic", "minotaur skeleton", "nothic", "ochre jelly", "ogre", "pegasus", "sea hag", "will-o'-wisp"]
  let chance = Math.floor(Math.random()*player.lvl)
  
  if(chance == 0){
    enemy.name = monsters[Math.floor(Math.random()*monsters.length)]
    enemy.hpMax = Math.floor(Math.random()*10)+10
    enemy.powerMax = Math.floor(Math.random()*3)+1
    enemy.defenseMax = Math.floor(Math.random()*2)
    enemy.lvl = 1
    console.log(enemy+" lvl 1")
  } else if(chance >= 1){
    enemy.name = monsters2[Math.floor(Math.random()*monsters2.length)]
    enemy.hpMax = Math.floor(Math.random()*20)+20
    enemy.powerMax = Math.floor(Math.random()*4)+2
    enemy.defenseMax = Math.floor(Math.random()*2)+1
    enemy.lvl = 2
    console.log(enemy+" lvl 2")
  }
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
  Level: ${enemy.lvl}
  </span>
  </p>
  </div>
  <div class="d-flex space-between">
  <p>
  <span>
  hp: ${enemy.hpMax}
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

function turnTracker(){
  
  if(player.speed == 0){
    enemyTurn()
    turn++
    player.power = player.powerMax
    drawPlayer()
  }
}

function enemyAttack(){
  let attack = enemy.powerMax
  let dmgReducer = player.block

 //dodge chance
  if(player.evade){
    let hit = Math.floor(Math.random()*100)
    let dodge = Math.floor(player.evade*100)
    if(dodge > hit){
      attack = 0
      tempAlert("Dodged!",1000,15)
    }
  }

// defense vs attack
player.block -= attack
attack -= dmgReducer
attack -= player.defenseMax
  
  //no negatives
  if(attack < 0){
    attack = 0
  }

  //actual attack
  player.hp -= attack
  
  // reset defense to max if lower
    if(player.block < 0){
      player.block = 0
    }
  
  drawEnemy()
  drawPlayer()

}

function enemyTurn(){
let preHp = player.hp
let postHp = 0
let totalDmg = 0

  enemy.speed = enemy.speedMax

  while(enemy.speed > 0){
    enemyAttack()
    enemy.speed--
  }
  postHp = player.hp
  totalDmg = preHp - postHp
  tempAlert("you were attacked! you take "+totalDmg+" damage",1500,20)

player.block = 0

  if(player.hp <= 0){
    window.alert("you died! that sucks.... try again?")
    localStorage.removeItem("player")
    localStorage.removeItem("items")
    localStorage.removeItem("coinPouch")
    hideGame()
    location.reload()
  }
  player.speed = player.speedMax
  drawPlayer()
}

function victory(){
  if (enemy.hpMax <= 0){
    player.exp += enemy.lvl
    lvlUp()
    player.speed = player.speedMax
    window.alert("YOU WON!")
    document.getElementById("enemy").classList.add("hidden")
    document.getElementById("events").classList.remove("hidden")
    document.getElementById("actions").classList.add("hidden")
    enemy.hpMax = hpMax
    looting()
    savePlayer()
  }
  
}

function lvlUp(){
  
  if((player.name == "rogue" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.evade = .1
    player.hpMax += 3
    player.hp += 3
    player.expMax *= 2
    window.alert("you leveled up!")
  }else if((player.name == "rogue" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.evade *= 1.3
    player.hpMax += (3 * player.lvl)
    player.hp += (3 * player.lvl)
    player.expMax *= 2
    window.alert("you leveled up!")
  }
  if((player.name == "barbarian" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.powerMax++
    player.hpMax += 5
    player.hp += 5
    player.expMax *= 2
    window.alert("you leveled up!")
  }else if((player.name == "barbarian" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.powerMax++
    player.hpMax += (5 * player.lvl)
    player.hp += (5 * player.lvl)
    player.expMax *= 2
    window.alert("you leveled up!")
  }
  if((player.name == "paladin" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.defenseMax++
    player.hpMax += 4
    player.hp += 4
    player.expMax *= 2
    window.alert("you leveled up!")
  }else if((player.name == "paladin" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.defenseMax++
    player.hpMax += (4 * player.lvl)
    player.hp += (4 * player.lvl)
    player.expMax *= 2
    window.alert("you leveled up!")
  }  
  if((player.name == "wizard" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.magicMax += 1
    player.hpMax += 2
    player.hp += 2
    player.expMax *= 2
    window.alert("you leveled up!")
  }else if((player.name == "wizard" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.magicMax += 1
    player.hpMax += (2 * player.lvl)
    player.hp += (2 * player.lvl)
    player.expMax *= 2
    window.alert("you leveled up!")
  }
  
  
  drawPlayer()
}

function looting(){
  let item = loot[Math.floor(Math.random()*loot.length)]
  let chance = Math.floor(Math.random()*100)
  let chance2 = Math.floor(Math.random()*100)
  
  if(chance > 80){
    equipment.push(item)
    window.alert("you got a "+item)
    
  }else if(chance > 25){
    
    if(chance2 > 50){ coinPouch[0] += copper
      window.alert("you got copper: "+copper)
    }else if(chance2 > 75){ coinPouch[1] += silver
      window.alert("you got silver: "+silver)
    }else if(chance2 > 87){ coinPouch[2] += gold
      window.alert("you got gold: "+gold)
    }else{ coinPouch[3] += platinum
      window.alert("you got platinum: "+platinum)}
      
    }
  }


loadPlayer()
drawPlayer()
