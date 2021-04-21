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
let attuned = []
let tempStats = {defense: 0, power: 0, magic: 0, speed: 0, hp: 0}

//abilities
let evade = 0

//general
let turn = 0 
let days = 0
let expMax = 5
let equip = false

// loot
let dagger = "dagger"
let buckler = "buckler"
let magicBoots = "boots of speed"
let paddedArmor = "padded armor"
let healingPot = "healing potion"
let gem = "gem"
let loot = [dagger, buckler, magicBoots, paddedArmor, healingPot, gem]
let gold = Math.floor(Math.random()*24)+1

/* additional money values
let copper = Math.floor(Math.random()*99)+1
let silver = Math.floor(Math.random()*24)+1
let platinum = 1
let coinPouch = [copper, silver, gold, platinum]
*/

// characters
let rogue = {name: "rogue", hpMax: hpMax + 5, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax + 1,hp: hpMax + 5, block: block, power: powerMax, magic: magicMax, speed: speedMax + 1, lvl: lvl, exp: exp, expMax: expMax, evade: evade, gold: gold}
let barbarian = {name: "barbarian", hpMax: hpMax + 15, defenseMax: defenseMax, powerMax: powerMax + 2, magicMax: magicMax, speedMax: speedMax,hp: hpMax + 15, block: block, power: powerMax + 2, magic: magicMax, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax, gold: gold}
let paladin = {name: "paladin", hpMax: hpMax + 10, defenseMax: defenseMax + 1, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, hp: hpMax + 10, block: block, power: powerMax, magic: magicMax, speed: speedMax,  lvl: lvl, exp: exp, expMax: expMax, gold: gold}
let wizard = {name: "wizard", hpMax: hpMax, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax + 3, speedMax: speedMax, hp: hpMax, block: block, power: powerMax, magic: magicMax + 3, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax, gold: gold}

let player = []

