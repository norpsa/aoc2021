import { readFileSync } from 'fs';

console.time("day18");

let data = [];

const parsePair = (child, depth) => {
    if(!Array.isArray(child)) {
        return child;
    } else {
        return { left: parsePair(child[0], depth + 1), right: parsePair(child[1], depth + 1), depth: depth + 1 };
    }
}

readFileSync('input_day18.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split(''));
});

const addOneToAllDepths = (pair) => {
    let newPair = Object.assign({}, pair);
    newPair.depth = pair.depth + 1;
    if(!Number.isInteger(pair.left)) {
        newPair.left = addOneToAllDepths(pair.left);
    }

    if(!Number.isInteger(pair.right)) {
        newPair.right = addOneToAllDepths(pair.right);
    }
    return newPair;
}

const addTwoPairs = (left, right) => {
    return { left: addOneToAllDepths(left), right: addOneToAllDepths(right), depth: 0 };
}

const explode = (pair, parent) => {
    console.log("EXPLODE");
    console.log(pair);
    return true;
}

const split = (value, parentDepth) => {
    return { left: Math.floor(value / 2), right: Math.ceil(value / 2), depth: parentDepth + 1 };
}

const checkIfExplodesAndExplode = (pair, parent) => {
    console.log(pair);
    if(Number.isInteger(pair)) {
        if(!Number.isInteger(parent.right)) {
            return checkIfExplodesAndExplode(parent.right);
        }
        return false;
    }
    if(pair.depth === 4) {
        return explode(pair, parent);
    } else if (Number.isInteger(pair.left) && Number.isInteger(pair.right)){
        if(parent && !Number.isInteger(parent.right)) {
            return checkIfExplodesAndExplode(parent.right);
        }
        return false;
    }
    let explodes = checkIfExplodesAndExplode(pair.left, pair);
    if(!explodes) {
        explodes = checkIfExplodesAndExplode(pair.right, pair);
    }

    return explodes;
}

const reduceGraph = (pair) => {
    let explodes = checkIfExplodesAndExplode(pair, null);
    console.log(explodes);
}

const explodeString = (reducedPair, index) => {
    console.log(reducedPair);
    let leftValue = reducedPair[index + 1];
    let rightValue = reducedPair[index + 3];
    console.log(rightValue, leftValue);

    let newString = "";

    let i = index - 1;
    let foundValue = false;
    while(i > 0 && !foundValue) {
        if(Number.isInteger(parseInt(reducedPair[i]))) {
            foundValue = true;
            newString = reducedPair.substr(0, i);
            let newValue = parseInt(leftValue) + parseInt(reducedPair[i]);
            newString = newString + newValue.toString();
            newString = newString + reducedPair.substr(i + 1, index - i - 1);
        }
        i--;
    }

    if(!foundValue) {
        newString = reducedPair.substr(0, index);
    }

    newString = newString + "0";

    i = index + 5;
    foundValue = false;
    while(i < reducedPair.length) {
        if(!foundValue && Number.isInteger(parseInt(reducedPair[i]))) {
            let newValue = parseInt(rightValue) + parseInt(reducedPair[i]);
            newString = newString + newValue.toString();
            foundValue = true;
        } else {
            newString = newString + reducedPair[i];
        }
        i++;
    }

    return newString;
}

const explodeArray = (reducedPair, index) => {
    let leftValue = reducedPair[index + 1];
    let rightValue = reducedPair[index + 3];

    let newArray = [];

    let i = index - 1;
    let foundValue = false;
    while(i > 0 && !foundValue) {
        if(Number.isInteger(parseInt(reducedPair[i]))) {
            foundValue = true;
            newArray = reducedPair.slice(0, i);
            let newValue = parseInt(leftValue) + parseInt(reducedPair[i]);
            newArray.push(newValue.toString());
            reducedPair.slice(i + 1, index).forEach(a => newArray.push(a));
        }
        i--;
    }

    if(!foundValue) {
        newArray = reducedPair.slice(0, index);
    }

    newArray.push("0");

    i = index + 5;
    foundValue = false;
    while(i < reducedPair.length) {
        if(!foundValue && Number.isInteger(parseInt(reducedPair[i]))) {
            let newValue = parseInt(rightValue) + parseInt(reducedPair[i]);
            newArray.push(newValue.toString());
            foundValue = true;
        } else {
            newArray.push(reducedPair[i]);
        }
        i++;
    }

    return newArray;
}

