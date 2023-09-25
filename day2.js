import { readFileSync } from 'fs';

let data = [];

readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let parts = line.split(" ");
    data.push({ direction: parts[0], amount: parseInt(parts[1]) });
});

let x = 0;
let y = 0;
let aim = 0;

// PART 1
data.forEach(e => {
    switch(e.direction) {
        case 'forward':
            x += e.amount;
            break;
        case 'up':
            y -= e.amount;
            break;
        case 'down':
            y += e.amount;
            break;
        default:
            break;    
    }
});

x = 0;
y = 0;

//PART 2
data.forEach(e => {
    switch(e.direction) {
        case 'forward':
            x += e.amount;
            y += e.amount*aim;
            break;
        case 'up':
            aim -= e.amount;
            break;
        case 'down':
            aim += e.amount;
            break;
        default:
            break;    
    }
});

console.log(x*y);