// enemies
let enemy = {hpMax: hpMax, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, speed: speedMax, lvl: lvl, resistance: 0}
  

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
      document.getElementById("spells").classList.remove("hidden")
    }
  }

  function savePlayer(){
    window.localStorage.setItem("player", JSON.stringify(player))
    window.localStorage.setItem("items", JSON.stringify(equipment))
    drawPlayer()
  }
  
  function loadPlayer(){
    let load = JSON.parse(window.localStorage.getItem("player"))
    
    if(load){
      console.log("loaded")
      player = load
      equipment = JSON.parse(window.localStorage.getItem("items"))
        drawPlayer()
      hideStart()
    }else{
      console.log("blank load")
      hideGame()
    }
  }
  
  
  
  //buffs
  //fix... add to local storage, if its there add buff.. figure out color effect
  function toggle(item){
    equip = !equip
    
    if(item == "buckler" && equip == true){
      attuned.push("buckler")
      //document.getElementById("shield").classList.add("equiped")
      drawPlayer()
}
else if(item == "buckler" && equip == false){
unAttune("buckler")
  drawPlayer()
}

if(item == "dagger" && equip == true){
  tempStats.power++
  document.getElementById("weapon").classList.add("equipped")
  drawPlayer()
  }
  else if(item == "dagger" && equip == false){
   tempStats.power--
    document.getElementById("weapon").classList.remove("equipped")
    drawPlayer()
  }

}

  function healingPotion(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "healing potion"){

    player.hp = player.hpMax
    player.speed--

    deleteItem(index)
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    
    
    tempAlert("Healed",1000,15,10)
  }
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
    
    if(equip = true && document.getElementById("shield")){
      document.getElementById("shield").classList.add("equipped")
    } else if(equip = false && document.getElementById("shield")){
      document.getElementById("shield").classList.remove("equipped")
    }
  }
  function exitPouch(){
    document.getElementById("actions").classList.remove("hidden")
    document.getElementById("enemy").classList.remove("hidden")
    document.getElementById("pouch").classList.add("hidden")
  }
  function tempAlert(msg,duration,top,left){

 let el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:"+top+"%;left:"+left+"%;color:rgb(177, 0, 0);");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}
  
  //events
  function rest(){
    player.hp = player.hpMax
    player.magic = player.magicMax
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

function unAttune(index){
  let getAttunedName = JSON.parse(winow.localStorage.getItem("attune"));

  attuned.splice(index,1)
getAttunedName.splice(index,1);
}

function sell(event){
  event.preventDefault()
  let form = event.target
  let item = form.name.value
  let index = equipment.indexOf(item)

  if(index >= 0){

    deleteItem(index)
 
    player.gold += 50
    tempAlert("you sold "+item+" for 50 gp",1000,5,65)
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

  if(player.gold > 49){
    player.gold -= 50
    equipment.push("healing potion")
    tempAlert("heres yer potion",1500,5,70)
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
    let attack = player.powerMax
    attack -= enemy.defenseMax

    if(attack < 1){
      attack = 0
    }

    tempAlert("hit! "+attack+" DMG",1000,68,68)
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

  function drawSpells(){
    let template =
    `
    <div class="m-1 spells">
    <button onclick="fireBolt()">firebolt</button>
    </div>
    <div class="m-1">
    <button onclick="iceBlast()">iceblast</button>
    </div>
    `
    document.getElementById("spells").innerHTML = template
  }

  function fireBolt(){
    let attack = Math.floor(Math.random()*14)+1+(5*player.lvl)
    if(player.magic > 0){
    attack -= enemy.resistance
    
    if(attack < 1){
      attack = 0
    }

    tempAlert("hit! "+attack+" DMG",1000,68,68)
    enemy.hpMax -= attack
    player.speed--
    player.magic--
  }
  else{
    tempAlert("not enough magic",1000,70,12)
  }
    drawPlayer()
    drawEnemy()
    victory()
    turnTracker()
  }
  function iceBlast(){
    let attack = Math.floor(Math.random()*4)+1+(3*player.lvl)
    console.log("enemy speed:"+enemy.speed)
    if(player.magic > 0){
    attack -= enemy.resistance
    enemy.speed--
    
    if(attack < 1){
      attack = 0
    }

    tempAlert("hit! "+attack+" DMG",1000,68,68)
    enemy.hpMax -= attack
    player.speed--
    player.magic--
  }
  else{
    tempAlert("not enough magic",1000,70,12)
  }
    drawPlayer()
    drawEnemy()
    victory()
    turnTracker()
    console.log("enemy speed:"+enemy.speed)
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
  Power: ${player.powerMax}
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
  gold : ${player.gold}
  </p>
  </p>
  <p>
  Equipment:
  </p>
  `
  
  equipment.forEach(item => {
    if(item == "healing potion"){
    template +=
    `
    <div class="m-1">
    <button onclick="healingPotion('${item}')">${item}</button>
    </div>
    `
    }
    else if(item == "buckler"){
      template +=
      `
      <div class="m-1">
      <button id="shield" class="" onclick="toggle('${item}')">${item}</button>
      </div>
      `
    }
    else if(item == "dagger"){
      template +=
      `
      <div class="m-1">
      <button id="weapon" class="" onclick="toggle('${item}')">${item}</button>
      </div>
      `
    }
    else{
      template +=
      `
      <div class="m-1">
      <button id="misc" class="" onclick="toggle('${item}')">${item}</button>
      </div>
      `
    }



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
    enemy.resistance = Math.floor(Math.random()*2)
    enemy.lvl = 1
    console.log(enemy+" lvl 1")
  } else if(chance >= 1){
    enemy.name = monsters2[Math.floor(Math.random()*monsters2.length)]
    enemy.hpMax = Math.floor(Math.random()*20)+20
    enemy.powerMax = Math.floor(Math.random()*4)+2
    enemy.defenseMax = Math.floor(Math.random()*2)+1
    enemy.resistance = Math.floor(Math.random()*2)+1
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
  enemy.speed = enemy.speedMax
}

function drawEnemy(){
  let template = `
  <section class="container p-2">    
  <h3 class="mt-1 mb-1">
  ${enemy.name}
  </h3>
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
  
  if(player.speed < 1){
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
      tempAlert("Dodged!",1000,15,20)
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


while(enemy.speed > 0){
  enemyAttack()
  enemy.speed--
}
postHp = player.hp
totalDmg = preHp - postHp
tempAlert("you were attacked! you take "+totalDmg+" damage",1500,10,15)

player.block = 0

if(player.hp <= 0){
  window.alert("you died! that sucks.... try again?")
  localStorage.removeItem("player")
  localStorage.removeItem("items")
  hideGame()
  location.reload()
}
enemy.speed = enemy.speedMax
player.speed = player.speedMax
drawPlayer()
}

function victory(){
  if (enemy.hpMax <= 0){
    player.exp += enemy.lvl
    lvlUp()
    player.speed = player.speedMax
    tempAlert("Victory!",2500,5,50)
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
  }else if((player.name == "rogue" && player.exp >= player.expMax && player.lvl >= 0)){
    player.lvl++
    player.evade *= 1.3
    player.hpMax += (3 * player.lvl)
    player.hp += (3 * player.lvl)
    player.expMax *= 2
    window.alert("you leveled up!")
    if((player.lvl % 5) == 0){
      player.defenseMax += 1
      player.powerMax += 1
      player.speed += 1
    }
  }
  if((player.name == "barbarian" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.powerMax++
    player.hpMax += 5
    player.hp += 5
    player.expMax *= 2
    window.alert("you leveled up!")
    savePlayer()
  }else if((player.name == "barbarian" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.powerMax++
    player.hpMax += (5 * player.lvl)
    player.hp += (5 * player.lvl)
    player.expMax *= 2
    window.alert("you leveled up!")
    if((player.lvl % 5) == 0){
      player.defenseMax += 1
      player.speed += 1
    }
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
    if((player.lvl % 5) == 0){
      player.speed += 1
      player.powerMax += 1
    }
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
    if((player.lvl % 5) == 0){
      player.defenseMax += 1
      player.powerMax += 1
      player.speed += 1
    }
  }
  
  
  drawPlayer()
}

function looting(){
  let item = loot[Math.floor(Math.random()*loot.length)]
  let chance = Math.floor(Math.random()*100)

  gold *= (1+player.lvl)

  if(chance > 80){
    equipment.push(item)
    window.alert("you got a "+item)
  }else if(chance > 25){
      player.gold += gold
      tempAlert("you got gold: "+gold)
  }
  gold /= (1+player.lvl)
}

  document.getElementById("theme-music").volume = 0.5;

  
loadPlayer()
drawPlayer()
