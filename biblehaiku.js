var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');
var syllableWordHolder = {};
formatData(cmudictFile);
// printHaiku([5,7,5], syllableWordHolder);

var bibleDat = readCmudictFile('./kingjames.txt');
var bibleSyllableObj = {};
formatBible(bibleDat);
for (var i = 0; i<100; i++) {
  printHaiku([5,7,5], bibleSyllableObj);
  console.log(' __ ');
}


function formatBible (data) {
  var bibleString = data.toString().replace(/\w*\|\d*\|\d*\|\s|~/g, '').replace(/\r\n/g, ' ');
  var versesArray = bibleString.replace(/\./g,'.$').replace(/!/g,'!$').replace(/\?/g,'?$').replace(/\$ /g,'\$').split(/\$/g);
  for (var i=0; i<versesArray.length; i++) {
    console.log(versesArray.length-i);
    var sylCount = syllablesInSent(versesArray[i]);
    if (bibleSyllableObj.hasOwnProperty(sylCount)) {
      bibleSyllableObj[sylCount].push(versesArray[i]);
    } else {
      bibleSyllableObj[sylCount] = [versesArray[i]];
      }
  }
}

// console.log(syllablesInSent('Alexandra, I miss you so much!'));
// Take a sentence and see how many syllables are there
function syllablesInSent (string) {
  var total = 0;
  var split = string.toUpperCase().split(' ');
  for (var i=0; i<split.length; i++) {
    var lastChar = split[i].charAt(split[i].length-1);
      if (lastChar === '?' ||
          lastChar === '.' ||
          lastChar === '!' ||
          lastChar === ',' ||
          lastChar === ';' ||
          lastChar === ':'   ) {
        split[i] = split[i].slice(0,-1);
        }
    var count = syllableSearchAndCount(split[i],syllableWordHolder);
    if (count === false) {
      return false;
    } else { total += Number(count); }
  }
  return total;
}

// String needs to be UPPERCASE
function syllableSearchAndCount (word, object) {
  for (var key in object) {
    for (var i=0; i<object[key].length; i++) {
      if (word === object[key][i]) {return key;}
    }
  }
  return false;
}

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

function generateWord (syllableCount, object) {
  return object[syllableCount][Math.floor(Math.random() * object[syllableCount].length)];
}

function printHaiku (syllablearray, object) {
  var runningTotal = 0;
  var haiku = '';
  for (var i=0; i<syllablearray.length; i++) {
    if (runningTotal < 5) {
      haiku += generateWord(syllablearray[i], object) + ' ';
      runningTotal += syllablearray[i];
      if (runningTotal >= 5) {
        haiku += '\n';
      }
    } else if (runningTotal < 12) {
      haiku += generateWord(syllablearray[i], object) + ' ';
      runningTotal += syllablearray[i];
      if (runningTotal >= 12) {
        haiku += '\n';
      }
    } else {
      haiku += generateWord(syllablearray[i], object) + ' ';
      runningTotal += syllablearray[i];
    }
    // console.log(runningTotal);
  }
  console.log(haiku);
}