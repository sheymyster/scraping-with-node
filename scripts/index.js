const Promise = require("bluebird");
const request = Promise.promisifyAll(require("request"), {multiArgs: true});
const fs = require('fs');
const async = require('async');

const pets = require('../RAW/pets');
const tertiaryDrops = require('../RAW/tertiaryDrops');
const listOfMonsterLinks = fs.readFileSync('../RAW/monsterLinks.js');

let linksJSON = JSON.parse(listOfMonsterLinks);
let testLinks = [];
for (let k=600; k<linksJSON.links.length; k++) {
  testLinks.push(linksJSON.links[k]);
};

let testList = [
'https://oldschool.runescape.wiki/w/Fire_giant?action=raw',
'https://oldschool.runescape.wiki/w/Hill_Giant?action=raw',
'https://oldschool.runescape.wiki/w/Vorkath?action=raw',
'https://oldschool.runescape.wiki/w/Abyssal_demon?action=raw',
'https://oldschool.runescape.wiki/w/Wolf?action=raw'
];

let petList = pets.pets;
let extraDropsList = tertiaryDrops.tertiaryDrops;


let allNPCdata = {};

Promise.map(testLinks, function(url) {
    return request.getAsync(url).spread(function(response,body) {
        return {data: JSON.stringify(body), url: url};
    });
}).then(function(results) {
    for (let i=0; i<results.length; i++) {
      let npcData = handleMonsterData(results[i].data);
      let npcURL = results[i].url;
      let npcName = npcURL.slice(npcURL.indexOf('https://oldschool.runescape.wiki/w/')+35, npcURL.indexOf('?action=raw'));
      allNPCdata[npcName] = npcData;
    }
    let dataForFile = JSON.stringify(allNPCdata, null, 2);
    fs.appendFileSync('../RAW/allNPCdata.json', dataForFile);
}).catch(function(err) {
     console.log(err);
});

function handleMonsterData(data) {
  let fullMonsterData = {};
  let parseMonsterDropsResult = parseMonsterDrops(data);
  fullMonsterData.drops = parseMonsterDropsResult.drops;
  let monsterStatsString = data.slice(data.indexOf("{{Infobox Monster")+20, data.indexOf("|mbns = 0")-2);
  let parsedStats = parseMonsterStats(monsterStatsString);
  fullMonsterData.versions = parsedStats;
  return fullMonsterData;
};

function parseMonsterStats(string) {
  let allVersionStats = {};
  let lines = string.split("|");
  let statsObject = {};
  var len = lines.length;
  for (let i=0; i<len; i++) {
    let lineProp = lines[i].split("=");
    let propName = lineProp[0].trim();
    let propValue;
    if (lineProp[1]){
      propValue = lineProp[1].trim().replace('\\n', '');
    }
    if (!isNaN(propValue)) {
      propValue = parseInt(propValue, 10);
    }
    statsObject[propName] = propValue;
  }
  let attributeList = ['combat', 'hitpoints', 'immunepoison', 'immunevenom', 'att', 'def',
    'str', 'mage', 'range', 'astab', 'aslash', 'acrush', 'amagic', 'arange', 'dstab', 'dslash', 'dcrush',
    'dmagic', 'drange', 'attbns', 'strbns', 'rngbns'];
  if (statsObject.hasOwnProperty('version1')) {
    for (let i=1; i<6; i++) {
      let versionObject = {};
      if (statsObject.hasOwnProperty('version' + i)) {
        for (let j=0; j<attributeList.length; j++) {
          if (statsObject.hasOwnProperty(attributeList[j] + i)) {
            versionObject[attributeList[j]] = statsObject[attributeList[j] + i];
          } else {
            versionObject[attributeList[j]] = statsObject[attributeList[j]];
          }
        }
        allVersionStats[statsObject['version' + i]] = versionObject;
      }
    }
  } else {
    let versionObject = {};
    for (let j=0; j<attributeList.length; j++) {
      versionObject[attributeList[j]] = statsObject[attributeList[j]];
    }
    allVersionStats['Lv ' + statsObject.combat] = versionObject;
  }
  return (allVersionStats);
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
