

import { readFileSync } from 'fs';
import { Agent } from 'http';

console.time("day20");

let data = [];
let enhancement;

let counter = 0;

readFileSync('input_day20.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(counter === 0) {
        enhancement = line.split('');
        counter++;
    } else if(!!line) {
        data.push(line.split(''));
    }
});

const enhance = (image) => {

    let newImage = [];
    for(let i = 0; i < image.length + 10; i++) {
        let row = [];
        for(let j = 0; j < image[0].length + 10; j++) {
            row.push(".");
        }
        newImage.push(row);
    }

    let biggerImage = [];

    for(let i = 0; i < image.length + 10; i++) {
        let row = [];
        for(let j = 0; j < image[0].length + 10; j++) {
            row.push(".");
        }
        biggerImage.push(row);
    }

    for(let j = 0; j < image.length; j++) {
        for(let i = 0; i < image[0].length; i++) {
            biggerImage[j+5][i+5] = image[j][i];
        }
    }

    biggerImage.forEach(a => console.log(a.join("")));

    for(let j = 0; j < biggerImage.length; j++) {
        for(let i = 0; i < biggerImage[0].length; i++) {
            let binaryString = "";
            if(j === 0 && i === 0) {
                binaryString = "." + "." + "." +
                "." + biggerImage[j][i] + biggerImage[j][i+1] +
                "." + biggerImage[j+1][i] + biggerImage[j+1][i+1];
            } else if(j === 0 && i === biggerImage[0].length - 1) {
                binaryString = "." + "." + "." +
                biggerImage[j][i-1] + biggerImage[j][i] + "." +
                biggerImage[j][i-1] + biggerImage[j+1][i] + ".";
            } else if(j === 0) {
                binaryString = "." + "." + "." +
                biggerImage[j][i-1] + biggerImage[j][i] + biggerImage[j][i+1] +
                biggerImage[j][i-1] + biggerImage[j+1][i] + biggerImage[j+1][i+1];
            } else if(i === 0 && j === biggerImage.length - 1) {
                binaryString = "." + biggerImage[j-1][i] + biggerImage[j-1][i+1] +
                "." + biggerImage[j][i] + biggerImage[j][i+1] +
                "." + "." + ".";
            } else if(i === 0) {
                binaryString = "." + biggerImage[j-1][i] + biggerImage[j-1][i+1] +
                "." + biggerImage[j][i] + biggerImage[j][i+1] +
                "." + biggerImage[j+1][i] + biggerImage[j+1][i+1];
            } else if(i === biggerImage[0].length - 1 && j === biggerImage.length - 1) {
                binaryString = biggerImage[j-1][i-1] + biggerImage[j-1][i] + "." +
                biggerImage[j][i-1] + biggerImage[j][i] + "." +
                "." + "." + ".";
            } else if(i === biggerImage[0].length - 1) {
                binaryString = biggerImage[j-1][i-1] + biggerImage[j-1][i] + "." +
                biggerImage[j][i-1] + biggerImage[j][i] + "." +
                biggerImage[j+1][i-1] + biggerImage[j+1][i] + ".";
            } else if(j === biggerImage.length - 1) {
                binaryString = biggerImage[j-1][i-1] + biggerImage[j-1][i] + biggerImage[j-1][i+1] +
                biggerImage[j][i-1] + biggerImage[j][i] + biggerImage[j][i+1] +
                "." + "." + ".";
            } else {
                binaryString = biggerImage[j-1][i-1] + biggerImage[j-1][i] + biggerImage[j-1][i+1] +
                biggerImage[j][i-1] + biggerImage[j][i] + biggerImage[j][i+1] +
                biggerImage[j+1][i-1] + biggerImage[j+1][i] + biggerImage[j+1][i+1];
            }

            binaryString = binaryString.split('').map(a => a === '.' ? '0' : '1').join('');
            let number = parseInt(binaryString, 2);
            newImage[j][i] = enhancement[number];
        }

    }
    let croppedImage = [];

    for(let j = 4; j < biggerImage.length - 4; j++) {
        let row = [];
        for(let i = 4; i < biggerImage[0].length - 4; i++) {
            row.push(newImage[j][i]);
        }
        croppedImage.push(row);
    }

    return croppedImage;
}

let enhancedImage = enhance(data);

enhancedImage.forEach(a => console.log(a.join('')));

let enhancedImage2 = enhance(enhancedImage);

enhancedImage2.forEach(a => console.log(a.join('')));

let count = 0;
enhancedImage2.forEach(a => count += a.filter(a => a === '#').length);
console.log(count);

console.timeEnd("day20");