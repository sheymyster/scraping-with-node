const fs = require('fs');

const listOfMonsters = fs.readFileSync('../RAW/monsterList(for images).json');
const monstersJSON = JSON.parse(listOfMonsters);

let monsterLinkJSON = {};
let links = [];

for(let i=0; i<monstersJSON.names.length; i++) {
  let newLink = 'https://oldschool.runescape.wiki/w/' + monstersJSON.names[i].split(" ").join("_") + '?action=raw';
  links.push(newLink);
}

monsterLinkJSON.links = links;

let dataForFile = JSON.stringify(monsterLinkJSON, null, 2);
fs.writeFileSync('../RAW/monsterLinks.json', dataForFile);
