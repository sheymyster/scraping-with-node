const fs = require('fs');



let equipmentList = fs.readFileSync("../updatedEquipmentStats.json", {"encoding":"utf8"});
let equipmentJSON = JSON.parse(equipmentList);

let attackSpeeds = fs.readFileSync("../weaponAttackSpeeds.json", {"encoding":"utf8"});
let attackspeedsJSON = JSON.parse(attackSpeeds);

let itemIDs = fs.readFileSync("../itemIDs.json", {"encoding":"utf8"});
let idJSON = JSON.parse(itemIDs);

let weaponkeys = Object.keys(equipmentJSON.weapon);

let i;
let len = weaponkeys.length;

for (i=0; i<len; i++) {
  let weaponName = weaponkeys[i];
  let weaponID = idJSON[weaponName];
  if (weaponID in attackspeedsJSON) {
    equipmentJSON.weapon[weaponName].attackspeed = attackspeedsJSON[weaponID].attackspeed;
  }
}
console.log(idJSON['Rune dagger']);
//fs.writeFileSync("../equipmentStatsWithAS.json", JSON.stringify(equipmentJSON, null, 2));
