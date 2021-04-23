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
//let attuned = []

//abilities
let evade = 0

//general
let turn = 0 
let days = 1
let expMax = 5
let equip = false
let doomsDay = Math.floor(Math.random()*4)+4

// loot
let loot = ["healing potion", "gem", "mana potion","exploding potion", "scroll of fireball"]
let rare = ["potion of strength","potion of speed", "potion of defense", "potion of health", "potion of magic"]
let gold = Math.floor(Math.random()*12)

/* additional money values
let copper = Math.floor(Math.random()*99)+1
let silver = Math.floor(Math.random()*24)+1
let platinum = 1
let coinPouch = [copper, silver, gold, platinum]
*/

// characters
let rogue = {name: "rogue", hpMax: hpMax + 5, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax + 1,hp: hpMax + 5, block: block, power: 0, magic: magicMax,defense: 0, speed: speedMax + 1, lvl: lvl, exp: exp, expMax: expMax, evade: evade, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0}
let barbarian = {name: "barbarian", hpMax: hpMax + 15, defenseMax: defenseMax, powerMax: powerMax + 1, magicMax: magicMax, speedMax: speedMax,hp: hpMax + 15, block: block, power: 0, magic: magicMax,defense: 0, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0}
let paladin = {name: "paladin", hpMax: hpMax + 10, defenseMax: defenseMax + 1, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, hp: hpMax + 10, block: block, power: 0, magic: magicMax,defense: 0, speed: speedMax,  lvl: lvl, exp: exp, expMax: expMax, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0}
let wizard = {name: "wizard", hpMax: hpMax, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax + 3, speedMax: speedMax, hp: hpMax, block: block, power: 0, magic: magicMax + 3,defense: 0, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0}

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
  /* equipment
  function toggle(item){
    equip = !equip
    let index = attuned.indexOf(item)
    
    if(item == "buckler" && equip == true){
      if(index < 0){
      attuned.push("buckler")
      player.defense = 1
      //window.localStorage.setItem("attuned", JSON.stringify(attuned))
      document.getElementById("shield").classList.add("equipped")
      window.localStorage.setItem("attuned", JSON.stringify(attuned))
      drawPlayer()
    }
  }
    if(index >= 0){
  if(item == "buckler" && equip == false){
    player.defense = 0
    document.getElementById("shield").classList.remove("equipped")
    unAttune("buckler")
     drawPlayer()
}
    }
    if(item == "dagger" && equip == true){
      if(index < 0){
      attuned.push("dagger")
      player.power = 1
      //window.localStorage.setItem("attuned", JSON.stringify(attuned))
      document.getElementById("weapon").classList.add("equipped")
      window.localStorage.setItem("attuned", JSON.stringify(attuned))
      drawPlayer()
    }
  }
    if(index >= 0){
  if(item == "dagger" && equip == false){
    player.power = 0
    document.getElementById("weapon").classList.remove("equipped")
    unAttune("dagger")
     drawPlayer()
}
    } if(item == "boots of speed" && equip == true){
      if(index < 0){
      attuned.push("boots of speed")
      player.speedMax++
      //window.localStorage.setItem("attuned", JSON.stringify(attuned))
      document.getElementById("boots").classList.add("equipped")
      window.localStorage.setItem("attuned", JSON.stringify(attuned))
      drawPlayer()
    }
  }
    if(index >= 0){
  if(item == "boots of speed" && equip == false){
    player.speedMax--
    document.getElementById("boots").classList.remove("equipped")
    unAttune("boots of speed")
     drawPlayer()
}
    }

}
*/
  function healingPotion(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
//boost penalty
  if(player.expBoost == 1){
    player.expBoost--
  }else if(player.expBoost > 1){
    player.expBoost -= 2
  }

  if(item == "healing potion"){

    player.hp = player.hpMax
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    
    
    dialogBox("your wounds magicaly knit together and you feel like kicking monster butt!")
  }
  }
  function manaPotion(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "mana potion"){

    player.magic = player.magicMax
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("you feel a magical surge")
  }
  }
  function magicPot(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "potion of magic"){

    player.magicMax++
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("you feel a POWERFUL magical surge")
  }
  }
  function healthPot(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "potion of health"){

    player.hpMax += 5
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("your pulse quickens, you feel more resilient")
  }
  }
  function defensePot(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "potion of defense"){

    player.defenseMax++
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("your skin grows harder, you feel less vulnerable")
  }
  }
  function speedPot(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "potion of speed"){

    player.speedMax++
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("your pulse quickens and you feel lighter and more agile")
  }
  }
  function strengthPot(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "potion of strength"){

    player.powerMax++
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("your muscles grow visible in size and you feel stronger")
  }
  }
  function fireBall(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "scroll of fireball"){
let attack = Math.floor(Math.random()*15)+5
    attack -= enemy.resistance
    enemy.hpMax -= attack
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    drawEnemy()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("you read the scroll and it bursts into flames forming a huge ball of fire that streaks toward the enemy "+attack+" DMG")
  }
  }
  function explodingPot(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "exploding potion"){
    let attack = Math.floor(Math.random()*15)+5
    attack -= enemy.defenseMax
    enemy.hpMax -= attack
    player.speed--

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    drawEnemy()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("you throw the warm bootle at the monster, it shatters in a fiery explosion "+attack+" DMG")
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

function dialogBox(msg){

  document.getElementById("dialog").innerHTML += 
 `
<p class="m-1"> ${msg}\n </p>
`
let scroll = document.getElementById('dialog');
   scroll.scrollTop = scroll.scrollHeight;
   scroll.animate({scrollTop: scroll.scrollHeight});
}

  
  //events
  function rest(){
    player.expBoost = 0
    player.days++
    player.hp = player.hpMax
    player.magic = player.magicMax
    displayDay()
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

/*function unAttune(index){

  attuned.splice(index,1)
  window.localStorage.setItem("attuned", JSON.stringify(attuned))
}
*/

function sell(event){
  event.preventDefault()
  let form = event.target
  let item = form.name.value
  let index = equipment.indexOf(item)
  let price = Math.floor(Math.random()*25)+25
  if(index >= 0){

    deleteItem(index)
 
    player.gold += price
    dialogBox("you sold "+item+" for "+price+" gp")
    savePlayer()
    loadPlayer()
    drawItems()
    document.getElementById("cancel").classList.add("hidden") 
    document.getElementById("events").classList.add("hidden")  
  }else{
    dialogBox("i dont want yer '"+item+"'. take it and scram!")
  }
  form.reset()
}

function buyHp(){

  if(player.gold > 149){
    player.gold -= 150
    equipment.push("healing potion")
    dialogBox("heres yer potion, don't go'a dyin' ok")
  }
  else{
    dialogBox("this aint no charity!")
  }
  savePlayer()
  loadPlayer()
  drawItems()
  document.getElementById("events").classList.add("hidden") 
  document.getElementById("cancel").classList.add("hidden") 
}
function buyMana(){

  if(player.gold > 149){
    player.gold -= 150
    equipment.push("mana potion")
    dialogBox("heres yer magic potion")
  }
  else{
    dialogBox("this aint no charity!")
  }
  savePlayer()
  loadPlayer()
  drawItems()
  document.getElementById("events").classList.add("hidden") 
  document.getElementById("cancel").classList.add("hidden") 
}
function buyScroll(){

  if(player.gold > 249){
    player.gold -= 250
    equipment.push("scroll of fireball")
    dialogBox("heres yer magic scroll")
  }
  else{
    dialogBox("this aint no charity!")
  }
  savePlayer()
  loadPlayer()
  drawItems()
  document.getElementById("events").classList.add("hidden") 
  document.getElementById("cancel").classList.add("hidden") 
}
function buyExplosion(){

  if(player.gold > 249){
    player.gold -= 250
    equipment.push("exploding potion")
    dialogBox("heres yer exploding potion")
  }
  else{
    dialogBox("this aint no charity!")
  }
  savePlayer()
  loadPlayer()
  drawItems()
  document.getElementById("events").classList.add("hidden") 
  document.getElementById("cancel").classList.add("hidden") 
}
  // actions
  function attack(){
    let attack = player.powerMax+player.power
    attack -= enemy.defenseMax

    if(attack < 1){
      attack = 0
    }
    if(attack > 0){
    dialogBox("hit! "+attack+" DMG")
  }else{
    dialogBox("that seemed to only make it angrier...")
  }

    enemy.hpMax -= attack
    player.speed--

    drawPlayer()
    drawEnemy()
    victory()
    turnTracker()
  }
 
  function blocking(){

    player.block += player.power+player.powerMax
    player.speed--
    turnTracker()
    drawPlayer()
  }
  function flee(){
    let chance = Math.floor(Math.random()*100)

    if(chance > 50){
      player.speed = player.speedMax
      document.getElementById("enemy").classList.add("hidden")
      document.getElementById("events").classList.remove("hidden")
      document.getElementById("actions").classList.add("hidden")
      enemy.hpMax = hpMax
      player.expBoost = 0
      savePlayer()
      dialogBox("you got away! you quick lucky coward")
    }else{
      player.speed = 0
      dialogBox("the enemy prevents you from fleeing")
      turnTracker()
      drawPlayer()
    }

  }

  function drawSpells(){
    let template = ""

    if(player.name == "wizard"){
    template += 
    `
    <div class="m-1 spells">
    <button onclick="fireBolt()">firebolt</button>
    </div>
    <div class="m-1">
    <button onclick="iceBlast()">iceblast</button>
    </div>
    `
  }
    if(player.name == "wizard" && player.lvl > 2){
      template += 
      `
      <div class="m-1">
      <button onclick="shield()">shield</button>
      </div>
      <div class="m-1">
      <button onclick="trueSight()">true sight</button>
      </div>
      `
    } 
    if(player.name == "paladin" && player.lvl >= 5){
      template +=
      `
      <div class="m-1">
      <button onclick="divineSmite()">divine smite</button>
      </div>
      `
    }
    document.getElementById("spells").innerHTML = template
  }

  function fireBolt(){
    let attack = Math.floor(Math.random()*9)+1+(5*player.lvl)
    if(player.magic > 0){
    attack -= enemy.resistance
    
    if(attack < 1){
      attack = 0
    }
if(attack > 0){
    dialogBox("hit! "+attack+" DMG")
}else{
  dialogBox("either that missed or he's magic resistant...")
}
    enemy.hpMax -= attack
    player.speed--
    player.magic--
  }
  else{
    dialogBox("your body grows hot as you start sweating, must be out of magic")
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
    console.log(enemy)
    dialogBox("hit! "+attack+" DMG, the enemy is slowed")
    enemy.hpMax -= attack
    player.speed--
    player.magic--
  }
  else{
    dialogBox("your hand grows cold and your stomache churns, must be out of magic")
  }
    drawPlayer()
    drawEnemy()
    victory()
    turnTracker()
    console.log("enemy speed:"+enemy.speed)
  }
  function shield(){
    if(player.magic > 0){
    player.defense += 5
    player.speed--
    player.magic--
  }
  else{
    dialogBox("your head starts to ache, not enough magic to cast that spell")
  }
    drawPlayer()
    turnTracker()
  }
function trueSight(){
  if(player.magic > 0){
window.alert("defense: "+enemy.defenseMax+" magic res.: "+enemy.resistance+" speed: "+enemy.speedMax)
dialogBox("defense: "+enemy.defenseMax+" magic resistance: "+enemy.resistance+" speed: "+enemy.speedMax)
player.magic--
}
else{
  dialogBox("your eyes begin to water, you need more magic")
}
drawPlayer()
}
function divineSmite(){
  let attack = Math.floor(Math.random()*(10*player.lvl))+10
  if(player.magic > 0){
  attack -= enemy.resistance
  
  if(attack < 1){
    attack = 0
  }
if(attack > 0){
  dialogBox("hit! "+attack+" DMG")
}else{
dialogBox("either that missed or he's magic resistant...")
}
  enemy.hpMax -= attack
  player.speed--
  player.magic--
}
else{
  dialogBox("something is missing, you feel a lack of holy power")
}
  drawPlayer()
  drawEnemy()
  victory()
  turnTracker()
}
// games

function displayDay(){
  let display = player.days
  if(!display){
    display = 0
  }
  template =
  `
  <b>Day: ${display}<b>
  <p>exp boost: ${player.expBoost}<p>
  `
  document.getElementById("days").innerHTML = template
}

function drawPlayer(){
  let shield = player.defenseMax+player.defense
  let attack = player.power+player.powerMax
drawSpells()
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
  Defense: ${shield}
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
  Power: ${attack}
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
  <button class="btn-cancel" type="button" onclick="resetCharacter()">reset
  </button>
  </p>
  </div>
  `
  document.getElementById("player").innerHTML = template

  drawPlayerImage()
  displayDay()
  
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
    }else if(item == "mana potion"){
      template +=
      `
      <div class="m-1">
      <button onclick="manaPotion('${item}')">${item}</button>
      </div>
      `
    }  else if(item == "exploding potion"){
      template +=
      `
      <div class="m-1">
      <button onclick="explodingPot('${item}')">${item}</button>
      </div>
      `
    }
    else if(item == "scroll of fireball"){
      template +=
      `
      <div class="m-1">
      <button onclick="fireBall('${item}')">${item}</button>
      </div>
      `
    }
    else if(item == "potion of strength"){
      template +=
      `
      <div class="m-1">
      <button onclick="strengthPot('${item}')">${item}</button>
      </div>
      `
    }else if(item == "potion of speed"){
      template +=
      `
      <div class="m-1">
      <button onclick="speedPot('${item}')">${item}</button>
      </div>
      `
    }
    else if(item == "potion of defense" ){
      template +=
      `
      <div class="m-1">
      <button onclick="defensePot('${item}')">${item}</button>
      </div>
      `
    }else if(item == "potion of health" ){
      template +=
      `
      <div class="m-1">
      <button onclick="healthPot('${item}')">${item}</button>
      </div>
      `
    }else if(item == "potion of magic"){
      template += 
      `
      <div class="m-1>
      <button onclick="magicPot('${item}')">${item}</button>
      </div>
      `
    }
    else{
      template +=
      `
      <div class="m-1">
      <button  onclick="toggle('${item}')">${item}</button>
      </div>
      `
    }



  });
  document.getElementById("pouch").innerHTML = template

}
function boss(){
  let color = ["black","blue","green","red","white","bronze","brass","copper","gold","silver"]
  let dColor = color[Math.floor(Math.random()*color.length)]
  let name = dColor+" dragon"
  let dragon = {name: name, hpMax: hpMax, powerMax: 8, defenseMax: 2, speedMax: 3, speed: 3, resistance: 2, lvl: 5, bite: 0, breath: 0, title: "boss"}
enemy = dragon
dragon.hpMax = 250
  //dragon.bite = Math.floor(Math.random()*10)
  //dragon.breath = [player.speed--,player.defense--,player.power--,player.magic--,player.hpMax-=5] 
  document.getElementById("dragon").classList.remove("hidden")
  document.getElementById("enemy").classList.add("boss")
}

function enemyGenerator(){
  document.getElementById("enemy").classList.remove("boss")
  document.getElementById("dragon").classList.add("hidden")
  enemy.title = enemy.name
  let monsters = ["giant rat", "giant bat", "giant spider", "grey ooze", "goblin", "thug", "orc", "shadow", "kobold", "skeleton", "wolf", "zombie", "bandit", "cultist"]
  let monsters2 = ["animated armor", "bandit captian", "berserker", "dragon wyrmling", "death dog", "dire wolf", "dread warrior", "fire snake", "ghast", "ghoul", "giant boar", "giant toad", "drake", "grick", "maw demon", "mimic", "minotaur skeleton", "nothic", "ochre jelly", "ogre", "pegasus", "sea hag", "will-o'-wisp"]
  let monsters3 = ["banshee","basilisk","bearded devil","black pudding","displacer beast","doppleganger","flameskull","hell hound","knight","manticore","minotaur","mummy","phase spider","shadow demon","succubus","wight","yeti"]
  let chance = Math.floor(Math.random()*player.lvl)
  
  if(chance == 0){
    enemy.name = monsters[Math.floor(Math.random()*monsters.length)]
    enemy.hpMax = Math.floor(Math.random()*10)+10
    enemy.powerMax = Math.floor(Math.random()*3)+1
    enemy.defenseMax = Math.floor(Math.random()*2)
    enemy.resistance = Math.floor(Math.random()*2)
    enemy.lvl = 1
    console.log(enemy+" lvl 1")
  } else if(chance > 0 && chance < 3){
    enemy.name = monsters2[Math.floor(Math.random()*monsters2.length)]
    enemy.hpMax = Math.floor(Math.random()*20)+20
    enemy.powerMax = Math.floor(Math.random()*4)+2
    enemy.defenseMax = Math.floor(Math.random()*2)+1
    enemy.resistance = Math.floor(Math.random()*2)+1
    enemy.lvl = 2
    console.log(enemy+" lvl 2")
  }else if(chance >= 4){
    enemy.name = monsters3[Math.floor(Math.random()*monsters3.length)]
    enemy.hpMax = Math.floor(Math.random()*30)+30
    enemy.powerMax = Math.floor(Math.random()*6)+4
    enemy.defenseMax = Math.floor(Math.random()*4)+2
    enemy.resistance = Math.floor(Math.random()*4)+2
    enemy.lvl = 3
    console.log(enemy+" lvl 3")
  }
}


function spawnEnemy(){
  console.log(player.doomsDay)
  player.speed = player.speedMax
  drawPlayer()
  document.getElementById("enemy").classList.remove("hidden")
  if(player.days == (player.doomsDay-1)){
    dialogBox("the sky darkens... a shiver crawls up your spine.")
  }

if(player.days >= player.doomsDay){
  boss()
document.getElementById("flee").classList.add("hidden")
  player.doomsDay += (Math.floor(Math.random()*4)+4)
  dragon.hpMax *= 2
}else{
  document.getElementById("flee").classList.remove("hidden")
  enemyGenerator()
}
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
      dialogBox("Dodged!")
    }
  }

// defense vs attack
player.block -= attack
attack -= dmgReducer
attack -= (player.defenseMax+player.defense)
  
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
dialogBox("you were attacked! you take "+totalDmg+" damage")

player.block = 0

if(player.hp <= 0){
  if(player.gold >= 1000){
    if(confirm("bribe the fates? 1000gp")){
      player.gold -= 1000
      player.hp = player.hpMax}
      else{
      window.alert("you died! that sucks.... try again?")
      localStorage.removeItem("player")
      localStorage.removeItem("items")
      hideGame()
      location.reload()
    }
  }else{
    window.alert("you died! that sucks.... try again?")
    localStorage.removeItem("player")
    localStorage.removeItem("items")
    hideGame()
    location.reload()
  }
}
enemy.speed = enemy.speedMax
player.speed = player.speedMax
drawPlayer()
}

function victory(){
  if (enemy.hpMax <= 0){
    player.exp += (enemy.lvl+player.expBoost)
    if(player.expBoost >= Math.floor(player.lvl*2)){
    }else{
      player.expBoost++
    }
    
    dialogBox("Victory!")
    lvlUp()
    player.speed = player.speedMax
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
    dialogBox("you leveled up!")
  }else if((player.name == "rogue" && player.exp >= player.expMax && player.lvl >= 0)){
    player.lvl++
    let pe = player.evade
    player.evade *= 1.3
    let ce = player.evade
    player.hpMax += (3 * player.lvl)
    player.hp += (3 * player.lvl)
    player.expMax *= 2
    dialogBox("you leveled up!")
    if((player.lvl % 5) == 0){
      player.defenseMax += 1
      player.powerMax += 1
      player.speed += 1
      dialogBox("you leveled up!")
    }
  }
  if((player.name == "barbarian" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.powerMax++
    player.hpMax += 5
    player.hp += 5
    player.expMax *= 2
    dialogBox("you leveled up!")
    savePlayer()
  }else if((player.name == "barbarian" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.powerMax++
    player.hpMax += (5 * player.lvl)
    player.hp += (5 * player.lvl)
    player.expMax *= 2
    dialogBox("you leveled up!")
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
    dialogBox("you leveled up!")
  }else if((player.name == "paladin" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.defenseMax++
    player.hpMax += (4 * player.lvl)
    player.hp += (4 * player.lvl)
    player.expMax *= 2
    dialogBox("you leveled up!")
    if((player.lvl % 5) == 0){
      player.speedMax += 1
      player.powerMax += 1
      player.magicMax++
      player.magic++
      document.getElementById("spells").classList.remove("hidden")
      drawSpells()
    }
  }  
  if((player.name == "wizard" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.magicMax += 1
    player.hpMax += 2
    player.hp += 2
    player.expMax *= 2
    dialogBox("you leveled up!")
    drawSpells()
  }else if((player.name == "wizard" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.magicMax += 1
    player.hpMax += (2 * player.lvl)
    player.hp += (2 * player.lvl)
    player.expMax *= 2
    dialogBox("you leveled up!")
    drawSpells()
    if((player.lvl % 5) == 0){
      player.defenseMax += 1
      player.powerMax += 1
      player.speedMax += 1
      drawSpells()
    }
  }
  
  
  drawPlayer()
}

function looting(){
  let rareItem = rare[Math.floor(Math.random()*rare.length)]
  let item = loot[Math.floor(Math.random()*loot.length)]
  let chance = Math.floor(Math.random()*100)
  gold *= enemy.lvl
console.log(enemy.title)
  if(enemy.title == "boss"){
    equipment.push(rareItem)
    equipment.push(rareItem)
    player.gold += gold
    dialogBox("you got a RARE "+rareItem)
    dialogBox("you got a "+item)
    dialogBox("you got gold: "+gold)
  }

if(chance == 100){
  equipment.push(rareItem)
  dialogBox("you got a RARE "+rareItem)
}else if(chance > 80){
    equipment.push(item)
    dialogBox("you got a "+item)
  }else if(chance > 25){
      player.gold += gold
      dialogBox("you got gold: "+gold)
  }
  gold = Math.floor(Math.random()*12)+1
}

  document.getElementById("theme-music").volume = 0.5;

loadPlayer()
drawPlayer()
