// #region variables

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
let equipment = ["healing potion","mana potion"]
let killCount = 0

//abilities
let evade = 0
let hpDrain = 0
let thorns = 0
//general
let turn = 0 
let days = 1
let expMax = 5
let doomsDay = Math.floor(Math.random()*4)+6
let map = ["forest", "sanctuary", "small town", "goblin valley", "old ruins", "graveyard", "hidden dungeon", "cave", "swamp",  "mountains", "sand dunes","wizards tower", "island on a lake", "temple",  "great city", "dragon lair", "magical gate"]
// bosses
let dragon = {name: "dragon",hp: 125, hpMax: 125, powerMax: 0, defenseMax: 0, speedMax: 3, speed: 3, resistance: 0, lvl: 4, bite: 0, breath: 0, title: "boss"}
// loot
let loot = ["healing potion", "gem", "mana potion","exploding potion", "scroll of fireball"]
let rare = ["potion of strength","potion of speed", "potion of defense", "potion of health","potion of magic"]
let discover = ["amulet of regen","potion of experience","magic staff"]
let gold = Math.floor(Math.random()*12)+1

/* additional money values
let copper = Math.floor(Math.random()*99)+1
let silver = Math.floor(Math.random()*24)+1
let platinum = 1
let coinPouch = [copper, silver, gold, platinum]
*/

// characters
let rogue = {name: "rogue", hpMax: hpMax + 5, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax + 1,hp: hpMax + 5, block: block, power: 0, magic: magicMax,defense: 0, speed: speedMax + 1, lvl: lvl, exp: exp, expMax: expMax, evade: .1, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0,hpDrain: 0,thorns: 0, bkc: 1, m1: false, m2: false, m3: false}
let barbarian = {name: "barbarian", hpMax: hpMax + 15, defenseMax: defenseMax, powerMax: powerMax + 1, magicMax: magicMax, speedMax: speedMax,hp: hpMax + 15, block: block, power: 0, magic: magicMax,defense: 0, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0,hpDrain: 0,thorns: 0, bkc: 1}
let paladin = {name: "paladin", hpMax: hpMax + 10, defenseMax: defenseMax + 1, powerMax: powerMax, magicMax: magicMax, speedMax: speedMax, hp: hpMax + 10, block: block, power: 0, magic: magicMax,defense: 0, speed: speedMax,  lvl: lvl, exp: exp, expMax: expMax, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0,hpDrain: 0, thorns: 0, bkc: 1}
let wizard = {name: "wizard", hpMax: hpMax, defenseMax: defenseMax, powerMax: powerMax, magicMax: magicMax + 3, speedMax: speedMax, hp: hpMax, block: block, power: 0, magic: magicMax + 3,defense: 0, speed: speedMax, lvl: lvl, exp: exp, expMax: expMax, gold: gold, days: days, doomsDay: doomsDay, expBoost: 0,hpDrain: 0,thorns: 0, bkc: 1}

let player = []

let enemy = []
  
//#endregion

//#region game data
function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
  function setCharacter(character){
    player = character

    savePlayer()
    drawPlayer()
    hideStart()
  }
function death(){
  localStorage.removeItem("player")
  localStorage.removeItem("items")
  localStorage.removeItem("enemy")
  hideGame()
  location.reload()
}
  function resetCharacter(){

    if(confirm("are you sure you want to commit suicide?")){
      if(confirm("are you really ready to just give up?")){
        window.alert("you impaled youself. as you stare up at the sky as you quickly bleed out your last thought is: why?")
        death()
      }else {
        window.alert("woah what were you even thinking! of course you want to live!")
      }
  }else{
window.alert("yeah that would be pretty stupid.")
  }
  }

  function drawPlayerImage(){
    if(player.name == "rogue"){
      if(player.bkc > 1 && player.lvl > 9){
        document.getElementById("rogue").classList.add("hidden")
        document.getElementById("rogue2").classList.remove("hidden")
      }else{
        document.getElementById("rogue").classList.remove("hidden")
      }
    }
    else if(player.name == "barbarian"){
      if(player.bkc > 1 && player.lvl > 9){
        document.getElementById("barbarian").classList.add("hidden")
        document.getElementById("barbarian2").classList.remove("hidden")
      }else{
        document.getElementById("barbarian").classList.remove("hidden")
      }
    }
    else if(player.name == "paladin"){
      if(player.bkc > 1 && player.lvl > 9){
        document.getElementById("paladin").classList.add("hidden")
        document.getElementById("paladin2").classList.remove("hidden")
      }else{
        document.getElementById("paladin").classList.remove("hidden")
      }
    }
    else if(player.name == "wizard"){
      if(player.bkc > 1 && player.lvl > 9){
        document.getElementById("wizard").classList.add("hidden")
        document.getElementById("wizard2").classList.remove("hidden")
        document.getElementById("spells").classList.remove("hidden")
      }else{
        document.getElementById("wizard").classList.remove("hidden")
        document.getElementById("spells").classList.remove("hidden")
      }
    }
  }

  function savePlayer(){
    window.localStorage.setItem("player", JSON.stringify(player))
    window.localStorage.setItem("items", JSON.stringify(equipment))
    window.localStorage.setItem("enemy", JSON.stringify(enemy))
    drawPlayer()
  }
  
  function loadPlayer(){
    let load = JSON.parse(window.localStorage.getItem("player"))
    let battle = JSON.parse(window.localStorage.getItem("enemy"))

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
    //load last battle if unfinished
    if(battle != null){
      if(battle.hpMax > 0){
        if(battle.title == "boss"){
          enemy = battle
          console.log("boss loaded")
          bossControls()
          drawEnemy()
        }else if(battle.title == "demon boss"){
          enemy = battle
          demonBossControls()
          drawEnemy()
        }else{
          console.log("battle loaded")
          battleControls()
          enemy = battle
          drawEnemy()
        }
    }
  }
  }
  //#endregion

