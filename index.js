const request = require('request');
const dataExample = require('./data');

let url = `https://oldschool.runescape.wiki/w/Vorkath?action=raw`
let exampledata = JSON.stringify(dataExample.dataExample);
let petList = ["Abyssal orphan", "Baby mole", "Callisto cub", "Hellpuppy", "Kalphite princess", "Noon", "Midnight", "Olmlet", "Pet chaos elemental", "Pet dagannoth prime", "Pet dagannoth supreme",
"Pet dagannoth rex", "Pet dark core", "Pet general graardor", "Pet k'ril tsutsaroth", "Pet kraken", "Pet kree'arra", "Pet smoke devil", "Pet zilyana", "Pet snakeling", "Prince black dragon",
"Scorpia's offspring", "Skotos", "Tzrek-jad", "Venenatis spiderling", "Vet'ion jr.", "Vorki"];
let extraDropsList = ["Ensouled goblin head", "Ensouled monkey head", "Ensouled imp head", "Ensouled minotaur head", "Ensouled scorpion head", "Ensouled bear head", "Ensouled unicorn head",
"Ensouled dog head", "Ensouled chaos druid head", "Ensouled giant head", "Ensouled ogre head", "Ensouled elf head", "Ensouled troll head", "Ensouled horror head", "Ensouled kalphite head",
"Ensouled dagannoth head", "Ensouled bloodveld head", "Ensouled tzhaar head", "Ensouled demon head", "Ensouled aviansie head", "Ensouled abyssal head", "Ensouled dragon head", "Long bone",
"Curved bone", "Ancient shard", "Mysterious emblem", "Clue scroll (easy)", "Clue scroll (medium)", "Clue scroll (hard)", "Clue scroll (elite)", "Clue scroll (master)", "Metamorphic dust",
"Dark totem base", "Dark totem middle", "Dark totem top", "Wolf bone", "Bat wing", "Rat bone", "Baby blue dragon bone", "Ogre ribs", "Jogre bone", "Zogre bone", "Mogre bone", "Dagannoth ribs",
"Snake spine", "Zombie bone", "Werewolf bone", "Moss giant bone", "Fire giant bone", "Ice giant ribs", "Terrorbird wing", "Ghoul bone", "Troll bone", "Seagull wing", "Undead cow ribs",
"Experiment bone", "Rabbit bone", "Basilisk bone", "Desert lizard bone", "Cave goblin skull", "Vulture wing", "Jackal bone", "Goblin skull", "Big frog leg", "Bear ribs", "Ram skull", "Unicorn bone",
"Monkey paw", "Giant rat bone", "Giant bat wing", "Imp champion scroll", "Goblin champion scroll", "Skeleton champion scroll", "Zombie champion scroll", "Giant champion scroll",
"Hobgoblin champion scroll", "Ghoul champion scroll", "Earth warrior champion scroll", "Jogre champion scroll", "Lesser demon champion scroll", "Human champion scroll", "Looting bag",
"Slayer's enchantment", "Vorkath's Head"];
request(url, function(error, response, body) {
  var data = JSON.stringify(body);
  handleMonsterData(data);
  }
);
//handleMonsterData(exampledata);


function handleMonsterData(data){
  let monsterStatsString = cutOutPortionOfText(data, "|item1=", "|text1=");
  var monsterStats = parseMonsterStats(monsterStatsString);
  var monsterDrops = parseMonsterDrops(data);
  console.log(monsterDrops);
  console.log(monsterDrops.other);
  console.log(monsterStats);

}



function cutOutPortionOfText(data, startWord, stopWord){
  let startIndex = data.indexOf(startWord) + startWord.length;
  let stopIndex = data.indexOf(stopWord);
  return (data.slice(startIndex, stopIndex));
}

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
          newItemObject.name = lineItemArray[1].replace("Name=", "");
        } else if (lineItemArray[j].includes("Quantity")) {
          newItemObject.quantity = lineItemArray[j].replace("Quantity=", "");
        }
      };
      if (newItemObject["quantity"].includes("noted")) {
        newItemObject.quantity = newItemObject["quantity"].replace(" (noted)", "");
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
        //monsterStats.raredroptable = true;
        console.log("monsterStats.raredroptable = true");
      } else {
        mainDrops.push(newItemObject);
      }
    }
  };
  let otherDrops = {};
  otherDrops.pet = JSON.parse(JSON.stringify(petDrops.slice()));
  otherDrops.tertiary = JSON.parse(JSON.stringify(extraDrops.slice()));
  let drops = {"guaranteed": guaranteedDrops.slice(), "main": mainDrops.slice(), "other": Object.assign(otherDrops)};

  return drops;
}
