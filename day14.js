import { readFileSync } from 'fs';
console.time("day14");

let input;

let counter = 0;

let pairs = new Map();

readFileSync('input_day14.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(counter === 0){
        input = line.split('');
        counter++;
    } else if(!!line) {
        let parts = line.split(" -> ");
        pairs.set(parts[0], parts[1]);
    }
});

const polymerize = (input) => {
    let charsToAdd = [];
    for(let i = 0; i < input.length - 1; i++){
        let pair = input[i] + input[i + 1];
        charsToAdd.push(pairs.get(pair));
    }

    let output = [input[0]];
    for(let i = 0; i < charsToAdd.length; i++) {
        output.push(charsToAdd[i]);
        output.push(input[i + 1]);
    }
    return output;
}

const getPairsForPair = (result) => {
    let pairsAfter20 = new Map();
    for(let i = 0; i < result.length - 1; i++) {
        let pair = result[i] + result[i +1];
        let oldValue = pairsAfter20.get(pair) ? pairsAfter20.get(pair) : 0;
        pairsAfter20.set(pair, oldValue + 1);
    }
    return pairsAfter20;
}

let allPairsAfterOneRound = new Map();
let possiblePairs = [...pairs.keys()];
for(let j = 0; j < possiblePairs.length; j++) {
    let pair = possiblePairs[j];
    let output = pair;
    output = polymerize(output);
    allPairsAfterOneRound.set(pair, getPairsForPair(output));
}

let pairsAfterPolymerization = new Map();
for(let i = 0; i < input.length -1; i++) {
    let pair = input[i] + input[i + 1];
    let pairsForPair = allPairsAfterOneRound.get(pair);
    for(let j = 0; j < possiblePairs.length; j++) {
        pairsAfterPolymerization.get(possiblePairs[j]);
        let oldValue = pairsAfterPolymerization.get(possiblePairs[j]) ? pairsAfterPolymerization.get(possiblePairs[j]) : 0;
        let addedAmount = pairsForPair.get(possiblePairs[j]) ? pairsForPair.get(possiblePairs[j]) : 0;
        pairsAfterPolymerization.set(possiblePairs[j], oldValue + addedAmount);
    }
}    

for(let x = 0; x < 39; x++){
    let newData = new Map();
    for(let i = 0; i < possiblePairs.length; i++){
        let amountOfPairs = pairsAfterPolymerization.get(possiblePairs[i]);
        let pairsForPair = allPairsAfterOneRound.get(possiblePairs[i]);
        for(let j = 0; j < possiblePairs.length; j++) {
            let pairsToCome = pairsForPair.get(possiblePairs[j]) ? pairsForPair.get(possiblePairs[j]) : 0;
            let addedAmount = amountOfPairs*pairsToCome;
            let oldValue = newData.get(possiblePairs[j]) ? newData.get(possiblePairs[j]) : 0;
            newData.set(possiblePairs[j], oldValue + addedAmount);
        }
    }
    pairsAfterPolymerization = newData;
}

let letters = new Set();
for(let i = 0; i < possiblePairs.length; i++) {
    possiblePairs[i].split('').forEach(a => letters.add(a));
}

let letterCounts = new Map();
letters.forEach(letter => {
    for(let i = 0; i < possiblePairs.length; i++) {
        if(possiblePairs[i].includes(letter)) {
            let oldValue = letterCounts.get(letter) ? letterCounts.get(letter) : 0;
            let double = possiblePairs[i].includes(letter + letter) ? 2 : 1;
            letterCounts.set(letter, oldValue + pairsAfterPolymerization.get(possiblePairs[i])*double);
        }
    }
    if(letter === input[0] || letter === input[input.length - 1]) {
        letterCounts.set(letter, letterCounts.get(letter) + 1);
    }
    letterCounts.set(letter, letterCounts.get(letter) / 2);
});

const max = Math.max(...letterCounts.values());
const min = Math.min(...letterCounts.values());

console.log(max - min);

console.timeEnd("day14");