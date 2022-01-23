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

var wordInArray = [];
var usedWords = [];
var word = "";
var guesses = 0;
var currentWord = "";
var lives = 3;
var score = 0;
correctLettersInCorrectPosition = [];
correctLettersInWrongPosition = [];
newWord();

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
  var cells = document.getElementById("guess"+guesses).cells;
  if (guesses == 1) { document.getElementById("guess1").firstElementChild.innerHTML = ""; }
  for (var i = 0; i < currentWord.length; i++) {
    for (var j = 0; j < word.length; j++) {
      if (currentWord[i] == word[j] && i == j) {
        if (wordInArray.includes(currentWord[i])) {
        correctLettersInCorrectPosition.push(i); 
        cells[i].innerHTML = word.slice(i, i+1); 
        wordInArray[i] = ""; }
      }
    }
  }

  for (var i = 0; i < wordInArray.length; i++) {
    if (wordInArray[i] != "") {
      for (var j = i; j < wordInArray.length; j++) {
        if (wordInArray[j] != "") {
          if (wordInArray.includes(currentWord[i])) {
            correctLettersInWrongPosition.push(i); 
            cells[i].innerHTML = currentWord.slice(i, i+1); 
            wordInArray[wordInArray.indexOf(currentWord[i])] = "X";
          } break;
        }
      }
    }
  }

  if (currentWord == word) { //Pārbauda, vai uzminēts vārds
    alert("Uzminēji!"); newWord(); score += 10; 
    }
  else if (guesses == 5) { //Zaudē dzīvību
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

  wordInArray = [];
  for (letter of word) {
    wordInArray.push(letter);
  }
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
    }
    else if (correctLettersInCorrectPosition.includes(i)) {
      cells[i].style.backgroundColor = "red";
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
  if (guesses != 0) {
  clearInputs();
  clearGameField();
  }

  if (usedWords.length < words.length) {
  do {
    word = words[Math.floor(Math.random()*words.length)];
  }
  while (usedWords.includes(word));
  usedWords.push(word);
  }
  else { alert("Atminēji visus vārdus!"); }

  document.getElementById("guess1").firstElementChild.innerHTML = word.slice(0,1);

  wordInArray = [];
  for (letter of word) {
    wordInArray.push(letter);
  }

  console.log(wordInArray);
  console.log(word);
  guesses = 0;
}

function formWordFromFields() {
currentWord = "";
  var inputs = document.getElementsByTagName("input");
  for (input of inputs) {
    currentWord = currentWord + input.value;
  }
  currentWord = currentWord.toUpperCase();
  checkWord(currentWord);
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

function clearGameField() {
var rows = document.getElementsByTagName("TBODY")[0].children;
  for (var i = 0; i < 5; i++) {
    var cells = rows[i].children;
    for (cell of cells) {
      cell.innerHTML = "";
      cell.style.backgroundColor = "white";
    }
  }
}