const request = require('request');
const fs = require('fs');

let contentsOfFile = fs.readFileSync("./questSkillReqList.json", {"encoding":"utf8"});
let jsonifiedContents = JSON.parse(contentsOfFile);
let i;
let n = jsonifiedContents.length;
let questNameArray = [];
for (i=0; i<n; i++) {
  questNameArray.push(jsonifiedContents[i].name);
}
let j;
let m = questNameArray.length;
let questUrlArray = [];
for (j=0; j<m; j++) {
  questUrlArray.push('https://oldschool.runescape.wiki/w/'+questNameArray[j]+'?action=raw');
}

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

async.map(questUrlArray, httpGet, function (err, res){
  if (err) return console.log(err);
  let data = JSON.stringify(res);
  let questReqs = handleQuestReqs(data);
  let questItemReqs = handleQuestItemReqs(data);
  fs.writeFileSync('monsterList.json', JSON.stringify(allMonsterNames, null, 2));
});

function handleQuestReqs(string) {
  let questReqString = string.slice()
}

function handleQuestItemReqs(string) {

}
