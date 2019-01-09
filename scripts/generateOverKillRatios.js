const math = require('mathjs')


math.config({
    number: "BigNumber",
    precision: 200
});

console.log(calculateOverkillDamagePerHit(49, 750));

function calculateOverkillDamagePerHit(maxHit, hp) {
  let finalRatios = getFinalRatios(maxHit, hp);
  let flippedRatios = flipFinalRatios(finalRatios);
  let oddsArray = generateArrayOfOdds(finalRatios, flippedRatios, maxHit);
  let damagePerHit = calculateDPH(oddsArray, maxHit, hp);
  return damagePerHit;
}

function getFinalRatios(maxHit, hp) {
  let finalRatios = [];
  let i;
  let firstLine = [];
  for (i=0; i<hp; i++) {
    if (i < maxHit) {
      firstLine.push(1);
    } else {
      firstLine.push(0);
    }
  }
  finalRatios.push(firstLine);
  let j;
  let n = hp-1;
  for (j=0; j<n; j++) {
    let additionalLine = [];
    let k;
    let m = finalRatios[j].length;
    for (k=0; k<m; k++) {
      if (k<=j) {
        additionalLine.push(0);
      } else if (k<maxHit) {
        let sectionToSum = finalRatios[j].slice(0, k);
        let sum = sectionToSum.reduce((a, b) => a + b, 0);
        additionalLine.push(sum);
      } else {
        let sectionToSum = finalRatios[j].slice(k-maxHit, k);
        let sum = sectionToSum.reduce((a, b) => a + b, 0);
        additionalLine.push(sum);
      }
    }
    finalRatios.push(additionalLine);
  }
  return finalRatios;
}

function flipFinalRatios(finalRatios) {
  let i;
  let n = finalRatios.length;
  let flippedArray = [];
  for (i=0; i<n; i++) {
    let newRow = [];
    let j;
    let m = finalRatios.length;
    for (j=0; j<m; j++) {
      newRow.push(finalRatios[j][i]);
    }
    flippedArray.push(newRow);
  }
  return flippedArray;
}

function generateArrayOfOdds(finalRatios, flippedRatios, maxHit) {
  let targetRatios = flippedRatios.pop();
  let oddsArray = [];
  let counter = math.bignumber(0);
  let i;
  let n = targetRatios.length;
  for (i=0; i<n; i++) {
    let possibleOutcomes = math.pow(math.bignumber(maxHit), math.add(math.bignumber(i), math.bignumber(1)));
    let previousNumbers = finalRatios[i].splice(0, finalRatios.length-1);
    let previousSum = previousNumbers.reduce((a, b) => a + b, 0);
    let subOdd = math.subtract(math.bignumber(possibleOutcomes), math.bignumber(previousSum));
    let divOdd = math.divide(math.bignumber(subOdd), math.bignumber(possibleOutcomes));
    let newOdd = math.subtract(math.bignumber(divOdd), math.bignumber(counter));
    counter = math.add(math.bignumber(newOdd), math.bignumber(counter));
    oddsArray.push(newOdd);
  }
  return oddsArray;
}

function calculateDPH(oddsArray, maxHit, hp) {
  let sumproduct = math.bignumber(0);
  let i;
  let n = oddsArray.length;
  for (i=0; i<n; i++) {
    let addSum = math.add(math.bignumber(i), math.bignumber(1))
    let newSum = math.multiply(math.bignumber(addSum), oddsArray[i]);
    sumproduct = math.add(math.bignumber(newSum), math.bignumber(sumproduct));
  }
  let adjustForZero = math.eval((hp/sumproduct) * (1-(1/(1+maxHit))));
  return math.number(adjustForZero);
}

/*
function calculateOverkillDamagePerHit(maxHit, hp) {
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
  let counter = math.bignumber(0);
  for (let q=0; q<targetRatios.length; q++) {
    let possibleOutcomes = math.pow(math.bignumber(maxHit), math.add(math.bignumber(q), math.bignumber(1)));
    let previousNumbers = finalRatios[q].splice(0, finalRatios.length-1);
    let previousSum = previousNumbers.reduce((a, b) => a + b, 0);
    let subOdd = math.subtract(math.bignumber(possibleOutcomes), math.bignumber(previousSum));
    let divOdd = math.divide(math.bignumber(subOdd), math.bignumber(possibleOutcomes));
    let newOdd = math.subtract(math.bignumber(divOdd), math.bignumber(counter));
    counter = math.add(math.bignumber(newOdd), math.bignumber(counter));
    oddsArray.push(newOdd);
  }
  let sumproduct = math.bignumber(0);
  for (let c=0; c<oddsArray.length; c++) {
    let addSum = math.add(math.bignumber(c), math.bignumber(1))
    let newSum = math.multiply(math.bignumber(addSum), oddsArray[c]);
    sumproduct = math.add(math.bignumber(newSum), math.bignumber(sumproduct));
  }
  let adjustForZero = math.eval((hp/sumproduct) * (1-(1/(1+maxHit))));

  return math.number(adjustForZero);
}
*/
