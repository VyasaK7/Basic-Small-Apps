// const fs = require("fs");
// fs.copyFileSync("file1.txt","file2.txt");

var superhero = require("superheroes");
var supervillain = require("supervillains");

 var supe = superhero.random();
 var viley = supervillain.random();

 console.log("Supe is " + supe + "\n" +"Viley is " + viley);