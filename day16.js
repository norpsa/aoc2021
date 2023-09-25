import { readFileSync } from 'fs';

console.time("day16");

let data = [];

let charMap = new Map();
charMap.set('0', '0000');
charMap.set('1', '0001');
charMap.set('2', '0010');
charMap.set('3', '0011');
charMap.set('4', '0100');
charMap.set('5', '0101');
charMap.set('6', '0110');
charMap.set('7', '0111');
charMap.set('8', '1000');
charMap.set('9', '1001');
charMap.set('A', '1010');
charMap.set('B', '1011');
charMap.set('C', '1100');
charMap.set('D', '1101');
charMap.set('E', '1110');
charMap.set('F', '1111');

readFileSync('input_day16.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let chars = line.split('');
    let binaryString = '';
    chars.forEach(c => binaryString += charMap.get(c));
    data.push(binaryString);
});

const parseLiteral = (binary, startingIndex) => {
    let index = startingIndex;
    let prefix = '1';
    let number = '';
    while(prefix !== '0') {
        prefix = binary.substr(index, 1);
        number += binary.substr(index + 1, 4);
        index += 5;
    }
    return {index, number};
}

const getResult = (results, operator) => {
    let result = results[0];
    switch (operator) {
        case 0:
            result = results.reduce((a,b) => a + b, 0);
            break;
        case 1:
            result = results.reduce((a,b) => a * b, 1);
            break;
        case 2:
            result = Math.min(...results);
            break;
        case 3:
            result = Math.max(...results);
            break;
        case 5:
            result = results[0] > results[1] ? 1 : 0;
            break;
        case 6:
            result = results[0] < results[1] ? 1 : 0;
            break;
        case 7:
            result = results[0] === results[1] ? 1 : 0;
            break;
        default:
            break;
    }
    return result;
}

let versions = 0;

const parseBinary = (binary, startIndex) => {
    const version = parseInt(binary.substr(0, 3), 2);
    versions += version;
    const packetType = parseInt(binary.substr(3, 3), 2);
    let index = 6;

    // Literal packets are with type 4, all others are operator packets
    if(packetType === 4) {
        let literal = parseLiteral(binary, 6);
        let newIndex = startIndex + literal.index
        return { index: newIndex, result: parseInt(literal.number, 2) };
    } else {
        // operator packages
        let lengthTypeId = binary.substr(6, 1);
        let length;
        index += 1;
        // Zero means that next comes length of all subpackets
        if(lengthTypeId === '0') {
            length = parseInt(binary.substr(index, 15), 2);
            index += 15;
            let subPackets = binary.substr(index, length);
            let maxIndex = index + length;
            let results = [];
            while(index < maxIndex && parseInt(binary.substr(index, binary.length - index), 2) !== 0) {
                let onePart = parseBinary(subPackets, index);
                results.push(onePart.result);
                subPackets = binary.substr(onePart.index, binary.length - onePart.index);
                index = onePart.index;
            }
            let result = getResult(results, packetType);
            return ({index: index + startIndex, result: result})
        // One means that next comes amount of all subpackets
        } else {
            let packageAmount = parseInt(binary.substr(index, 11), 2);
            index += 11;
            let subPackets = binary.substr(index, binary.length - index);
            let results = [];
            while(results.length < packageAmount && parseInt(binary.substr(index, binary.length - index), 2) !== 0) {
                let onePart = parseBinary(subPackets, index);
                results.push(onePart.result);
                subPackets = binary.substr(onePart.index, binary.length - onePart.index);
                index = onePart.index;
            }
            let result = getResult(results, packetType);
            return ({index: index + startIndex, result: result})
        }
    }
}

data.forEach(b => console.log(parseBinary(b, 0)));
console.log(versions);

console.timeEnd("day16");