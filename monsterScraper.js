const request = require('request');
const fs = require('fs');










var arrayOfArrays = parsePagesOfMonsters();
console.log(arrayOfArrays);
var masterMonsterList = [].concat.apply([], arrayOfArrays);
writeMonstersToFile();



function parsePagesOfMonsters() {
  var allMonsterLists = [];
  let i;
  let len = 10;
  for (i=0; i<len; i++) {
    let url = 'https://oldschool.runescape.wiki/w/Bestiary/Levels_'+(1+(i*10))+'_to_'+((i+1)*10)+'?action=raw';
    request(url, function(error, response, body) {
      let data = JSON.stringify(body);
      let newSectionOfMonsters = handleMonsterNames(data);
      console.log(newSectionOfMonsters);
      allMonsterLists.push(newSectionOfMonsters);
      }
    );
  }
  return allMonsterLists;
};

function writeMonstersToFile() {
  let dataForFile = JSON.stringify(masterMonsterList, null, 2);
  fs.writeFileSync('monsterList.json', dataForFile);
};


function handleMonsterNames(string) {
    let rows = string.split('\\n');

    let monsterNames = [];
    let i;
    let len = rows.length;
    for (i=0; i<len; i++) {
      if (rows[i].includes('*')) {
        let name = rows[i].slice(rows[i].indexOf('[[')+2, rows[i].indexOf(']]'));
        monsterNames.push(name);
      }
    };
    return monsterNames;
}
