var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');
var syllableWordHolder = {};
formatData(cmudictFile);

printHaiku([2,2,1,3,4,4,1]);

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function syllableCount (string) {
  return string.replace(/[^0-9]/g,"").length;
}

function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit;
   lines.forEach(function(line){    
    lineSplit = line.split("  ");
    lineSplit[0] = lineSplit[0].replace(/\([0-9]\)/g,"");
    var syllables = syllableCount(lineSplit[1]);
    if (syllableWordHolder.hasOwnProperty(syllables)) {
      syllableWordHolder[syllables].push(lineSplit[0]);
    } else {
      syllableWordHolder[syllables] = [lineSplit[0]];
    }
  });
}

function generateWord (syllableCount) {
  return syllableWordHolder[syllableCount][Math.floor(Math.random() * syllableWordHolder[syllableCount].length)];
}

function printHaiku (syllablearray) {
  var runningTotal = 0;
  var haiku = '';
  for (var i=0; i<syllablearray.length; i++) {
    if (runningTotal < 5) {
      haiku += generateWord(syllablearray[i]) + ' ';
      runningTotal += syllablearray[i];
      if (runningTotal >= 5) {
        haiku += '\n';
      }
    } else if (runningTotal < 12) {
      haiku += generateWord(syllablearray[i]) + ' ';
      runningTotal += syllablearray[i];
      if (runningTotal >= 12) {
        haiku += '\n';
      }
    } else {
      haiku += generateWord(syllablearray[i]) + ' ';
      runningTotal += syllablearray[i];
    }
    // console.log(runningTotal);
  }
  console.log(haiku);
}