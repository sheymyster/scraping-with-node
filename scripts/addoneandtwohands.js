const fs = require('fs');



let attackSpeedList = fs.readFileSync("../weaponAttackSpeeds.json", {"encoding":"utf8"});
let attackSpeedJSON = JSON.parse(attackSpeedList);

let allEquipmentList = fs.readFileSync("../allEquipmentStats.json", {"encoding":"utf8"});
let equipmentJSON = JSON.parse(allEquipmentList);

let onehandedweaponkeys = Object.keys(equipmentJSON.weapon);
let twohandedweaponkeys = Object.keys(equipmentJSON.twoHanded);

let i, j;
let len_i = onehandedweaponkeys.length;
let len_j = twohandedweaponkeys.length;

for (i=0; i<len_i; i++) {
  equipmentJSON.weapon[onehandedweaponkeys[i]].hands = 1;
}

for (j=0; j<len_j; j++) {
  equipmentJSON.twoHanded[twohandedweaponkeys[j]].hands = 2;
}

fs.writeFileSync("updatedEquipmentStats.json", JSON.stringify(equipmentJSON, null, 2));
