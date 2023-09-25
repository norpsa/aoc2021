import { readFileSync } from 'fs';

let data = [];

let bingo_numbers = [];

let counter = 0;

let currentArray = [];

readFileSync('input_day4.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(counter === 0){
        bingo_numbers = line.split(',').map(a => parseInt(a));
        counter++;
    } else {
        if(line){
            const row = line.split(/\s/).filter(a => !!a).map(a => parseInt(a));
            currentArray.push(row);

            if(counter % 5 === 0){
                data.push(currentArray);
                currentArray = [];
            }
            counter++;
        }
    }
});

const original_data = data;

// Part 1
let winning_card;
let final_number;

for(let i = 0; i < bingo_numbers.length; i++) {
    data = data.map(card => card.map(row => row.map(number => number === bingo_numbers[i] ? -1 : number )));
    let bingo_won = false;

    data.map(card => {
       let containsCompleteRows = card.map(r => r.reduce((a, b) => a + b), 0).includes(-5);
       let containsCompeleteColumns = card.reduce((prevValue, curValue) => prevValue.map((num, idx) => num + curValue[idx]),
        new Array(data[0].length).fill(0)).includes(-5);
       if(containsCompleteRows || containsCompeleteColumns) {
           bingo_won = true;
           winning_card = card;
           final_number = bingo_numbers[i];
       }
    });

    if(bingo_won) {
        break;
    }
}

let sum = winning_card.map(row => row.filter(a => a !== -1)).reduce((prevValue, currentValue) => prevValue + currentValue.reduce((a,b) => a+b, 0), 0);
console.log(sum*final_number);

// Part 2

data = original_data;

const bingoWon = card => {
    let containsCompleteRows = card.map(r => r.reduce((a, b) => a + b), 0).includes(-5);
    let containsCompeleteColumns = card.reduce((prevValue, curValue) => prevValue.map((num, idx) => num + curValue[idx]),
    new Array(data[0].length).fill(0)).includes(-5);
    return containsCompeleteColumns || containsCompleteRows;
}

for(let i = 0; i < bingo_numbers.length; i++) {
    data = data.map(card => card.map(row => row.map(number => number === bingo_numbers[i] ? -1 : number )));

    if(data.length === 1) {
        if(bingoWon(data[0])) {
            winning_card = data[0];
            final_number = bingo_numbers[i];
            break;
        }
    }

    data = data.filter(card => !bingoWon(card));
}

sum = winning_card.map(row => row.filter(a => a !== -1)).reduce((prevValue, currentValue) => prevValue + currentValue.reduce((a,b) => a+b, 0), 0);
console.log(sum*final_number);