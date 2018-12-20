const fs = require('fs');


let osrsDBitemdump = fs.readFileSync("./allItemData.json", {"encoding":"utf8"});
let itemdumpjson = JSON.parse(osrsDBitemdump);

let equipmentstats = fs.readFileSync("./allEquipmentStats.json", {"encoding":"utf8"});
let equipmentstatsjson = JSON.parse(equipmentstats);

let newItemList = {};
let itemIDs = Object.keys(itemdumpjson);
let i;
let len = itemIDs.length;
for (i=0; i<len; i++) {
  if (itemdumpjson[itemIDs[i]].equipable === true && (itemdumpjson[itemIDs[i]].equipment.slot === "weapon" || itemdumpjson[itemIDs[i]].equipment.slot === "2h")) {
    let itemObject = {};
    itemObject.name = itemdumpjson[itemIDs[i]].name;
    itemObject.attackspeed = itemdumpjson[itemIDs[i]].equipment.attack_speed;
    itemObject.id = itemdumpjson[itemIDs[i]].id;
    newItemList[itemIDs[i]] = itemObject;
  }
}

fs.writeFileSync('itemAttackSpeeds.json', JSON.stringify(newItemList, null, 2));
