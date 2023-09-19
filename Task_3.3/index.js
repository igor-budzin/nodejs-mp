import csvtojson from 'csvtojson';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const inputFile = path.join('Task_3.3', './data.csv');
const outputFile = path.join('Task_3.3', './data.txt');;

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);
const linesReader = readline.createInterface({ input: readStream });

function transformText(headersLine, textLine) {
  const text = headersLine + '\n' + textLine;

  return csvtojson({
    delimiter: ';',
    colParser: {
      "Amount": "number",
      "Price": (v) => parseFloat(v.replace(',', '.')),
    },
  })
    .fromString(text)
    .then((res) => {
      const firstItem = res[0];

      const entries = Object.keys(firstItem).map((k) => {
        const key = k?.toLowerCase();
        const value = firstItem[k];

        return [key, value];
      });

      const object = Object.fromEntries(entries);
      const transformedValue = `${JSON.stringify(object)}\n`;

      return transformedValue;
    });
}

function init() {
  let linesCount = 0;
  let headersLine = '';

  linesReader.on('line', async (line) => {
    try {
      linesCount++;

      if (linesCount === 1) {
        headersLine = line;
        return;
      }

      const textToWrite = await transformText(headersLine, line);
      writeStream.write(textToWrite, (err) => {
        if (err) {
          console.log(err);
        }
      });

    }
    catch (err) {
      console.log('err', err);
    }
  });

  linesReader.on('error', (error) => {
    console.log('error', error);
  });
}

init();
