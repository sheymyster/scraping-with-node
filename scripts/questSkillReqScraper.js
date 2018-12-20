const request = require('request');
const fs = require('fs');

let url = 'https://oldschool.runescape.wiki/w/Quests/Requirements?action=raw';

request(url, function(error, response, body) {
  let data = JSON.stringify(body);
  let questLines = data.split('\\n');
  let i;
  let n = questLines.length;
  let questSkillReqObjectArray = [];
  for (i=0; i<n; i++) {
    let lineSections = questLines[i].split("||");
    let questSkillReqObject = {};
    if (lineSections[0].includes("|[[") && !lineSections[0].includes("Dragon Slayer II") && !lineSections[0].includes("Galvek")) {
      questSkillReqObject.name = lineSections[0].slice(lineSections[0].indexOf("|[[")+3, lineSections[0].indexOf("]]"));
      let skillReqLines = lineSections[1].split("{{*}}");
      let j;
      let questSkillArray = [];
      let m = skillReqLines.length;
      for (j=0; j<m; j++) {
        let questSkillObject = {};
        if (skillReqLines[j].length>5) {
          questSkillObject.statname = skillReqLines[j].split("|")[1];
          let parsedStatValue = skillReqLines[j].split("|")[2];
          questSkillObject.statvalue = parseInt(parsedStatValue, 10);
          questSkillArray.push(questSkillObject);
        }
      }
      questSkillReqObject.skillreqs = questSkillArray;
      questSkillReqObjectArray.push(questSkillReqObject);
    }
  }
  fs.writeFileSync('questSkillReqList.json', JSON.stringify(questSkillReqObjectArray, null, 2));
});
