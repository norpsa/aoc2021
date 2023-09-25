import { readFileSync } from 'fs';

let data = [];

readFileSync('input_day9.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split('').map(a => parseInt(a));
    data.push(row);
});

let risk_level = 0;

let low_points = [];

for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
        let value = data[i][j];
        
        let is_lowest = true;
        if(i > 0 && data[i - 1][j] <= value) {
            is_lowest = false;
        }
        if(j > 0 && data[i][j - 1] <= value) {
            is_lowest = false;
        }
        if(i < (data.length - 1) && data[i + 1][j] <= value){
            is_lowest = false;
        }
        if(j < (data[i].length - 1) && data[i][j + 1] <= value){
            is_lowest = false;
        }

        if(is_lowest){
            risk_level += (value + 1);
            low_points.push({ x: j, y: i });
        }
    }
}

console.log(risk_level);

// PART 2

let basin_sums = [];

let points_checked = new Set();

const checkPoint = (x, y, prevValue) => {
    if(data[y][x] === 9 || points_checked.has(JSON.stringify({x, y}))) {
        return prevValue;
    } else {
        points_checked.add(JSON.stringify({x, y}));
        let left = x === 0 ? 0 : checkPoint(x - 1, y, prevValue);
        let right = x === (data[y].length - 1) ? 0 : checkPoint(x + 1, y, prevValue);
        let up = y === 0 ? 0 : checkPoint(x, y - 1, prevValue);
        let down = y === (data.length - 1) ? 0 : checkPoint(x, y + 1, prevValue);
        return prevValue + 1 + left + right + up + down;
    }
}


low_points.forEach(point => {
    basin_sums.push(checkPoint(point.x, point.y, 0));
});

basin_sums = basin_sums.sort((a, b) => b - a);

console.log(basin_sums[0]*basin_sums[1]*basin_sums[2]);