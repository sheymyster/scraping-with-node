const request = require('request');
const async = require('async');
const fs = require('fs');


const monsterUrls= [
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_1_to_10?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_11_to_20?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_21_to_30?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_31_to_40?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_41_to_50?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_51_to_60?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_61_to_70?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_71_to_80?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_81_to_90?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_91_to_100?action=raw",
  "https://oldschool.runescape.wiki/w/Bestiary/Levels_higher_than_100?action=raw"
];




function httpGet(url, callback) {
  const options = {
    url :  url
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}

async.map(monsterUrls, httpGet, function (err, res){
  if (err) return console.log(err);
  let data = JSON.stringify(res);
  let allMonsterNames = handleMonsterNames(data);
  fs.writeFileSync('monsterList.json', JSON.stringify(allMonsterNames, null, 2));
});

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
