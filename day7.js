import { readFileSync } from 'fs';

let data = [];

readFileSync('input_day7.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data = line.split(",").map(a => parseInt(a));
});

const maxValue = Math.max(...data);

const uniqueValues = data.filter((item, index) => data.indexOf(item) === index);

const range = [...Array(maxValue).keys()];

const distanceMap = new Map();

uniqueValues.map(v => {
    const distances = range.map(a => Math.abs(a - v)*(Math.abs(a - v) + 1)/2);
    distanceMap.set(v, distances);
});

let minimumValue = 1000000000;
let point = 0;

for(let i = 0; i < range.length; i++){
    let value = 0;
    for(let j = 0; j < data.length; j++){
        value += distanceMap.get(data[j])[i];
    }

    if(value < minimumValue) {
        minimumValue = value;
        point = i;
    }
}

console.log(minimumValue, point);