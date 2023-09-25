import { readFileSync } from 'fs';

let data = [];

readFileSync('input_day3.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line);
});

// PART 1
const numbers = data.map(a => [...a]).reduce((prevValue, curValue) => prevValue.map((num, idx) => parseInt(num) + parseInt(curValue[idx]))
, new Array(data[0].length).fill(0));

const gamma = parseInt(numbers.map(a => a > data.length/2 ? 1 : 0).join(''), 2);
const epsilonRate = parseInt(numbers.map(a => a > data.length/2 ? 0 : 1).join(''), 2);

console.log(gamma*epsilonRate);



// PART 2

let filteredData = data.map(a => [...a]);

for (let i = 0; i < data[0].length; i++) {
    const sumOfIndex = filteredData.map(a => parseInt(a[i])).reduce((prevValue, curValue) => prevValue + curValue, 0);
    if (sumOfIndex >= filteredData.length / 2) {
        filteredData = filteredData.filter(a => parseInt(a[i]) === 1);
    } else {
        filteredData = filteredData.filter(a => parseInt(a[i]) === 0);
    }
    
    if(filteredData.length === 1) {
        break;
    }
}

const oxygen = parseInt(filteredData[0].join(''), 2);

let filteredData2 = data.map(a => [...a]);

for (let i = 0; i < data[0].length; i++) {
    let sumOfIndex = filteredData2.map(a => parseInt(a[i])).reduce((prevValue, curValue) => prevValue + curValue, 0);
    if (sumOfIndex < filteredData2.length / 2) {
        filteredData2 = filteredData2.filter(a => parseInt(a[i]) === 1);
    } else {
        filteredData2 = filteredData2.filter(a => parseInt(a[i]) === 0);
    }
    
    if(filteredData2.length === 1) {
        break;
    }
}

const co2 = parseInt(filteredData2[0].join(''), 2);

console.log(oxygen*co2);