//#region items
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
let attack = Math.floor(Math.random()*50)+5+(player.lvl*2)
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
    let attack = Math.floor(Math.random()*50)+5+(player.lvl*2)
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
  function vampiricBracers(){

  if(player.gold > 4999){
    player.gold -= 5000
    player.hpDrain += 5

    document.getElementById("bracers").classList.add("hidden")
    dialogBox("you equiped the bracers and feel ready for battle")
    drawItems()
    document.getElementById("cancel").classList.add("hidden")
    savePlayer()
  }else{
    dialogBox("you've got a good eye, but yer poor come back when you got them money")
  }
  }

  function spikedArmor(){
    
    if(player.gold > 3999){
      player.gold -= 4000
      player.thorns += 2
      document.getElementById("spikes").classList.add("hidden")
      dialogBox("you equiped the armor and feel ready for battle")
      drawItems()
      document.getElementById("cancel").classList.add("hidden")
      savePlayer()
    }else{
      dialogBox("you've got a good eye, but yer poor come back when you got them money")
    }
  }

  function amuletOfRegen(item){
    if(item == "amulet of regen"){
  
        leave()
      dialogBox("you put on the amulet and sense a gentle warmth from it that soothes your pain")
    }
  }
  function magicStaff(item){
    if(item == "magic staff"){
  
        leave()
      dialogBox("holding this ancient carved piece of wood slowly regenerates your magic")
    }
  }

  function expPotion(item){
    let cancelBtn = document.getElementById("shop").classList.contains("hidden")
  let index = equipment.indexOf(item)
  if(item == "experience potion"){

  player.exp += Math.floor(player.expMax*.3)
    player.expBoost = player.lvl*2

    deleteItem(index)
    turnTracker()
    savePlayer()
    loadPlayer()
    document.getElementById("events").classList.add("hidden")
    drawItems()
    if(cancelBtn == false){
      document.getElementById("cancel").classList.add("hidden")
    }
    dialogBox("you feel enlightened")
  }
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
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }else if(item == "mana potion"){
        template +=
        `
        <div class="m-1">
        <button onclick="manaPotion('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }  else if(item == "exploding potion"){
        template +=
        `
        <div class="m-1">
        <button onclick="explodingPot('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }
      else if(item == "scroll of fireball"){
        template +=
        `
        <div class="m-1">
        <button onclick="fireBall('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }
      else if(item == "potion of strength"){
        template +=
        `
        <div class="m-1">
        <button onclick="strengthPot('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }else if(item == "potion of speed"){
        template +=
        `
        <div class="m-1">
        <button onclick="speedPot('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }
      else if(item == "potion of defense" ){
        template +=
        `
        <div class="m-1">
        <button onclick="defensePot('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }else if(item == "potion of health" ){
        template +=
        `
        <div class="m-1">
        <button onclick="healthPot('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }else if(item == "potion of magic" ){
        template +=
        `
        <div class="m-1">
        <button onclick="magicPot('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }
      else if(item == "amulet of regen" ){
        template +=
        `
        <div class="m-1">
        <button onclick="amuletOfRegen('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }      else if(item == "experience potion" ){
        template +=
        `
        <div class="m-1">
        <button onclick="expPotion('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }      else if(item == "magic staff" ){
        template +=
        `
        <div class="m-1">
        <button onclick="magicStaff('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }
      else{
        template +=
        `
        <div class="m-1">
        <button  onclick="toggle('${item}')">${item}</button>
        <button class="sell hidden" onclick="sell('${item}')">sell</button>
        </div>
        `
      }
  
    });
    document.getElementById("pouch").innerHTML = template
  
  }
  
//#endregion

//#region visibility
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
  function battleControls(){
    document.getElementById("actions").classList.remove("hidden")
    document.getElementById("events").classList.add("hidden")
    document.getElementById("enemy").classList.remove("hidden")
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

//#endregion  

//#region events
  function rest(){
    player.expBoost = 0
    player.days++
    player.hp = player.hpMax
    player.magic = player.magicMax
    displayDay()
    savePlayer()
  }

  function adventure(){
    let time = Math.floor(Math.random()*100)+1
    let rareItem = rare[Math.floor(Math.random()*rare.length)]
    let item = loot[Math.floor(Math.random()*loot.length)]
    let chance = Math.floor(Math.random()*100)+1
    let relic = discover[Math.floor(Math.random()*discover.length)]
    let destination = map[Math.floor(Math.random()*map.length)]
    if(player.expBoost > 0){
      player.expBoost--
    }
    gold = time
    //noble
    if(chance == 100){
      if(confirm("a nobel sends for you by name, do you answer the summons?")){
        equipment.push(relic)
        dialogBox("you go on a quest for the nobel and in return they reward you generously. you got a "+relic)}else{
          dialogBox("nobels are always a pain to work with, instead you go for a more mundane job and recieve a welcomed suprise you got a"+item)
          equipment.push(item)
        }
      }
      //begger
      else if(chance > 95){
if(confirm("you encounter a strange figure completely clothed in rags, his face is covered but he holds out a hand asking for alms. do you give the begger 50 gp?")){player.gold -= 50
  if(confirm("the begger wants to repay you by reading you palm, do you allow it?")){
    dialogBox("the begger begins to sweat and shake saying doom is soon to come in "+(player.doomsDay-player.days)+" days!")
  }else{
    if(confirm("the begger looks eager to repay you, he tells you of a secret place you can go to find hidden treasure. do you trust him and go to the place?")){
      window.alert("you venture into the secret place and discover many traps and monsters, you fight tooth and nail and barely get out alive")
      player.hp = 1
      drawPlayer()
      if(confirm("do you give up?")){
        dialogBox("you give up but not without analyzing your defeat and learning from this failure")
        player.exp += (player.lvl+1)*10
      }else{
dialogBox("you decide to take a different approach and stubble upon a secret passage to a treasure hoard! you get 1000gp "+item+" "+rareItem)
        player.gold += 1000
        equipment.push(item)
        equipment.push(rareItem)

      }
    }else{dialogBox("you ignore the tales of the poor crazy man and venture onto other encounters")}
  }

}else{dialogBox("you keep you money, best not waste it on low lifes")}

      }
      //rare vs mugged
      else if(chance > 75){
        if(confirm("your adventures take you to a "+destination+". it looks difficult, do you choose to continue?")){
          equipment.push(rareItem)
          dialogBox("you notice a secret passage  "+rareItem)
        }else{
          dialogBox("you turn back but get ambushed, of course you made it through just fine... after they beat you up and took your gold that is.")
          let mug = player.gold -= Math.floor(player.gold*.25)
          let hurt = Math.floor(player.hp*.25)
          if(player.hp < 1){
            window.alert("you turn back but get ambushed, before you could react you notice a blade portruding through your chest. you calapse as death overcomes you.")
          }
          dialogBox("you took "+hurt+" dmg")
          dialogBox("lost : "+mug+" gold")      
        }
      }
      //item vs gold
      else if(chance > 50){
        if(confirm("your adventures take you to a "+destination+". it looks a little scary. do you choose to continue?")){
          equipment.push(item)
          dialogBox("you got lucky the place was deserted but you were still able to find a "+item)
        }else{
          dialogBox("you decide to play it save and earn a decent reward")
          player.gold += gold
          dialogBox("you got gold: "+gold)      
        }
      }
      //dmg vs gold
      else if(chance > 20){
        if(confirm("your adventures take you to a "+destination+". do you choose to continue?")){
          dialogBox("you continue and seem to have some unlucky encounters with traps and monsters. after all that you come away with nothing but some wounds and knowledge to stay away from that "+destination)
          let trap =((player.lvl+1)*(Math.floor(Math.random()*10)+1))
          player.hp -= trap
          dialogBox("you take "+trap+" dmg")
          if(player.hp <= 0){
            death()
            window.alert("you fall in battle fighting off monsters")
          }
          player.exp += ((player.lvl+1)*(Math.floor(Math.random()*2)+1))
          lvlUp()
        }else{
          dialogBox("you decide to play it safe and earn some money through manual labor")
          player.gold += gold
          dialogBox("you got gold: "+gold)
        }
      }
      else if(chance == 1) {
        if(confirm("your adventures take you to a "+destination+", its too quiet. do you dare to continue?")){
          window.alert("you encounter a god level monster and before you can even react he disintigrates you into ash.")
          death()
        }else{
          dialogBox("you turn back unsure if you made the right choice")
        }
      }
      else if(chance < 21){
        dialogBox("you encounter an enemy on your adventure")
        spawnEnemy()
      }
      if(time > 66){
        rest()
        dialogBox("thats enough adventure for one day time for some rest")
      }
    }
    
    function shop(){
      let chance = Math.floor(Math.random()*10)
      drawItems()
      document.getElementById("shop").classList.remove("hidden")
  document.getElementById("pouch").classList.remove("hidden")
  document.getElementById("cancel").classList.add("hidden")    
  document.getElementById("events").classList.add("hidden")
  document.getElementById("rare").classList.add("hidden")
  if(chance == 0){
    document.getElementById("rare").classList.remove("hidden")
  }
  removeHidden()
}

  function deleteItem(index){
    let getItemName = JSON.parse(window.localStorage.getItem('items'));

    equipment.splice(index,1)
    getItemName.splice(index,1);
}

function sell(item){
  /*
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
*/
let index = equipment.indexOf(item)
let price = Math.floor(Math.random()*25)+25
  let c = loot.indexOf(item)
  let uc = rare.indexOf(item)
let r = discover.indexOf(item)

    deleteItem(index)
 if(c >= 0){
   if(item == "gem"){
    player.gold += price*10
    dialogBox("you sold "+item+" for "+price*10+" gp")
   }else{
     player.gold += price
     dialogBox("you sold "+item+" for "+price+" gp")
   }
 }else if(uc >= 0){
  player.gold += price*20
  dialogBox("you sold "+item+" for "+price*20+" gp")
 }else if(r >= 0){
  player.gold += price*40
  dialogBox("you sold "+item+" for "+price*40+" gp")
 }else{
    player.gold += price*80
    dialogBox("you sold "+item+" for "+price*80+" gp")
   }

    savePlayer()
    loadPlayer()
    drawItems()
    document.getElementById("cancel").classList.add("hidden") 
    document.getElementById("events").classList.add("hidden")  
    removeHidden()
}

function buyHp(){

  if(player.gold > 49){
    player.gold -= 50
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
  removeHidden()
}
function buyMana(){

  if(player.gold > 49){
    player.gold -= 50
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
  removeHidden()
}
function buyScroll(){

  if(player.gold > 149){
    player.gold -= 150
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
  removeHidden()
}
function buyExplosion(){

  if(player.gold > 149){
    player.gold -= 150
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
  removeHidden()
}

function mysteriousRune(){
  let chance = Math.floor(Math.random()*10)+1
  if(player.gold > 1999){
  player.gold -= 2000
  if(chance == 1){
   player.hpMax += (player.lvl*2)
   dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel more durable as you notice a strange symbol upon your arm.")
  }    if(chance == 2){
   player.powerMax += (player.lvl)
dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel much stronger as you notice a strange symbol upon your arm.")
  }else if(chance == 3){
  player.defenseMax += (player.lvl)
  dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel more resilient as you notice a strange symbol upon your arm.")
}else if(chance == 4){
    player.speedMax += Math.floor(player.lvl*.5)
    dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. oddly everything moves a little slower as you notice a strange symbol upon your arm.")
  }else if(chance == 5){
      player.magicMax += (player.lvl)
      dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. your now able to control more magic as you notice a strange symbol upon your arm.")
    }else if(chance == 6){
      if(player.evade >= 0){
        player.evade += .1
      }else{
        player["evade"] = .1
      }
      dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel very agile as you notice a strange symbol upon your arm.")
      }else if(chance == 7){
          player["rune"] = "rage"
          dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel bloodlust as you notice a strange symbol upon your arm.")
      }else if(chance == 8){
        player["rune"] = "spells1"
        dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel enlightened as you notice a strange symbol upon your arm.")
      }else if(chance == 9){
        player["rune"] = "spells2"
        dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel enlightened as you notice a strange symbol upon your arm.")
      }else if(chance == 10){
        player["rune"] = "divine"
        dialogBox("the rune holds magic, upon touching it you feel a surge of magic flow into you. you suddenly feel blessed as you notice a strange symbol upon your arm.")
        }
      }else{
        dialogBox("this aint no charity!")
      }
      
      
      console.log(chance)
      drawPlayer()
    }
    
    //#endregion

//#region actions
    let sound = document.getElementById("player-attack")
    function attack(){
      sound = document.getElementById("player-attack")
      sound.play()

      document.getElementById("enemy").classList.remove("hurt")
      let attack = player.powerMax+player.power
      let drain = player.hpDrain
    let miss = false
    attack -= enemy.defenseMax

    if(attack < 1){
      attack = 0
    }else{
      //hp drain
      if(drain > 0){
        if(attack < drain){
          drain = attack
        }
        player.hp += drain
        if(player.hp > player.hpMax){
          player.hp = player.hpMax
        }
        dialogBox("you steal some life force from the "+enemy.name)
      }
    }
    if(enemy.evade){
      let hit = Math.floor(Math.random()*100)
      let dodge = Math.floor(enemy.evade*100)
      if(dodge > hit){
        attack = 0
        dialogBox("the enemy Dodged!")
        miss = true
      }
    }
//thorns
if(miss == true){
  
}else if(enemy.thorns > 0){
  player.hp -= enemy.thorns
  dialogBox("hitting the enemy hurts you "+enemy.thorns+" dmg")
  
}

if(attack > 0){
  dialogBox("hit! "+attack+" DMG")
  document.getElementById("enemy").classList.add("hurt")
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

    if(chance > 75){
      player.speed = player.speedMax
      document.getElementById("enemy").classList.add("hidden")
      document.getElementById("events").classList.remove("hidden")
      document.getElementById("actions").classList.add("hidden")
      enemy.hpMax = hpMax
      player.expBoost = 0
      enemy.hpMax = 0
      savePlayer()
      dialogBox("you got away! you quick lucky coward")
    }else{
      player.speed--
      dialogBox("the enemy prevents you from fleeing")
      turnTracker()
      drawPlayer()
    }

  }
  function drawSkills(){
    let template = ""

    if( player.rune == "rage" || (player.name == "barbarian" && player.lvl >= 5)){
     template +=
      `
      <div class="m-1 skills">
      <button onclick="rage()">Rage</button>
      </div>
    `
    }
    if( player.rune == "assassinate" || (player.name == "rogue" && player.lvl >= 5)){
      template +=
       `
       <div class="m-1 skills">
       <button onclick="assassinate()">Assassinate</button>
       </div>
     `
     }
 
    document.getElementById("skills").innerHTML = template
  }

  function rage(){
    if(player.power == 0){
      player.power += (Math.round(player.powerMax*.5))
      player.defense--
      player.speed--
      document.getElementById("block").classList.add("hidden")
      dialogBox("you go into frenzy rage, you will stop at nothing to sate your blood lust")
    }else{
      player.power += (Math.round(player.powerMax*.4))
      player.defense -= 2
      player.speed--
      document.getElementById("flee").classList.add("hidden")
      dialogBox("your fiery rage grows as you become more reckless")
    }
    drawPlayer()
    turnTracker()
  }

  function assassinate(){
    let chance = Math.floor(Math.random()*20)+1
    let attack = Math.floor(Math.random()*40)+10
    if(player.speed > 1){
      if(enemy.title != "boss" || enemy.title != "demon boss"){
        if(chance == 20){
          enemy.hpMax = 0
          dialogBox("you find the enemies weakness and kill them in one stroke")
        }else{
          player.speed -= 2
          enemy.hpMax -= attack
          dialogBox("you attack the enemy at a weaker spot and do "+attack+" dmg")
        }
      }else{
        player.speed -= 2
        enemy.hp -= attack
        dialogBox("you attack the enemy at a weaker spot and do "+attack+" dmg")
      }
      }else{
        dialogBox("you cant act fast enough, need more speed")
      }

      drawPlayer()
      drawEnemy()
      victory()
      turnTracker()
  }

  function drawSpells(){
    let template = ""

    if(player.name == "wizard" || player.rune == "spells1"){
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
    if(player.lvl > 2 && (player.name == "wizard" || player.rune == "spells2")){
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
    if(player.lvl > 5 && player.name == "wizard" ){
      template += 
      `
      <div class="m-1">
      <button onclick="foresight()">foresight</button>
      </div>
      <div class="m-1">
      <button onclick="circleOfDeath()">circle of death</button>
      </div>
      `
    } 
    if(player.lvl >= 5 && (player.name == "paladin" || player.rune == "divine")){
      template +=
      `
      <div class="m-1">
      <button onclick="divineSmite()">divine smite</button>
      </div>
      `
      document.getElementById("spells").classList.remove("hidden")
    }
    document.getElementById("spells").innerHTML = template
  }

  function fireBolt(){
    let attack = Math.floor(Math.random()*15)+1+(5*player.lvl)
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
    let attack = Math.floor(Math.random()*9)+1+(3*player.lvl)
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
    player.defense += 5+(player.lvl*2)
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
function foresight(){
  let danger = player.doomsDay-player.days
  if(player.magic > 0){
  player.magic--
  window.alert("danger in "+danger+" days")
  }
  else{
    dialogBox("your head aches looks like you need more magic")
  }
  drawPlayer()
}
function circleOfDeath(){
  let chance = Math.floor(Math.random()*10)+1
  let attack = Math.floor(Math.random()*100)+1
  if(player.magic > 1){
    if(enemy.title != "boss" || enemy.title != "demon boss"){
      if(chance == 10){
        enemy.hp = 0
        dialogBox("the fog completely consumes the enemy")
      }else{
        player.magic -= 2
        enemy.speed--
        enemy.hp -= attack
        dialogBox("you summon a dark fog that surrounds the enemy, unfortunately they were quick and it only did "+attack+" dmg")
      }
    }else
    player.magic -= 2
    enemy.speed--
    enemy.hp -= attack
    dialogBox("you summon a dark fog that surrounds the enemy, unfortunately they were quick and it only did "+attack+" dmg")
    }
    else{
      dialogBox("your body aches looks like you need more magic")
    }
    drawPlayer()
    drawEnemy()
    victory()
    turnTracker()
}

//#endregion

//#region display: player, items, general

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
  let hpBar = Math.floor((player.hp / player.hpMax)*100)
  let movement = player.speed

  drawSkills()
drawSpells()
  let template =
  `
  <div class="mt-1 mb-1 p-2">
  <h3 class="mt-1 mb-1">
  ${player.name}
  </h3>
  </div>
  <div id="hp" class="d-flex space-between">
  <div style="width:${hpBar}%;">
  <p style="color: red; width: 100px; position: relative;
  top: -25%;">
  HP: ${player.hp}/${player.hpMax}
  </p>
  </div>
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
  `
  if(player.thorns > 0){
    template += 
    `
    <div class="d-flex space-between">
    <p>
    <span>
    Thorns damage: ${player.thorns}
    </span>
    </p>
    </div>
    `
  }
  if(player.hpDrain > 0){
    template += 
    `
    <div class="d-flex space-between">
    <p>
    <span>
    Life steal: ${player.hpDrain}
    </span>
    </p>
    </div>
    `
  }
  if(player.name == "wizard" || player.name == "paladin" || player.magicMax > 0){
    template +=
    `
    <div class="d-flex space-between">
    <p>
    <span>
    Magic: ${player.magic}/${player.magicMax}
    </span>
    </p>
    </div>
    `
  }
    template +=
  `
  <div class="d-flex space-between">
  <p>
  <span>
  Speed: 
  `
  
  for(let i = player.speed; i > 0; i--){
    template +=
    `
    <span class="dot"></span>
    `
  }
  
  template +=
  `
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
  if(player.name == "rogue" || player.evade > 0){
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

function removeHidden(){
        let hidden = document.getElementsByClassName("sell");
console.log(hidden.length)
        for(let i = hidden.length-1; i > -1; i--)
        {
            hidden[i].classList.remove("hidden");
        }
    }

//#endregion

//#region enemies



function boss(){
  let color = ["black","blue","green","red","white","bronze","brass","copper","gold","silver"]
let dColor = color[Math.floor(Math.random()*color.length)]
dragon.name = dColor+" dragon"

dragon.hpMax = dragon.hp
  dragon.hpMax += player.bkc*30
  dragon.hp += player.bkc*30
  dragon.powerMax += player.bkc
  dragon.defenseMax += player.bkc
  dragon.resistance += player.bkc
  dragon.lvl++
  //dragon.breath = [player.speed--,player.defense--,player.power--,player.magic--,player.hpMax-=5] 
enemy = dragon
  //dragon.bite = Math.floor(Math.random()*10)
bossControls()
  enemy.speed = enemy.speedMax
}
function bossControls(){
  document.getElementById("enemy").classList.remove("hidden")
  document.getElementById("dragon").classList.remove("hidden")
  document.getElementById("enemy").classList.add("boss")
  document.getElementById("flee").classList.add("hidden")
  drawEnemy()
  document.getElementById("actions").classList.remove("hidden")
  document.getElementById("events").classList.add("hidden")
}
function demonBoss(){
  if(player.gold > 499){
player.gold -= 500
    //let curse = [player.speed--,player.defense--,player.power--,player.magic--,player.hpMax-=20] 
    let demon = {name: "demon", hpMax: 2000, powerMax: 20, defenseMax: 20, speedMax: 5, speed: 5, resistance: 20, lvl: 30, title: "demon boss"}
    
    
    enemy = demon
    
    drawPlayer()
    drawEnemy()
    
    enemy.speed = enemy.speedMax
    demonBossControls()
    document.getElementById("demon king").classList.remove("hidden")
    savePlayer()
  }
  else{
    dialogBox("whoa thats a bad idea... unless you can pay that is")
  }
  }
  function hellPortal(){
    if(player.gold > 999){
      player.gold -= 1000
          //let curse = [player.speed--,player.defense--,player.power--,player.magic--,player.hpMax-=20] 
          let demonKing = {name: "demon king", hpMax: 8000, powerMax: 50, defenseMax: 50, speedMax: 8, speed: 8, resistance: 50, lvl: 60, title: "demon boss", thorns: 20, hpDrain: 10}
          
          
          enemy = demonKing
          
          drawPlayer()
          drawEnemy()
          
          enemy.speed = enemy.speedMax
          demonBossControls()
          document.getElementById("demon").classList.add("hidden")
          document.getElementById("enemy").classList.add("hell")
          savePlayer()
        }else{
          dialogBox("come on didnt you see that demon! you really want me to spawn a portal to hell! no, no, no, no, well... maybe for the right price...")
        }

  }
  function demonBossControls(){
    document.getElementById("actions").classList.remove("hidden")
    document.getElementById("events").classList.add("hidden")
    document.getElementById("enemy").classList.remove("hidden")
    document.getElementById("flee").classList.add("hidden")
    document.getElementById("demon").classList.remove("hidden")
    document.getElementById("enemy").classList.add("demon")
    document.getElementById("enemy").classList.add("boss")
    document.getElementById("shop").classList.add("hidden")
    document.getElementById("pouch").classList.add("hidden")
  }
  function enemyGenerator(){
  document.getElementById("enemy").classList.remove("boss")
  document.getElementById("dragon").classList.add("hidden")
  document.getElementById("enemy").classList.remove("demon")
  document.getElementById("demon").classList.add("hidden")
  enemy.title = enemy.name
  let monsters = [ {name:"giant rat", hpMax: 12, powerMax: 1, defenseMax: 0, speedMax: 3, speed: 3, resistance: 0, lvl: 1, killCount: 0}, {name: "giant bat", hpMax: 10, powerMax: 2, defenseMax: 1, speedMax: 2, speed: 2, resistance: 0, lvl: 1, killCount: 0, hpDrain: 1}, {name: "giant spider", hpMax: 15, powerMax: 2, defenseMax: 0, speedMax: 3, speed: 3, resistance: 0, lvl: 1, killCount: 0}, {name:"grey ooze", hpMax: 10, powerMax: 5, defenseMax: 2, speedMax: 1, speed: 1, resistance: 2, lvl: 1, killCount: 0, thorns: 1}, {name:"goblin", hpMax: 16, powerMax: 2, defenseMax: 0, speedMax: 3, speed: 3, resistance: 0, lvl: 1, killCount: 0}, {name:"thug", hpMax: 20, powerMax: 2, defenseMax: 1, speedMax: 2, speed: 2, resistance: -1, lvl: 1, killCount: 0}, {name:"orc", hpMax: 18, powerMax: 2, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 1, killCount: 0}, {name:"shadow", hpMax: 20, powerMax: 1, defenseMax: 2, speedMax: 2, speed: 2, resistance: 0, lvl: 1, killCount: 0, evade: .1}, {name:"kobold", hpMax: 15, powerMax: 2, defenseMax: 0, speedMax: 2, speed: 2, resistance: 1, lvl: 1, killCount: 0}, {name:"skeleton",hpMax: 25, powerMax: 2, defenseMax: 1, speedMax: 2, speed: 2, resistance: 1, lvl: 1, killCount: 0}, {name:"wolf", hpMax: 22, powerMax: 2, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 1, killCount: 0}, {name:"zombie", hpMax: 35, powerMax: 4, defenseMax: -2, speedMax: 1, speed: 1, resistance: -2, lvl: 1, killCount: 0}, {name:"bandit", hpMax: 20, powerMax: 2, defenseMax: 1, speedMax: 2, speed: 2, resistance: 0, lvl: 1, killCount: 0}, {name:"cultist", hpMax: 12, powerMax: 3, defenseMax: 0, speedMax: 2, speed: 2, resistance: 2, lvl: 1,magicMax: 3, killCount: 0}]
  let monsters2 = [{name:"animated armor", hpMax: 40, powerMax: 4, defenseMax: 4, speedMax: 2, speed: 2, resistance: 1, lvl: 2, killCount: 0}, {name:"bandit captian", hpMax: 35, powerMax: 5, defenseMax: 1, speedMax: 2, speed: 2, resistance: 0, lvl: 2, killCount: 0}, {name:"berserker", hpMax: 32, powerMax: 6, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 2, killCount: 0}, {name:"dragon wyrmling", hpMax: 30, powerMax: 4, defenseMax: 1, speedMax: 2, speed: 2, resistance: 3, lvl: 2, killCount: 0}, {name:"death dog", hpMax: 28, powerMax: 5, defenseMax: 0, speedMax: 3, speed: 3, resistance: 0, lvl: 2, killCount: 0}, {name:"dire wolf", hpMax: 33, powerMax: 6, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 2, killCount: 0}, {name:"dread warrior", hpMax: 30, powerMax: 4, defenseMax: 2, speedMax: 2, speed: 2, resistance: 2, lvl: 2, killCount: 0}, {name:"fire snake", hpMax: 27, powerMax: 3, defenseMax: 0, speedMax: 3, speed: 3, resistance: 1, lvl: 2, killCount: 0, thorns: 3}, {name:"ghoul", hpMax: 22, powerMax: 5, defenseMax: 1, speedMax: 2, speed: 2, resistance: 1, lvl: 2, killCount: 0}, {name:"giant boar", hpMax: 40, powerMax: 8, defenseMax: 1, speedMax: 2, speed: 2, resistance: 0, lvl: 2, killCount: 0}, {name:"giant toad", hpMax: 25, powerMax: 2, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 2, killCount: 0}, {name:"drake", hpMax: 36, powerMax: 4, defenseMax: 0, speedMax: 2, speed: 2, resistance: 2, lvl: 2, killCount: 0}, {name:"grick", hpMax: 35, powerMax: 3, defenseMax: 0, speedMax: 5, speed: 5, resistance: 0, lvl: 2, killCount: 0}, {name:"maw demon", hpMax: 25, powerMax: 3, defenseMax: 0, speedMax: 5, speed: 5, resistance: 2, lvl: 2, killCount: 0, hpDrain: 2}, {name:"mimic", hpMax: 20, powerMax: 6, defenseMax: 0, speedMax: 2, speed: 2, resistance: 1, lvl: 2, killCount: 0}, {name:"minotaur skeleton", hpMax: 38, powerMax: 5, defenseMax: 2, speedMax: 2, speed: 2, resistance: 2, lvl: 2, killCount: 0}, {name:"nothic", hpMax: 20, powerMax: 4, defenseMax: 0, speedMax: 2, speed: 2, resistance: 4, lvl: 2,magicMax: 3, killCount: 0, hpDrain: 2}, {name:"ochre jelly", hpMax: 20, powerMax: 15, defenseMax: 3, speedMax: 1, speed: 1, resistance: 3, lvl: 2, killCount: 0, thorns: 1}, {name:"ogre", hpMax: 34, powerMax: 5, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 2, killCount: 0}, {name:"pegasus", hpMax: 32, powerMax: 4, defenseMax: 1, speedMax: 2, speed: 2, resistance: 2, lvl: 2, killCount: 0}, {name:"sea hag", hpMax: 21, powerMax: 4, defenseMax: 0, speedMax: 2, speed: 2, resistance: 2, lvl: 2, killCount: 0, magicMax: 3}, {name:"will-o'-wisp", hpMax: 22, powerMax: 3, defenseMax: 1, speedMax: 3, speed: 3, resistance: 1, lvl: 2, killCount: 0, evade:.3, magicMax: 3}]
  let monsters3 = [{name:"banshee", hpMax: 33, powerMax: 8, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 3, killCount: 0, magicMax: 3},{name:"basilisk", hpMax: 44, powerMax: 4, defenseMax: 2, speedMax: 2, speed: 2, resistance: 1, lvl: 3, killCount: 0},{name:"bearded devil", hpMax: 46, powerMax: 5, defenseMax: 1, speedMax: 2, speed: 2, resistance: 1, lvl: 3, killCount: 0},{name:"black pudding", hpMax: 30, powerMax: 5, defenseMax: 6, speedMax: 1, speed: 1, resistance: 1, lvl: 3, killCount: 0, thorns: 3},{name:"displacer beast", hpMax: 54, powerMax: 6, defenseMax: 1, speedMax: 2, speed: 2, resistance: 1, lvl: 3, killCount: 0, evade: .4},{name:"flameskull", hpMax: 38, powerMax: 7, defenseMax: 2, speedMax: 2, speed: 2, resistance: 2, lvl: 3, killCount: 0, magicMax: 3},{name:"hell hound", hpMax: 50, powerMax: 5, defenseMax: 0, speedMax: 2, speed: 2, resistance: 1, lvl: 3, killCount: 0},{name:"knight", hpMax: 60, powerMax: 4, defenseMax: 4, speedMax: 2, speed: 2, resistance: 0, lvl: 3, killCount: 0},{name:"manticore", hpMax: 46, powerMax: 4, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 3, killCount: 0},{name:"minotaur", hpMax: 52, powerMax: 4, defenseMax: 1, speedMax: 2, speed: 2, resistance: 0, lvl: 3, killCount: 0},{name:"mummy", hpMax: 32, powerMax: 8, defenseMax: 1, speedMax: 2, speed: 2, resistance: 1, lvl: 3, killCount: 0},{name:"phase spider", hpMax: 34, powerMax: 4, defenseMax: 0, speedMax: 2, speed: 2, resistance: 3, lvl: 3, killCount: 0, evade: .3},{name:"shadow demon", hpMax: 55, powerMax: 4, defenseMax: 4, speedMax: 2, speed: 2, resistance: -1, lvl: 3, killCount: 0},{name:"succubus", hpMax: 37, powerMax: 3, defenseMax: 0, speedMax: 3, speed: 3, resistance: 0, lvl: 3, killCount: 0},{name:"wight", hpMax: 47, powerMax: 6, defenseMax: 1, speedMax: 2, speed: 2, resistance: 1, lvl: 3, killCount: 0},{name:"yeti", hpMax: 40, powerMax: 7, defenseMax: 0, speedMax: 2, speed: 2, resistance: 0, lvl: 3, killCount: 0}]
  let monsters4 = [{name:"air elemental", hpMax: 90, powerMax: 14, defenseMax: 99, speedMax: 2, speed: 2, resistance: 0, lvl: 4, killCount: 0},{name:"barbed devil", hpMax: 110, powerMax: 10, defenseMax: 0, speedMax: 2, speed: 2, resistance: 4, lvl: 4,thorns: 4, killCount: 0},{name:"earth elemental", hpMax: 126, powerMax: 28, defenseMax: 5, speedMax: 1, speed: 1, resistance: 0, lvl: 4, killCount: 0},{name:"fire elemental", hpMax: 102, powerMax: 12, defenseMax: 5, speedMax: 2, speed: 2, resistance: 1, lvl: 4, killCount: 0, thorns: 25},{name:"greater zombie", hpMax: 97, powerMax: 14, defenseMax: 0, speedMax: 2, speed: 2, resistance: 7, lvl: 4, killCount: 0},{name:"mage", hpMax: 40, powerMax: 20, defenseMax: -2, speedMax: 4, speed: 4, resistance: 5, lvl: 4, killCount: 0, magicMax: 10},{name:"mammoth", hpMax: 126, powerMax: 50, defenseMax: 0, speedMax: 1, speed: 1, resistance: -1, lvl: 4, killCount: 0},{name:"medusa", hpMax: 127, powerMax: 10, defenseMax: 0, speedMax: 5, speed: 5, resistance: 1, lvl: 4, killCount: 0},{name:"troll", hpMax: 84, powerMax: 10, defenseMax: 0, speedMax: 3, speed: 3, resistance: 0, lvl: 4, killCount: 0, hpDrain: 5},{name:"unicorn", hpMax: 67, powerMax: 9, defenseMax: 0, speedMax: 2, speed: 2, resistance: 99, lvl: 4, killCount: 0},{name:"water elemental", hpMax: 114, powerMax: 12, defenseMax: 4, speedMax: 2, speed: 2, resistance: 4, lvl: 4, killCount: 0},{name:"wraith", hpMax: 67, powerMax: 14, defenseMax: 3, speedMax: 2, speed: 2, resistance: 2, lvl: 4, killCount: 0, hpDrain: 4, magicMax: 5}]
  let chance = Math.floor(Math.random()*player.lvl)
  
  if(chance == 0){
    let spawn1 = [Math.floor(Math.random()*monsters.length)]

enemy = monsters[spawn1]

  } else if(chance > 0 && chance < 2){
    let spawn2 = [Math.floor(Math.random()*monsters2.length)]

    enemy = monsters2[spawn2]

  }else if(chance > 3 && chance < 6){
    let spawn3 = [Math.floor(Math.random()*monsters3.length)]

    enemy = monsters3[spawn3]
  }else if(chance >= 7){
    let spawn4 = [Math.floor(Math.random()*monsters4.length)]

    enemy = monsters4[spawn4]
}
}


function spawnEnemy(){
  //draw skills/spells button
  if(player.lvl >= 5 && (player.name == "barbarian" || player.rune == "rage" || player.name == "rogue")){
    document.getElementById("skills").classList.remove("hidden")
  }
  if((player.name == "paladin" && player.lvl >= 5) || player.rune == "spells1" || player.rune == "spells2"){
    document.getElementById("spells").classList.remove("hidden")
  }
  console.log("dooms day: "+player.doomsDay)
  //reset player speed, show enemy
  player.speed = player.speedMax
  drawPlayer()
  document.getElementById("enemy").classList.remove("hidden")
  if(player.days == (player.doomsDay-1)){
    dialogBox("the sky darkens... a shiver crawls up your spine.")
  }
// boss appearance
if(player.days >= player.doomsDay){
  boss()
document.getElementById("flee").classList.add("hidden")
  player.doomsDay += (Math.floor(Math.random()*4)+4)
  player.bkc++
}else{
  document.getElementById("flee").classList.remove("hidden")
  while(enemy.hpMax <= 0){
    enemyGenerator()
  }
enemyGenerator()
}
  drawEnemy()
  
  document.getElementById("actions").classList.remove("hidden")
  document.getElementById("events").classList.add("hidden")
  enemy.speed = enemy.speedMax
savePlayer()
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

function enemyAttack(){
  let attack = enemy.powerMax
  let dmgReducer = player.block
  document.getElementById("img").classList.remove("hit")

 //dodge chance
 let miss = false
  if(player.evade){
    let hit = Math.floor(Math.random()*100)
    let dodge = Math.floor(player.evade*100)

    if(dodge > hit){
      attack = 0
      dialogBox("Dodged!")
      miss = true
    }
  }
  //hp drain
  if(enemy.hpDrain > 0){
    enemy.hpMax += enemy.hpDrain
  }

  //thorns
  if(miss == true){
    
  }else if(enemy.magicMax > 0){
    dialogBox("the enemy uses magic")
  }
  else if(player.thorns > 0){
    enemy.hpMax -= player.thorns
    //document.getElementById("enemy").classList.add("hurt")
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
  //if(attack > 0){
    document.getElementById("img").classList.add("hit")
  //}
  player.hp -= attack
  
  // reset block to max if lower
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
let mSound = document.getElementById("monster-attack")
mSound.play()

while(enemy.speed > 0){
  enemyAttack()
  enemy.speed--
  victory()
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
      death()
    }
  }else{
    window.alert("you died! that sucks.... try again?")
death()
  }
}
enemy.speed = enemy.speedMax
player.speed = player.speedMax
drawPlayer()
}

//#endregion

//#region battle

function turnTracker(){
  let regen = equipment.indexOf("amulet of regen")

  if(player.speed < 1){
    if(regen >= 0){
      player.hp += 5
      if(player.hp > player.hpMax){
        player.hp = player.hpMax
      }
      dialogBox("your amulet heals you")
    }
    enemyTurn()
    turn++
    drawPlayer()
    dialogBox("turn: "+turn)
  }
}

function victory(){
  let magicRegen = equipment.indexOf("magic staff")
  if (enemy.hpMax <= 0){
    player.exp += (enemy.lvl+player.expBoost)
    if(player.expBoost >= Math.floor(player.lvl*2)){
    }else{
      player.expBoost++
    }

      if(magicRegen >= 0 && player.magic < player.magicMax){
        player.magic++
        dialogBox("your staff restores some of your magic")
      }

    //rage reset
    player.power = 0
    document.getElementById("block").classList.remove("hidden")
    document.getElementById("flee").classList.remove("hidden")
    player.defense = 0
    turn = 0
    dialogBox("Victory!")
    lvlUp()
    player.speed = player.speedMax
    document.getElementById("enemy").classList.add("hidden")
    document.getElementById("events").classList.remove("hidden")
    document.getElementById("actions").classList.add("hidden")
    looting()
    savePlayer()
    enemyGenerator()
  }
  
}

function lvlUp(){
  
  if((player.name == "rogue" && player.exp >= player.expMax && player.lvl == 0)){
    player.lvl++
    player.evade *= 1.3
    player.hpMax += 3
    player.hp += 3
    player.expMax *= 2
    player.hpDrain++
    dialogBox("you leveled up!")
  }else if((player.name == "rogue" && player.exp >= player.expMax && player.lvl >= 0)){
    player.lvl++
    player.hpMax += (3 * player.lvl)
    player.hp += (3 * player.lvl)
    player.expMax *= 2
    dialogBox("you leveled up!")
    if((player.lvl % 2)){
      player.evade *= 1.3
    }
    if((player.lvl % 5) == 0){
      player.defenseMax += 1
      player.powerMax += 1
      player.speed += 1
      player.hpDrain++
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
    player.thorns++
    dialogBox("you leveled up!")
  }else if((player.name == "paladin" && player.exp >= player.expMax && player.lvl > 0)){
    player.lvl++
    player.defenseMax++
    player.hpMax += (4 * player.lvl)
    player.hp += (4 * player.lvl)
    player.expMax *= 2
    dialogBox("you leveled up!")
    if((player.lvl % 3) == 0){
      thorns++
    }
      if((player.lvl % 5) == 0){
      player.speedMax += 1
      player.powerMax += 1
      player.magicMax++
      player.magic++
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
  let chance = Math.floor(Math.random()*100)+1
  gold *= enemy.lvl

  if(enemy.name == "demon"){
    document.getElementById("img").classList.add("m1")
    player.gold += 2000
    equipment.push("green stone")
    player.m1 = true
    dialogBox("the demon lets out the most heinous scream and bursts into flames as a portal opens up and engoulfs it, all that is left behind is a mysterious green stone")
  }
  if(enemy.name == "demon king"){
    document.getElementById("img").classList.add("m2")
    player.gold += 5000
    equipment.push("blue stone")
    player.m2 = true
    dialogBox("the demon lets out the most heinous scream and bursts into flames as a portal opens up and engoulfs it, all that is left behind is a mysterious blue stone")
  }
  if(enemy.name == "demon god"){
    document.getElementById("img").classList.add("m3")
    player.gold += 10000
    equipment.push("yellow stone")
    player.m3 = true
    dialogBox("the demon lets out the most heinous scream and bursts into flames as a portal opens up and engoulfs it, all that is left behind is a mysterious yellow stone")
  }

  if(enemy.title == "boss"){
    equipment.push(rareItem)
    equipment.push(item)
    player.gold += gold
    dialogBox("you got a RARE "+rareItem)
    dialogBox("you got a "+item)
    dialogBox("you got gold: "+gold)
  }
if(enemy.name == "unicorn"){
  equipment = []
  savePlayer()
dialogBox("What have you done! you killed a unicorn! the magic of the unicorn curses you, just like you deserve you horrible person.")
}else{
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
}

  gold = Math.floor(Math.random()*12)+1
}
//#endregion
  document.getElementById("theme-music").volume = 0.5;

  
  if(player.m3 == true){
    document.getElementById("img").classList.add("m3")
  }  else if(player.m2 == true){
    document.getElementById("img").classList.add("m2")
  } else if(player.m1 == true){
    document.getElementById("img").classList.add("m1")
  }
  
  loadPlayer()
  drawPlayer()