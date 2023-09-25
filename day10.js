import { readFileSync } from 'fs';

let sum = 0;
let scores = [];

readFileSync('input_day10.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split('');

    // PART 1
    let openings = [];
    let end = false;

    for(let i = 0; i < row.length; i++){

        let e = row[i];
        let open;

        if(end) {
            break;
        }

        switch (e) {
            case '(':
                openings.push(e);
                break;
            case '[':
                openings.push(e);
                break;
            case '{':
                openings.push(e);
                break;
            case '<':
                openings.push(e);
                break;
            case ')':
                open = openings.pop();
                if(open !== '('){
                    end = true;
                    sum += 3;
                }
                break;
            case ']':
                open = openings.pop();
                if(open !== '['){
                    end = true;
                    sum += 57;
                }
                break;
            case '}':
                open = openings.pop();
                if(open !== '{'){
                    end = true;
                    sum += 1197;
                }
                break;
            case '>':
                open = openings.pop();
                if(open !== '<'){
                    end = true;
                    sum += 25137;
                }
                break;
            default:
                break;
        }
    }

    // PART 2
    let score = 0;
    if(!end) {
        let length = openings.length;
        for(let i = 0; i < length; i++){
            let a = openings.pop();
            switch (a) {
                case '(':
                    score = score*5 + 1;
                    break;
                case '[':
                    score = score*5 + 2;
                    break;
                case '{':
                    score = score*5 + 3;
                    break;
                case '<':
                    score = score*5 + 4;
                    break;
                default:
                   break;
            }
        }
        scores.push(score);
    }
    
});

console.log(sum);
const sorted_scores = scores.sort((a,b) => a - b);
console.log(sorted_scores[Math.floor(scores.length / 2)]);