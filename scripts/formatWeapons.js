const fs = require('fs');



let equipmentList = fs.readFileSync("../allEquipmentStats.json", {"encoding":"utf8"});
let equipmentJSON = JSON.parse(equipmentList);


let categoryKeys = Object.keys(equipmentJSON);
let i;
let n = categoryKeys.length;
for (i=0; i<n; i++) {
  let itemKeys = Object.keys(equipmentJSON[categoryKeys[i]]);
  let j;
  let m = itemKeys.length;
  for (j=0; j<m; j++) {
    equipmentJSON[categoryKeys[i]][itemKeys[j]].slashatt = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].slashatt, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].stabatt = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].stabatt, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].crushatt = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].crushatt, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].magicatt = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].magicatt, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].rangeatt = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].rangeatt, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].stabdef = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].stabdef, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].slashdef = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].slashdef, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].crushdef = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].crushdef, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].magicdef = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].magicdef, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].rangedef = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].rangedef, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].strengthbonus = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].strengthbonus, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].rangestrengthbonus = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].rangestrengthbonus, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].magicdamage = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].magicdamage, 10);
    equipmentJSON[categoryKeys[i]][itemKeys[j]].prayerbonus = parseInt(equipmentJSON[categoryKeys[i]][itemKeys[j]].prayerbonus, 10);
  }
}

fs.writeFileSync("../allEquipmentStats2.json", JSON.stringify(equipmentJSON, null, 2));





/*let n = weaponkeys.length;
for (i=0; i<n; i++) {
  if (!('combattype' in equipmentJSON.weapon[weaponkeys[i]])) {
    equipmentJSON.weapon[weaponkeys[i]].combattype = "melee";
  }
}

fs.writeFileSync("../allEquipmentStats2.json", JSON.stringify(equipmentJSON, null, 2));
*/
