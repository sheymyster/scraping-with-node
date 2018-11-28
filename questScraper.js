const request = require('request');
const fs = require('fs');




var baseQuestObjects = parseBaseQuestData();
var questObjectsWithReqs = addQuestRequirements(baseQuestObjects);
//var questObjectsWithRewards = addQuestRewards(questObjectsWithReqs);

function parseBaseQuestData() {
  let contentsOfFile = fs.readFileSync("./questRawData.txt", {"encoding":"utf8"});
  let questObjectArray = [];
  let lines = contentsOfFile.split("\r\n");
  let i;
  let n = lines.length;
  for (i=0; i<n; i++) {
    let questProps = lines[i].split('\t');
    let questObject = {};
    questObject.name = questProps[0];
    if (questProps[1]=="No") {
      questObject.members = false;
      questObject.difficulty = questProps[2];
      questObject.length = questProps[3];
      questObject.questpoints = parseInt(questProps[4], 10);
      questObjectArray.push(questObject);
    } else {
    questObject.members = true;
    questObject.difficulty = questProps[1];
    questObject.length = questProps[2];
    questObject.questpoints = parseInt(questProps[3], 10);
    questObjectArray.push(questObject);
    }
  }
  return questObjectArray;
}

function addQuestRequirements(arrayOfQuestObjects) {

}
