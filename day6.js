import { readFileSync } from 'fs';

let data = [];

readFileSync('input_day6.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data = line.split(",").map(a => parseInt(a));
});

let initialArray = [1];


// PART 1
// Starting from 76 is the same as data initial timer 5 (18 -> 14)
for(let i = 0; i < 76; i++) {
    initialArray = initialArray.flatMap(a => a > 0 ? [a - 1] : [6, 8]);
}

const five_days = initialArray.length;

initialArray = initialArray.flatMap(a => a > 0 ? [a - 1] : [6, 8]);
const four_days = initialArray.length;

initialArray = initialArray.flatMap(a => a > 0 ? [a - 1] : [6, 8]);
const three_days = initialArray.length;

initialArray = initialArray.flatMap(a => a > 0 ? [a - 1] : [6, 8]);
const two_days = initialArray.length;

initialArray = initialArray.flatMap(a => a > 0 ? [a - 1] : [6, 8]);
const one_days = initialArray.length;

let sum = 0;

data.forEach(a => {
    switch(a) {
        case 5:
            sum += five_days;
            break;
        case 4:
            sum += four_days;
            break;
        case 3:
            sum += three_days;
            break;
        case 2:
            sum += two_days;
            break;
        case 1:
            sum += one_days;
            break;
        default:
            break;
    }
});

console.log(sum);


// PART 2
let amountOfFish = [0, 0, 0, 0, 0, 0, 0, 0, 0];

data.forEach(a => {
    amountOfFish[a]++;
});

for(let i = 0; i < 256; i++) {
    let copyAmountOfFish = [...amountOfFish];

    amountOfFish[0] = copyAmountOfFish[1];
    amountOfFish[1] = copyAmountOfFish[2];
    amountOfFish[2] = copyAmountOfFish[3];
    amountOfFish[3] = copyAmountOfFish[4];
    amountOfFish[4] = copyAmountOfFish[5];
    amountOfFish[5] = copyAmountOfFish[6];
    amountOfFish[6] = copyAmountOfFish[0] + copyAmountOfFish[7];
    amountOfFish[7] = copyAmountOfFish[8];
    amountOfFish[8] = copyAmountOfFish[0];
}

const finalSum = amountOfFish.reduce((a,b) => a + b, 0);
console.log(finalSum);

