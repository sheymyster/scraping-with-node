const fs = require('fs');



let osrsDBitemdump = fs.readFileSync("../allItemData.json", {"encoding":"utf8"});
let itemdumpjson = JSON.parse(osrsDBitemdump);
let iddump = Object.keys(itemdumpjson);

let allItemIDs = {};

let i;
let len = iddump.length;
for (i=0; i<len; i++) {
  if (!(itemdumpjson[iddump[i]].name in allItemIDs)) {
    let name = itemdumpjson[iddump[i]].name;
    let id = iddump[i];
    allItemIDs[name] = id;
  } else if ((itemdumpjson[iddump[i]].name in allItemIDs) &&
            (!((itemdumpjson[iddump[i]].name+ " (noted)") in allItemIDs)) &&
            (itemdumpjson[iddump[i]].noted === true)) {
    let name = itemdumpjson[iddump[i]].name+ " (noted)";
    let id = iddump[i];
    allItemIDs[name] = id;
  }
}

fs.writeFileSync("itemIDs", JSON.stringify(allItemIDs, null, 2))
