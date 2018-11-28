
let ensouledHeadsList = [
"Ensouled goblin head",
"Ensouled monkey head",
"Ensouled imp head",
"Ensouled minotaur head",
"Ensouled scorpion head",
"Ensouled bear head",
"Ensouled unicorn head",
"Ensouled dog head",
"Ensouled chaos druid head",
"Ensouled giant head",
"Ensouled ogre head",
"Ensouled elf head",
"Ensouled troll head",
"Ensouled horror head",
"Ensouled kalphite head",
"Ensouled dagannoth head",
"Ensouled bloodveld head",
"Ensouled tzhaar head",
"Ensouled demon head",
"Ensouled aviansie head",
"Ensouled abyssal head",
"Ensouled dragon head"];

let ragAndBoneManBones = [
"Wolf bone",
"Bat wing",
"Rat bone",
"Baby blue dragon bone",
"Ogre ribs",
"Jogre bone",
"Zogre bone",
"Mogre bone",
"Dagannoth ribs", "Snake spine",
"Zombie bone",
"Werewolf bone",
"Moss giant bone",
"Fire giant bone",
"Ice giant ribs",
"Terrorbird wing",
"Ghoul bone",
"Troll bone",
"Seagull wing",
"Undead cow ribs",
"Experiment bone",
"Rabbit bone",
"Basilisk bone",
"Desert lizard bone",
"Cave goblin skull",
"Vulture wing",
"Jackal bone",
"Goblin skull",
"Big frog leg",
"Bear ribs",
"Ram skull",
"Unicorn bone",
"Monkey paw",
"Giant rat bone",
"Giant bat wing"];

let championScrollsList = [
"Imp champion scroll",
"Goblin champion scroll",
"Skeleton champion scroll",
"Zombie champion scroll",
"Giant champion scroll",
"Hobgoblin champion scroll",
"Ghoul champion scroll",
"Earth warrior champion scroll",
"Jogre champion scroll",
"Lesser demon champion scroll",
"Human champion scroll"];

let mountableHeadsList = [
"Vorkath's Head"
];

let otherTertiaryDropsList = [
"Long bone",
"Curved bone",
"Ancient shard",
"Mysterious emblem",
"Clue scroll (easy)",
"Clue scroll (medium)",
"Clue scroll (hard)",
"Clue scroll (elite)",
"Clue scroll (master)",
"Metamorphic dust",
"Dark totem base",
"Dark totem middle",
"Dark totem top",
"Looting bag",
"Slayer's enchantment"
];

const tertiaryDrops = ensouledHeadsList.concat(ragAndBoneManBones, championScrollsList, mountableHeadsList, otherTertiaryDropsList);

module.exports = {tertiaryDrops: tertiaryDrops};
