import { readFileSync } from 'fs';

let data = new Map();

readFileSync('input_day12.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split('-');
    let cave1 = row[0];
    let cave2 = row[1];
    if(data.has(cave1)) {
        let cave1data = data.get(cave1);
        cave1data.push(cave2);
        data.set(cave1, cave1data);
    } else {
        data.set(cave1, [cave2]);
    }
    if(data.has(cave2)) {
        let cave2data = data.get(cave2);
        cave2data.push(cave1);
        data.set(cave2, cave2data);
    } else {
        data.set(cave2, [cave1]);
    }
});

let finalPaths = [];

const getPaths = (point, pathSoFar, paths) => {
    if(point === 'end') {
        return [...paths, [...pathSoFar, point]];
    }

    let allPoints = data.get(point);
    let possiblePoints = [];
    let lowerCasePoints = pathSoFar.filter(a => a.toUpperCase() !== a);
    if(point.toUpperCase !== point) {
        lowerCasePoints.push(point);
    }
    let visitedTwiceAlready = new Set(lowerCasePoints).size !== lowerCasePoints.length;
    for (let i = 0; i < allPoints.length; i++) {
        if(allPoints[i].toUpperCase() === allPoints[i]) {
            possiblePoints.push(allPoints[i]);
        } else if (allPoints[i] !== 'start') {
            if(!pathSoFar.includes(allPoints[i])){
                possiblePoints.push(allPoints[i]);
            } else if(!visitedTwiceAlready){
                possiblePoints.push(allPoints[i]);
            }
        }
    }

    if(possiblePoints.length === 0) {
        return paths;
    }

    let newPaths = [];
    for(let i = 0; i < possiblePoints.length; i++) {
        newPaths.push(getPaths(possiblePoints[i], [...pathSoFar, point], paths));
    }

    return [...paths, ...newPaths.flat()];
} 

let startPaths = data.get('start');

for(let i = 0; i < startPaths.length; i++){
    let paths = getPaths(startPaths[i], ['start'], []);
    paths.forEach(path => finalPaths.push(path));
}

console.log(finalPaths.length);