const fs = require('fs');


let equipmentNames = [
  "ammo",
  "cape",
  "chest",
  "feet",
  "hand",
  "head",
  "leg",
  "neck",
  "oneHandedWeapon",
  "ring",
  "shield",
  "twoHanded"];
let allEquipmentStats = {};
for (i=0; i<equipmentNames.length; i++) {
  allEquipmentStats[equipmentNames[i]] = parseEquippableItemStats(equipmentNames[i]);
};
let dataForFile = JSON.stringify(allEquipmentStats, null, 2);
fs.writeFileSync('allEquipmentStats.json', dataForFile);

function parseEquippableItemStats(gearSlotName) {
  let contentsOfFile = fs.readFileSync("./gearRawTextFiles/" + gearSlotName + "SlotGear.txt", {"encoding":"utf8"});
  let itemObjects = {};
  let lines = contentsOfFile.split("\r\n");
  let i;
  let len = lines.length-1;
  for (i=0; i<len; i+=3) {
    let newItemObject = {};
    newItemObject['name'] = lines[i];
    if (lines[i+1].includes('Member')) {
      newItemObject['members'] = true
    } else {
      newItemObject['members'] = false
    }
    let statsLine = lines[i+2];
    let statsArray = statsLine.split("\t");
    newItemObject['stabatt'] = statsArray[0];
    newItemObject['slashatt'] = statsArray[1];
    newItemObject['crushatt'] = statsArray[2];
    newItemObject['magicatt'] = statsArray[3];
    newItemObject['rangeatt'] = statsArray[4];
    newItemObject['stabdef'] = statsArray[5];
    newItemObject['slashdef'] = statsArray[6];
    newItemObject['crushdef'] = statsArray[7];
    newItemObject['magicdef'] = statsArray[8];
    newItemObject['rangedef'] = statsArray[9];
    newItemObject['strengthbonus'] = statsArray[10];
    newItemObject['rangestrengthbonus'] = statsArray[11];
    newItemObject['magicdamage'] = statsArray[12];
    newItemObject['prayerbonus'] = statsArray[13];
    itemObjects[lines[i]] = newItemObject;
  }
  return(itemObjects);
};
