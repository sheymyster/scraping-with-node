const fs = require('fs');


let osrsDBitemdump = fs.readFileSync("./allItemData.json", {"encoding":"utf8"});
let itemdumpjson = JSON.parse(osrsDBitemdump);

let equipmentstats = fs.readFileSync("./allEquipmentStats.json", {"encoding":"utf8"});
let equipmentstatsjson = JSON.parse(equipmentstats);



console.log(itemdumpjson[4151]);