const splitString = (pair, index) => {
    let newString = "";

    let valueToSplit = parseInt(pair.substr(index, 2));
    let left = Math.floor(valueToSplit / 2);
    let right = Math.ceil(valueToSplit / 2);

    newString = pair.substr(0, index) + "[";
    newString = newString + left.toString() + "," + right.toString() + "]";
    newString = newString + pair.substr(index + 2, pair.length - index - 2);

    return newString;

}

const splitArray = (pair, index) => {
    let newArray = [];

    let valueToSplit = parseInt(pair[index]);
    let left = Math.floor(valueToSplit / 2);
    let right = Math.ceil(valueToSplit / 2);

    pair.slice(0, index).forEach(a => newArray.push(a));
    newArray.push("[");
    newArray.push(left.toString());
    newArray.push(",");
    newArray.push(right.toString());
    newArray.push("]");
    pair.slice(index + 1, pair.length).forEach(a => newArray.push(a));
    return newArray;

}

const reduce = (pair) => {
    let index = 0;
    let reducedPair = pair;
    let openCount = 0;
    let exploded = false;
    while(index < reducedPair.length && !exploded) {
        let char = reducedPair[index];
        index++;
        if(char === "[") {
            openCount++;
        } else if(char === "]") {
            openCount--;
        }

        if(openCount === 5) {
            reducedPair = explodeArray(reducedPair, index - 1);
            exploded = true;
        }
    }

    index = 0;

    let split = false;

    while(index < reducedPair.length && !split && !exploded) {
        let char = reducedPair[index];
        index++;
        if(parseInt(char) && parseInt(char) > 9) {
            reducedPair = splitArray(reducedPair, index - 1);
            split = true;
        }
    }
    return reducedPair;
}

const addPairs = (pair1, pair2) => {
    let newArray = ["["];
    pair1.forEach(a => newArray.push(a));
    newArray.push(",");
    pair2.forEach(a => newArray.push(a))
    newArray.push("]");
    return newArray;
}

const magnitude = (pair, prevMagnitude) => {
    if(!Array.isArray(pair[0]) && !Array.isArray(pair[1])) {
        return prevMagnitude + 3*parseInt(pair[0]) + 2*parseInt(pair[1]);
    } else if(!Array.isArray(pair[0])) {
        return prevMagnitude + 3*parseInt(pair[0]) + 2*magnitude(pair[1], prevMagnitude);
    } else if(!Array.isArray(pair[1])) {
        return prevMagnitude + 3*magnitude(pair[0], prevMagnitude) + 2*parseInt(pair[1]);
    }
    return prevMagnitude + 3*magnitude(pair[0], prevMagnitude) + 2*magnitude(pair[1], prevMagnitude);
}


// PART 1
let pairToReduce  = data[0];

// Merge pairs
for(let i = 1; i < data.length; i++) {
    let reduced = true;
    pairToReduce = addPairs(pairToReduce, data[i]);;
    let prevResult = "";
    let count = 0;
    while(reduced) {
        count++;
        prevResult = pairToReduce;
        pairToReduce = reduce(pairToReduce);
        if(prevResult === pairToReduce) {
            reduced = false;
        }
    }
}

const endResult = JSON.parse(pairToReduce.join(''));

console.log(magnitude(endResult, 0)); 

// PART 2
let largestMagnitude = 0;

for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data.length; j++) {
        if(i !== j){
            let reduced = true;
            pairToReduce = addPairs(data[i], data[j]);;
            let prevResult = "";
            let count = 0;
            while(reduced) {
                count++;
                prevResult = pairToReduce;
                pairToReduce = reduce(pairToReduce);
                if(prevResult === pairToReduce) {
                    reduced = false;
                }
            }

            const endResult = JSON.parse(pairToReduce.join(''));

            const result  = magnitude(endResult, 0);
            if(result > largestMagnitude) {
                largestMagnitude = result;
            }
        }
    }
}

console.log("PART 2", largestMagnitude);


console.timeEnd("day18");

