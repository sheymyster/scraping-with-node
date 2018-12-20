const request = require('request-promise');
const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');

const monsterNamesForImages = require('./monsterList(for images)');

const testImageUrls = [
  "https://oldschool.runescape.wiki/w/File:Vorkath.png",
  "https://oldschool.runescape.wiki/w/File:Moss_giant.png",
  "https://oldschool.runescape.wiki/w/File:Bloodveld.png",
  "https://oldschool.runescape.wiki/w/File:Demonic_gorilla.png",
  "https://oldschool.runescape.wiki/w/File:Man.png"
];

let monsterImageUrls = makeMonsterUrls();

function makeMonsterUrls() {
  let urls = [];
  let k;
  let len = monsterNamesForImages.monsterNamesForImages.length;
  for (k=0; k<len; k++) {
    urls.push("https://oldschool.runescape.wiki/w/File:" + monsterNamesForImages.monsterNamesForImages[k].split(' ').join('_') + ".png")
  };
  return urls;
};


let monsterNamesAndImageUrls = {};

(async function() {
  try {

    await Promise.all(monsterImageUrls.map(async (url) => {
      try {

        const monsterHtml = await request(url);
        const $ = cheerio.load(monsterHtml);
        const parsedLink = $('#file > a').attr('href');
        let monsterName = parsedLink.slice(13, parsedLink.indexOf(".png"));
        let uniqueLink = parsedLink.slice(8, parsedLink.indexOf(".png"));
        monsterNamesAndImageUrls[monsterName] = uniqueLink;
      } catch (e) {
        console.log(url);
      }
    }));

    let dataForFile = JSON.stringify(monsterNamesAndImageUrls, null, 2);
    fs.writeFileSync('allMonsterImageLinks.json', dataForFile);


  } catch (e) {

  }
})();
