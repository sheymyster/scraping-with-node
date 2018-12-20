const request = require('request');
const cheerio = require('cheerio');

request("https://oldschool.runescape.wiki/w/File:Fire_giant.png", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const imageAnchor = $('#file > a').attr('href');
    console.log(imageAnchor);
  }
});
