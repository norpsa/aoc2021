import { readFileSync } from 'fs';

let data = [];
for(let i = 0; i < 1000; i++) {
    data.push(new Array(1000).fill(0));
}

// PART 1
readFileSync('input_day5.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let parts = line.split("->");
    let first = parts[0].split(",");
    let second = parts[1].split(",");

    let x1 = parseInt(first[0]);
    let y1 = parseInt(first[1]);

    let x2 = parseInt(second[0]);
    let y2 = parseInt(second[1]);


    if(x1 === x2){
        let start = y1 > y2 ? y2 : y1;
        let end = y2 > y1 ? y2 : y1;
        for(let i = start; i <= end; i++) {
            data[i][x1]++;
        }
    } else if( y1 === y2){
        let start = x1 > x2 ? x2 : x1;
        let end = x2 > x1 ? x2 : x1;
        for(let i = start; i <= end; i++) {
            data[y1][i]++;
        }
    }
}); 

const result1 = data.reduce((prev, cur) => prev + cur.filter(x => x > 1).length, 0);
console.log(result1); 

// PART 2

data = [];
for(let i = 0; i < 1000; i++) {
    data.push(new Array(1000).fill(0));
}

readFileSync('input_day5.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let parts = line.split("->");
    let first = parts[0].split(",");
    let second = parts[1].split(",");

    let x1 = parseInt(first[0]);
    let y1 = parseInt(first[1]);

    let x2 = parseInt(second[0]);
    let y2 = parseInt(second[1]);

    if(x1 === x2){
        let start = y1 > y2 ? y2 : y1;
        let end = y2 > y1 ? y2 : y1;
        for(let i = start; i <= end; i++) {
            data[i][x1]++;
        }
    } else if( y1 === y2){
        let start = x1 > x2 ? x2 : x1;
        let end = x2 > x1 ? x2 : x1;
        for(let i = start; i <= end; i++) {
            data[y1][i]++;
        }
    } else {
        let x_multiply = x1 < x2 ? 1 : -1;
        let y_multiply = y1 < y2 ? 1 : -1;
        let length = (x2 - x1)*x_multiply;
        for(let i = 0; i <= length; i++){
            data[y1 + i*y_multiply][x1 + i*x_multiply]++;
        }
    }
}); 

const count = data.reduce((prev, cur) => prev + cur.filter(x => x > 1).length, 0);
console.log(count);