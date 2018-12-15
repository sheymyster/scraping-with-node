const fs = require('fs');




let headGear = parseEquippableItemStats('head');

function parseEquippableItemStats(gearSlotName) {
  let contentsOfFile = fs.readFileSync("./gearRawTextFiles/" + gearSlotName + "SlotGear.txt", {"encoding":"utf8"});
  let itemObjects = {};
  let lines = contentsOfFile.split("\r\n");
  let i;
  let len = lines.length;
  for (i=0; i<len; i+3) {
    let newItemObject = {};
    newItemObject['name'] = lines[i];
    if (lines[i+1].includes('members')) {
      newItemObject['members'] = true
    } else {
      newItemObject['members'] = false
    }
    let j;
    let statsline = lines[i+2];
    statsline.split("\t");
    newItemObject['stabatt'] = statsline[0];
    newItemObject['slashatt'] = statsline[1];
    newItemObject['crushatt'] = statsline[2];
    newItemObject['magicatt'] = statsline[3];
    newItemObject['rangeatt'] = statsline[4];
    newItemObject['stabdef'] = statsline[5];
    newItemObject['slashdef'] = statsline[6];
    newItemObject['crushdef'] = statsline[7];
    newItemObject['magicdef'] = statsline[8];
    newItemObject['rangedef'] = statsline[9];
    newItemObject['strengthbonus'] = statsline[10];
    newItemObject['rangestrengthbonus'] = statsline[11];
    newItemObject['magicdamage'] = statsline[12];
    newItemObject['prayerbonus'] = statsline[13];
    itemObjects[lines[i]] = newItemObject;
  }
  console.log(itemObjects);
};
