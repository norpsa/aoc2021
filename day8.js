import { readFileSync } from 'fs';

let count = 0;
let sum = 0;

readFileSync('day8_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let parts = line.split("|");
    const input = parts[0].split(" ").filter(a => !!a);
    const output = parts[1].split(" ").filter(a => !!a);

    let number1 = input.filter(a => a.length === 2)[0];
    let number4 = input.filter(a => a.length === 4)[0];
    let number7 = input.filter(a => a.length === 3)[0];
    let number8 = input.filter(a => a.length === 7)[0];

    // 5 merkkiä ja sisältää numeron 1 molemmat kirjaimet
    let number3 = input.filter(a => a.length === 5).filter(a => {
        let contains = true;
        number1.split('').forEach(x => {
            if(!a.includes(x)){
                contains = false;
            }
        });
        return contains;
    })[0];


    // ysi 6 merkkiä ja sisältää 3 ja 4
    let number9 = input.filter(a => a.length === 6).filter(a => {
        let contains = true;
        number3.split('').forEach(x => {
            if(!a.includes(x)){
                contains = false;
            }
        });
        number4.split('').forEach(x => {
            if(!a.includes(x)){
                contains = false;
            }
        });
        return contains;
    })[0];


    // kakkonen on se jossa on 5 ja se mikä puuttuu ysistä
    const missingFromNine = ('abcdefg').split('').filter(a => !number9.includes(a))[0];
    let number2 = input.filter(a => a.length === 5).filter(a => a.includes(missingFromNine))[0];

    // vitonen on se joka ei oo kakkonen ja kolmonen ja 5 merkkiä
    let number5 = input.filter(a => a.length === 5).filter(a => a !== number2 && a !== number3)[0];

    // kutonen on 5 + missingFromNine
    let number6 = input.filter(a => a.length === 6).filter(a => a.includes(missingFromNine)).filter(a => {
        let contains = true;
        number5.split('').forEach(x => {
            if(!a.includes(x)){
                contains = false;
            }
        });
        return contains;
    })[0];

    // nolla on sitten viimeinen :D 6 merkkiä ja ei oo kuutonen eikä ysi
    let number0 = input.filter(a => a.length === 6).filter(a => a !== number6 && a !== number9)[0];

    number0 = number0.split('').sort().join('');
    number1 = number1.split('').sort().join('');
    number2 = number2.split('').sort().join('');
    number3 = number3.split('').sort().join('');
    number4 = number4.split('').sort().join('');
    number5 = number5.split('').sort().join('');
    number6 = number6.split('').sort().join('');
    number7 = number7.split('').sort().join('');
    number8 = number8.split('').sort().join('');
    number9 = number9.split('').sort().join('');

    // PART 1
    output.forEach(a => {
        if(a.length === 2 || a.length === 3 || a.length === 4 || a.length === 7){
            count++;
        }
    });

    // PART 2
    let number = '';
    const sortedOutput = output.map(a => a.split('').sort().join(''));
    sortedOutput.forEach(a => {
        switch (a) {
            case number0:
                number += '0';
                break;
            case number1:
                number += '1';
                break;
            case number2:
                number += '2';
                break;
            case number3:
                number += '3';
                break;
            case number4:
                number += '4';
                break;
            case number5:
                number += '5';
                break;
            case number6:
                number += '6';
                break;
            case number7:
                number += '7';
                break;
            case number8:
                number += '8';
                break;
            case number9:
                number += '9';
                break;
            default:
                break;
        }
    });
    sum += parseInt(number);

});

console.log(count);
console.log(sum);