const fs = require('fs');


let equipmentList = fs.readFileSync("../equipmentStatsWithAS.json", {"encoding":"utf8"});
let equipmentJSON = JSON.parse(equipmentList);

for (key in equipmentJSON.weapon) {
  if(!('attackspeed' in equipmentJSON.weapon[key])) {
    console.log(equipmentJSON.weapon[key].name)
  }
}
