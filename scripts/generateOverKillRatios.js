var BigNumber = require('big-number');

let finalDamagePerHit = makeRatios(4, 150);
console.log(finalDamagePerHit);



function makeRatios (maxHit, hp) {
  let finalRatios = [];
  let i;
  let newArray=[];
  for (i=0; i<hp; i++) {
    if (i < maxHit) {
      newArray.push(1);
    } else {
      newArray.push(0);
    }
  }
  finalRatios.push(newArray);
  let j;
  for (j=0; j<hp-1; j++) {
    let additionalRow = [];
    let k;
    for (k=0; k<finalRatios[j].length; k++) {
      if (k<=j) {
        additionalRow.push(0);
      } else if (k<maxHit) {
        let sectionToSum = finalRatios[j].slice(0, k);
        let sum = sectionToSum.reduce((a, b) => a + b, 0);
        additionalRow.push(sum);
      } else {
        let sectionToSum = finalRatios[j].slice(k-maxHit, k);
        let sum = sectionToSum.reduce((a, b) => a + b, 0);
        additionalRow.push(sum);
      }
    }
    finalRatios.push(additionalRow);
  }
  let len=finalRatios.length;
  let flippedArray = [];
  for (let l=0; l<len; l++) {
    let newRow = [];
    for (let m=0; m<finalRatios.length; m++) {
      newRow.push(finalRatios[m][l]);
    }
    flippedArray.push(newRow);
  }
  let targetRatios = flippedArray.pop();
  let oddsArray = [];
  let counter = 0;
  for (let q=0; q<targetRatios.length; q++) {
    let possibleOutcomes = Math.pow(maxHit, (q+1));
    let previousNumbers = finalRatios[q].splice(0, finalRatios.length-1);
    let previousSum = previousNumbers.reduce((a, b) => a + b, 0);
    let newOdd = ((possibleOutcomes-previousSum)/possibleOutcomes)-counter;
    counter += newOdd;
    oddsArray.push(newOdd);
  }
  let sumproduct = 0;
  for (let c=0; c<oddsArray.length; c++) {
    sumproduct += (c+1)*(oddsArray[c]);
  }
  let adjustForZero = (hp/sumproduct) - (1/(1+maxHit));
  return adjustForZero;
}
