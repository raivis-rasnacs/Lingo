const words = [
  "BIRZE",
  "JUMTS",
  "RIEVA",
  "SAUNA",
  "TANKS",
  "LAUKS",
  "VIETA",
  "AKOTS",
  "TAUTA",
  "BĒRZS",
  "OZOLS",
  "TEIKA"
]
word = "OZOLS";
//var word = words[Math.floor(Math.random()*words.length)];
document.getElementById("guess1").firstElementChild.innerHTML = word.slice(0,1);
console.log(word);
var guesses = 0;
var currentWord = "";
var lives = 3;
correctLettersInCorrectPosition = [];
correctLettersInWrongPosition = [];

document.getElementById("letter5").addEventListener("keyup", function(event) {
  var inputs = document.getElementsByTagName("input");
  var uncompleteWord = false;
  for (single_input of inputs) {
    if (single_input.value == "") { uncompleteWord = true; break; }
  }
  if (uncompleteWord == false) {
  if (event.keyCode === 13) {
    guesses++;
    event.preventDefault();
    formWordFromFields();
  }
  }
});

function checkWord(currentWord) {
  for (var i = 0; i < currentWord.length; i++) {
    for (var j = 0; j < word.length; j++) {
      if (currentWord[i] == word[j] && i == j) {
        correctLettersInCorrectPosition.push(i);
        continue;
      }
      else if (currentWord[i] == word[j]) {
        correctLettersInWrongPosition.push(i);
        continue;
      }
    }
  }
  
  if (currentWord == word) { //Pārbauda, vai uzminēts vārds
    alert("Uzminēji!"); newWord(); 
    }
  else if (guesses == 6) { //Zaudē dzīvību
    if (lives == 0) { alert("Zaudēji!"); lives = 3; setHearts(); newWord(); } //Jauna spēle
    else {
      lives--;
      setHearts();
      newWord();
    }
  }
  else {
    colorTable();
    clearInputs();
  }
  correctLettersInCorrectPosition = [];
  correctLettersInWrongPosition = [];
}

function formWordFromFields() {
currentWord = "";
  var inputs = document.getElementsByTagName("input");
  for (input of inputs) {
    currentWord = currentWord + input.value;
    currentWord = currentWord.toUpperCase();
  }
  //alert(currentWord);
  checkWord(currentWord);
}

function jump(currentInput) {
  currentInput = parseInt(currentInput.slice(-1));
  currentInput = "letter"+(currentInput+1);
  document.getElementById(currentInput).focus();
}

function colorTable() {
  var cells = document.getElementById("guess"+guesses).cells;
  for (var i = 0; i < cells.length; i++) {
    if (correctLettersInWrongPosition.includes(i)) {
      cells[i].style.backgroundColor = "yellow";
      cells[i].innerHTML = word.slice(i, i+1);
    }
    else if (correctLettersInCorrectPosition.includes(i)) {
      cells[i].style.backgroundColor = "red";
      cells[i].innerHTML = word.slice(i, i+1);
    }
    else { cells[i].style.backgroundColor = "green"; }
  }
}

function clearInputs() {
  var inputs = document.getElementsByTagName("input");
  for (input of inputs) {
    input.value = "";
  }
  document.getElementById("letter1").focus();
}

function newWord() {
  clearInputs();
  word = words[Math.floor(Math.random()*words.length)];
  console.log(word);
  var rows = document.getElementsByTagName("TBODY")[0].children;
  for (var i = 0; i < 5; i++) {
    var cells = rows[i].children;
    for (cell of cells) {
      cell.innerHTML = "";
      cell.style.backgroundColor = "white";
    }
  }
  guesses = 0;
}

function setHearts() {
  var hearts = document.getElementById("lives").children;
  for (heart of hearts) {
    heart.style.visibility = "hidden";
  }

  for (var i = 0; i < lives; i++) {
    hearts[i].style.visibility = "visible";
  }
}