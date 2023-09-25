
import { readFileSync } from 'fs';

console.time("day17");

let minX;
let maxX;
let minY;
let maxY;

readFileSync('input_day17.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let values = line.substr(13, line.length - 13);
    let [x, y] = values.split(",").map(a => a.trim());
    x = x.substr(2, x.length - 2);
    y = y.substr(2, y.length - 2);
    [minX, maxX] = x.split("..");
    [minY, maxY] = y.split("..");

});

minX = parseInt(minX);
minY = parseInt(minY);
maxX = parseInt(maxX);
maxY = parseInt(maxY);

// Maksimi X nopeus voi olla X:n reuna, muuten lentää suorilta yli
let possibleXVelocities = [];

for(let i = 0; i <= maxX; i++){
    let xVelocity = i;
    let posX = 0;
    while(!(posX >= minX && posX <= maxX) && xVelocity >= 0) {
        posX += xVelocity;
        xVelocity--;
    }
    if(posX <= maxX && posX >= minX){
        possibleXVelocities.push(i);
    }
}

let possibleVelocities = [];

for(let i = 0; i < possibleXVelocities.length; i++){
    let xVelocity = possibleXVelocities[i];
    let startingYVelocity = minY;
    // Pitäis keksiä joku oikea luku eikä heittää päästä
    while(startingYVelocity < maxX){
        let posX = 0;
        let posY = 0;
        let yVelocity = startingYVelocity;
        xVelocity = possibleXVelocities[i];
        while(!(posY >= minY && posY <= maxY && posX >= minX && posX <= maxX) && posY > minY) {
            posX += xVelocity;
            posY += yVelocity;
            if(xVelocity > 0){
                xVelocity--;
            }
            yVelocity--;
        }

        if(posY >= minY && posY <= maxY && posX >= minX && posX <= maxX) {
            possibleVelocities.push({startinX: possibleXVelocities[i], startingY: startingYVelocity});
        }

        startingYVelocity++;
    }
}

let highestY = 0;

for(let i = 0; i < possibleVelocities.length; i++){
    let xVelocity = possibleVelocities[i].startinX;
    let yVelocity = possibleVelocities[i].startingY;
    let posX = 0;
    let posY = 0;
    let end = false;
    while(!end) {
        posX += xVelocity;
        posY += yVelocity;
        if(posY > highestY) {
            highestY = posY;
        }
        if(xVelocity > 0){
            xVelocity--;
        }
        yVelocity--;

        if(posY >= minY && posY <= maxY) {
            end = true;
        }
    }
}

console.log("PART 1:", highestY);
console.log("PART 2", possibleVelocities.length)

console.timeEnd("day17");