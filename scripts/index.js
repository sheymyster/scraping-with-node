const request = require('request');
const fs = require('fs');

const dataExample = require('../RAW/data');
const pets = require('../RAW/pets');
const tertiaryDrops = require('../RAW/tertiaryDrops');
const listOfMonsters = require('../RAW/monsterList');

let chosenMonster = 'Bloodveld';
let url = 'https://oldschool.runescape.wiki/w/'+chosenMonster+'?action=raw'
let exampledata = JSON.stringify(dataExample.dataExample);
let petList = pets.pets;
let extraDropsList = tertiaryDrops.tertiaryDrops;

request(url, function(error, response, body) {
  var data = JSON.stringify(body);
  var monsterDataMasterList = handleMonsterData(data);
  let dataForFile = JSON.stringify(monsterDataMasterList, null, 2);
  fs.writeFileSync('../NPC/Bloodveld.json', dataForFile);
  }
);
// var monsterDataMasterList = handleMonsterData(exampledata);
// console.log(monsterDataMasterList);

function handleMonsterData(data) {
  let fullMonsterData = {};
  let parseMonsterDropsResult = parseMonsterDrops(data);
  fullMonsterData.drops = parseMonsterDropsResult.drops;
  let monsterVarianceCount = countMonsterVariants(data);
  let monsterStatsString = data.slice(data.indexOf("|item1="), data.indexOf("|text"+monsterVarianceCount+"="));
  let monsterStatsAllLevels = [];
  let i;
  let len = monsterVarianceCount;
  for (i=0; i<len; i++) {
    let statString = data.slice(data.indexOf("|item"+(i+1)+"="), data.indexOf("text"+(i+1)+"="));
    let monsterStats = parseMonsterStats(statString);
    monsterStats.raredroptable = parseMonsterDropsResult.raredroptable;
    monsterStatsAllLevels.push(monsterStats);
  };
  fullMonsterData.attributes = monsterStatsAllLevels;
  return fullMonsterData;
};

function parseMonsterStats(string) {
  let lines = string.split("\\n");
  let attributes = {};
  var len = lines.length;
  for (var i=0; i<len; i++) {
    if (lines[i].includes("|name = ")) {
      attributes.name = lines[i].split("|name = ").pop();
    } else if (lines[i].includes("|aggressive = ")) {
      attributes.aggressive = lines[i].split("|aggressive = ").pop();
    } else if (lines[i].includes("|members = ")) {
      attributes.members = lines[i].split("|members = ").pop();
    } else if (lines[i].includes("|examine = ")) {
      attributes.examine = lines[i].split("|examine = ").pop();
    } else if (lines[i].includes("|hit points = ") || lines[i].includes("|hp = ")) {
      attributes.hitpoints = lines[i].split("= ").pop();
    } else if (lines[i].includes("|combat = ") || lines[i].includes("|cb = ")) {
      attributes.combatlvl = lines[i].split("= ").pop();
    } else if (lines[i].includes("|slaylvl = ")) {
      attributes.slaylvl = parseInt(lines[i].split("|slaylvl = ").pop(), 10);
    } else if (lines[i].includes("|poisonous = ")) {
      attributes.poisonous = lines[i].split("|poisonous = ").pop();
    } else if (lines[i].includes("|combat = ")) {
      attributes.combatlvl = parseInt(lines[i].split("|combat = ").pop(), 10);
    } else if (lines[i].includes("|hit points = ")) {
      attributes.hitpoints = parseInt(lines[i].split("|hit points = ").pop(), 10);
    } else if (lines[i].includes("|max hit = ")) {
      attributes.maxhit = parseInt(lines[i].split("|max hit = ").pop(), 10);
    } else if (lines[i].includes("|immunepoison = ")) {
      attributes.immunepoison = lines[i].split("|immunepoison = ").pop();
    } else if (lines[i].includes("|immunevenom = ")) {
      attributes.immunevenom = lines[i].split("|immunevenom = ").pop();
    } else if (lines[i].includes("|att = ")) {
      attributes.attacklvl = parseInt(lines[i].split("|att = ").pop(), 10);
    } else if (lines[i].includes("|str = ")) {
      attributes.strengthlvl = parseInt(lines[i].split("|str = ").pop(), 10);
    } else if (lines[i].includes("|def = ")) {
      attributes.defenselvl = parseInt(lines[i].split("|def = ").pop(), 10);
    } else if (lines[i].includes("|mage = ")) {
      attributes.magiclvl = parseInt(lines[i].split("|mage = ").pop(), 10);
    } else if (lines[i].includes("|range = ")) {
      attributes.rangelvl = parseInt(lines[i].split("|range = ").pop(), 10);
    } else if (lines[i].includes("|astab = ")) {
      attributes.stabattack = parseInt(lines[i].split("|astab = ").pop(), 10);
    } else if (lines[i].includes("|aslash = ")) {
      attributes.slashattack = parseInt(lines[i].split("|aslash = ").pop(), 10);
    } else if (lines[i].includes("|acrush = ")) {
      attributes.crushattack = parseInt(lines[i].split("|acrush = ").pop(), 10);
    } else if (lines[i].includes("|amagic = ")) {
      attributes.magicattack = parseInt(lines[i].split("|amagic = ").pop(), 10);
    } else if (lines[i].includes("|arange = ")) {
      attributes.rangeattack = parseInt(lines[i].split("|arange = ").pop(), 10);
    } else if (lines[i].includes("|dstab = ")) {
      attributes.stabdefense = parseInt(lines[i].split("|dstab = ").pop(), 10);
    } else if (lines[i].includes("|dslash = ")) {
      attributes.slashdefense = parseInt(lines[i].split("|dslash = ").pop(), 10);
    } else if (lines[i].includes("|dcrush = ")) {
      attributes.crushdefense = parseInt(lines[i].split("|dcrush = ").pop(), 10);
    } else if (lines[i].includes("|dmagic = ")) {
      attributes.magicdefense = parseInt(lines[i].split("|dmagic = ").pop(), 10);
    } else if (lines[i].includes("|drange = ")) {
      attributes.rangedefense = parseInt(lines[i].split("|drange = ").pop(), 10);
    } else if (lines[i].includes("|strbns = ")) {
      attributes.strengthbonus = parseInt(lines[i].split("|strbns = ").pop(), 10);
    } else if (lines[i].includes("|rngbns = ")) {
      attributes.rangebonus = parseInt(lines[i].split("|rngbns = ").pop(), 10);
    } else if (lines[i].includes("|attbns = ")) {
      attributes.attackbonus = parseInt(lines[i].split("|attbns = ").pop(), 10);
    }
  }
  return (attributes);
};

