import csv from 'csvtojson';
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';

const inputFile = path.join('Task_3.3', './data.csv');
const outputFile = path.join('Task_3.3', './data.txt');;

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const converter = csv({
  delimiter: ';',
  colParser: {
    "Amount": "number",
    "Price": (v) => parseFloat(v.replace(',', '.')),
  },
});

const onComplete = (err) => {
  if (err) {
    console.log('Error', err);
  }
};

pipeline(readStream, converter, writeStream, onComplete);

