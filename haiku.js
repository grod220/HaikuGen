var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit;
   lines.forEach(function(line){    
    lineSplit = line.split("  ");    
    console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]); 

  });   
}

formatData(cmudictFile);