import { readFileSync } from 'fs';

let data = [];

readFileSync('input_day11.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split('').map(a => parseInt(a));
    data.push(row);
});

let count_flashes = 0;

const increaseIfNotFlashed = (i, j) => {
    if(data[i][j] !== -1){
        data[i][j]++;
    }
}

const containsValuesFlashing = () => {
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data.length; j++) {
            if(data[i][j] > 9) {
                return true;
            }
        }
    }
    return false;
}

const checkForFlashes = () => {
    while(containsValuesFlashing()){
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++) {
                if(data[i][j] > 9) {
                    count_flashes++;
                    data[i][j] = -1;
                    if(i > 0) {
                        increaseIfNotFlashed(i - 1, j);
                    }
                    if(i > 0 && j > 0) {
                        increaseIfNotFlashed(i - 1, j - 1);
                    }
                    if(i > 0 && j < (data[i].length - 1)) {
                        increaseIfNotFlashed(i - 1, j + 1);
                    }
                    if(j > 0) {
                        increaseIfNotFlashed(i, j - 1);
                    }
                    if(j < data[i].length - 1) {
                        increaseIfNotFlashed(i, j + 1);
                    }
                    if(i < data.length - 1 && j > 0){
                        increaseIfNotFlashed(i + 1, j - 1);
                    }
                    if(i < data.length - 1) {
                        increaseIfNotFlashed(i + 1, j);
                    }
                    if(i < data.length - 1 && j < data[i].length - 1){
                        increaseIfNotFlashed(i + 1, j + 1);
                    }
                }
            }
        }
    }
    data = data.map(a => a.map(e => e === -1 ? 0 : e));
}

// PART 1
for(let i = 0; i < 100; i++){
    data = data.map(a => a.map(e => e + 1));
    checkForFlashes();
}

console.log(count_flashes);

// PART 2
// Luupattiin jo 100 kertaa part 1 niin jatketaan siitä kun ei jaksa resetoida dataa
let counter = 100;

while(true) {
    data = data.map(a => a.map(e => e + 1));
    counter++;
    checkForFlashes();
    let all_flashed = true;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j <10; j++) {
            if(data[i][j] !== 0) {
                all_flashed = false;
            }
        }
    }
    if(all_flashed) {
        break;
    }
}

console.log(counter);
