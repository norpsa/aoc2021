import { readFileSync } from 'fs';

let data = [];

readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(parseInt(line));
});

// Part 1
let count_increased = 0;

for(let i = 1; i < data.length; i++) {
    if(data[i] > data[i - 1]) {
        count_increased++;
    }
}

console.log(count_increased);

// Part 2
let dataSums = [];

for(let i = 2; i < data.length; i++) {
    dataSums.push(data[i] + data[i - 1] + data[i - 2]);
}

let count_increased_sums = 0;

for(let i = 1; i < dataSums.length; i++) {
    if(dataSums[i] > dataSums[i - 1]) {
        count_increased_sums++;
    }
}

console.log(count_increased_sums);