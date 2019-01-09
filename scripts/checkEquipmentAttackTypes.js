const fs = require('fs');


let equipmentList = fs.readFileSync("../allEquipmentStats.json", {"encoding":"utf8"});
let equipmentJSON = JSON.parse(equipmentList);

for (key in equipmentJSON.weapon) {
  if(!('attackoptions' in equipmentJSON.weapon[key])) {
    console.log(equipmentJSON.weapon[key].name)
  }
}