function parseMonsterDrops(data) {
  let guaranteedDrops = [];
  let mainDrops = [];
  let petDrops = [];
  let extraDrops = [];
  let rareDropTable = false;
  let fullDropString = data.slice(data.indexOf("==Drops==\\n")+12, data.indexOf("\n|}\n\n<references />", data.indexOf("\\n|}\\n\\n<references />")+1));
  let lines = fullDropString.split("\\n");
  let len = lines.length;
  let i;
  for (i=0; i<len; i++) {
    if (lines[i].includes("DropsLine")){
      let lineItemArray = lines[i].split("|");
      let newItemObject = {};
      let j;
      for (j=0; j<lineItemArray.length; j++) {
        if (lineItemArray[j].includes("Name")) {
          newItemObject.name = lineItemArray[1].split("=").pop().trim();
        } else if (lineItemArray[j].includes("Quantity")) {
          newItemObject.quantity = lineItemArray[j].split("=").pop().trim();
        }
      };
      if (newItemObject["quantity"].includes("noted")) {
        newItemObject.quantity = newItemObject["quantity"].replace("(noted)", "").trim();
        newItemObject.noted = true;
      } else {
        newItemObject.noted = false;
      };
      if (lineItemArray[3].includes("Always")) {
        guaranteedDrops.push(newItemObject);
      } else if (petList.includes(newItemObject.name)) {
        petDrops.push(newItemObject);
      } else if (extraDropsList.includes(newItemObject.name)) {
        extraDrops.push(newItemObject);
      } else if (newItemObject["name"].includes("Rare drop table")) {
        rareDropTable = true;
      } else {
        mainDrops.push(newItemObject);
      }
    }
  };
  let otherDrops = {};
  otherDrops.pet = JSON.parse(JSON.stringify(petDrops.slice()));
  otherDrops.tertiary = JSON.parse(JSON.stringify(extraDrops.slice()));
  let drops = {"guaranteed": guaranteedDrops.slice(), "main": mainDrops.slice(), "other": Object.assign(otherDrops)};

  return {"drops": drops, "raredroptable": rareDropTable};
};

function countMonsterVariants(string) {
  let i;
  let n = 0;
  let len = 5;
  for (i=0; i<len; i++) {
    if (string.includes("text"+(i+1))) {
      n++;
    }
  }
  return n;
};

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
};
