// Soldier
function Soldier(health, strength) {
  this.health = health;
  this.strength = strength;
};

Soldier.prototype.attack = function (){
   return this.strength;
};

Soldier.prototype.receiveDamage = function(damage) {
  this.health = this.health - damage; 
};

// Viking
function Viking(name, health, strength) {
  Soldier.call(this, health, strength);
  this.name = name;
};

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function(damage){
  this.health = this.health - damage;
  
  if(this.health){
    return  this.name + " has received " + damage + " points of damage";
  };
  return this.name + " has died in act of combat";
};

Viking.prototype.battleCry = function(){
  return "Odin Owns You All!";
};

// Saxon
function Saxon(health, strength) {
  Soldier.call(this, health, strength);
};

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function(damage){
  this.health = this.health - damage;
  
  if(this.health){
    return  "A Saxon has received "+ damage + " points of damage";
  };
  return "A Saxon has died in combat";
};

// War
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
};

War.prototype.addViking = function(viking){
  this.vikingArmy.push(viking);
};

War.prototype.addSaxon = function(saxon){
  this.saxonArmy.push(saxon);
};

War.prototype.vikingAttack = function(){
  var randomSaxonIndex = Math.floor(Math.random()* this.saxonArmy.length);
  var randoVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  this.saxonArmy[randomSaxonIndex].receiveDamage(this.vikingArmy[randoVikingIndex].strength);
  if(this.saxonArmy[randomSaxonIndex].health <= 0){
    this.saxonArmy.splice(randomSaxonIndex, 1);
    return "A Saxon has died in combat";
  };
};

War.prototype.saxonAttack = function(){
  var randomSaxonIndex = Math.floor(Math.random()* this.saxonArmy.length);
  var randoVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  this.vikingArmy[randoVikingIndex].receiveDamage(this.saxonArmy[randomSaxonIndex].strength);
  if(this.vikingArmy[randoVikingIndex].health <= 0){
    this.vikingArmy.splice(randoVikingIndex, 1);
  };
  return this.vikingArmy[randoVikingIndex].name + " has received " + this.saxonArmy[randomSaxonIndex].strength + " points of damage";
};

War.prototype.showStatus = function(){
  if(this.saxonArmy.length === 0){
    return "Vikings have won the war of the century!";
  }else if(this.saxonArmy.length !== 0){
    return "Saxons have fought for their lives and survive another day...";
  } else{
    return "Vikings and Saxons are still in the thick of battle.";
  }
};