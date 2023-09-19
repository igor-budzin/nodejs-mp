const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

const commandsMap = {
  linux: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
  win32: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
  darwin: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1'
};

const logFile = 'activityMonitor.log';
const UPDATE_INTERVAL_MS = 100;
const LOG_INTERVAL_MS = 60 * 1000;

function getUnixTimestamp() {
  return Math.floor(Date.now() / 1000)
}

function logToFile(text) {
  const dataToSave = `${text}\n`;

  fs.appendFile(logFile, dataToSave, (err) => {
    if (err) {
      process.stderr(err);
    }
  });
}


function initMonitoring() {
  let intevalSummaryTime = 0

  const interval = setInterval(() => {
    intevalSummaryTime = intevalSummaryTime + UPDATE_INTERVAL_MS;

    exec(commandsMap[os.platform()], (error, stdout) => {
      if (error) {
        process.stderr(error);
        clearInterval(interval);
        return;
      }

      const outputString = `${getUnixTimestamp()} : ${stdout.trimEnd()}`;

      process.stdout.clearLine();
      process.stdout.write(outputString + '\r');

      if (intevalSummaryTime === LOG_INTERVAL_MS) {
        intevalSummaryTime = 0;
        logToFile(outputString);
      }
    });
  }, UPDATE_INTERVAL_MS);
}

initMonitoring();
