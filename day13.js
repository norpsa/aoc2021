import { readFileSync } from 'fs';

console.time("day13");

let data = [];

let folds = [];

for(let i = 0; i < 1500; i++) {
    data.push(new Array(1500).fill(0));
}

let maxY = 0;
let maxX = 0;

readFileSync('input_day13.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(line.includes('fold along')) {
        let fold = line.substring(11).split('=');
        folds.push({ direction: fold[0], index: parseInt(fold[1]) });
    } else if(!!line) {
        let parts = line.split(',').map(a => parseInt(a));
        if(parts[0] > maxX) {
            maxX = parts[0];
        }
        if(parts[1] > maxY) {
            maxY = parts[1];
        }
        data[parts[1]][parts[0]] = 1;
    }
});

const foldX = (index) => {
    for(let x = index + 1; x <= maxX; x++) {
        let distance = x - index;
        for(let y = 0; y <= maxY; y++) {
            if(data[y][x] === 1) {
                data[y][index - distance] = 1;
                data[y][x] = 0;
            }
        }
    }
    maxX = index - 1;

}

const foldY = (index) => {
    for(let y = index + 1; y <= maxY; y++) {
        let distance = y - index;
        for(let x = 0; x <= maxX; x++) {
            if(data[y][x] === 1) {
                data[index - distance][x] = 1;
                data[y][x] = 0;
            }
        }
    }
    maxY = index - 1;
}

for(let i = 0; i < folds.length; i++){
    if(folds[i].direction === 'x') {
        foldX(folds[i].index);
    } else {
        foldY(folds[i].index);
    }
}

const count = data.reduce((prevValue, curValue) => prevValue + curValue.reduce((a,b) => a + b, 0), 0);
console.log(count);

for(let y = 0; y <= maxY; y++) {
    let string = '';
    for(let x = 0; x <= maxX; x++){
        if(data[y][x] === 1) {
            string += '#';
        } else{
            string += '.';
        }
    }
    console.log(string);
}

console.timeEnd("day13");
