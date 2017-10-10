let html = "<div class='screen screen-start' id='start'>";
html += "<header>";
html += "<h1>Tic Tac Toe</h1>";
html += "<p class='message'></p>";
html += "<a href='#' class='button'>Start game</a>";
html += "</header></div>";

const body = document.querySelector("body");
body.innerHTML += html;
let startGameBtn = document.querySelector(".button");
let start_screen = document.querySelector(".screen");
let fields = document.querySelectorAll(".box");
let ul_fields = document.querySelector(".boxes");
let player1wins, player2wins;
let player1fields = [];
let player2fields = [];
let name_one_prompt = "";
let name_two_prompt = "";
let count = 0;

function prompti() { // Prompt cant be empty check
  while (name_one_prompt === "" || name_two_prompt === "" || name_one_prompt == null || name_two_prompt === null) {
    name_one_prompt = prompt("Please enter player 1 name.");
    name_two_prompt = prompt("Please enter player 2 name.");
  }
};
/***************
 Add Start Game
****************/
let win_html = "";
let win2_html = "";

win_html += "<div class='screen screen-win-one' id='finish'>";
win_html += "<header>";
win_html += "<h1>Tic Tac Toe</h1>";
win_html += "<p class='message'></p>";
win_html += "<a href='#' class='button'>New game</a>";
win_html += "</header></div>";

startGameBtn.onclick = () => {
  prompti();
  let p = document.createElement("p");
  let p2 = document.createElement("p");
  document.querySelector("#player1").append(p);
  p.innerHTML = name_one_prompt.toUpperCase();
  document.querySelector("#player2").append(p2);
  p2.innerHTML = name_two_prompt.toUpperCase();
  start_screen.hidden = true;  //Hide Start
  for(let i = 0; i < fields.length; i++){
    ul_fields.children[i].className = "box";
    fields[i].style.backgroundImage = "";
  }
  player1wins = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ];
  player2wins = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ];
}
/***************
  Rules
****************/
function Player (number, symbol) {
  this.player = document.querySelector("#player" + number);//player
  this.player.className = "players active"; //player highlight
  this.isPlaying = true;
  for(let i = 0; i < fields.length; i++){ //Mouse over field change background image to symbol
    fields[i].addEventListener("mouseover", (e) => {
      if(e.target.tagName === "LI" && this.isPlaying === true && e.target.className === "box") {
        fields[i].style.backgroundImage = "url('img/" + symbol + ".svg')";
      };
    });
    fields[i].addEventListener("mouseout", (e) => { //Mouse out field background image disappear
      if(e.target.tagName === "LI" && this.isPlaying === true && e.target.className === "box") {
        fields[i].style.backgroundImage = "";
      };
    });
    fields[i].addEventListener("click", (e) => { // Click on empty field symbol appears
      if(e.target.tagName === "LI" && this.isPlaying === true && e.target.className === "box") {
        fields[i].className = "box box-filled-" + number;
        this.player.className = "players";
        this.isPlaying = false;
        if(number === 1) {
          player1fields.push(i);
        } else if(number === 2) {
            player2fields.push(i);
        }
      }
    });
  }
};
let player1;
let player2;
function activate1() {
  player1 = new Player(1, "o");
}
function activate2() {
  player2 = new Player(2, "x");
}
activate1();

let one = 0;
let two = 1;

function player_wins(player_w, name_one_prompt, player_one_n, player_two_n) { //If player wins window changes
  start_screen.id = "finish";
  start_screen.className = "screen screen-win-" + player_w;
  start_screen.hidden = false;
  startGameBtn.innerHTML = "New game";
  document.querySelector(".message").innerText = "PLAYER " + name_one_prompt.toUpperCase() + " WINS";
  $("#player" + player_one_n + " p").remove();
  $("#player" + player_two_n + " p").remove();
  count = 0;
}

ul_fields.addEventListener("click", (e) => { //Listens if it is clicked on the field
  if(e.target.tagName === "LI" && two === 1) {
    activate2();
    two = 0;
    one = 1;
  if(e.target.className === "box box-filled-2" || e.target.className === "box box-filled-1"){
    count += 1;
  };
    for(let j = 0; j < 8; j++){
      if(player1wins[j].includes(player1fields[0])) {
        let index1 = player1wins[j].indexOf(player1fields[0]);
        if(index1 > -1) {
          player1wins[j].splice(index1,1);
        }
      }
      if(player1wins[j].length === 0) {
        player_wins("one", name_one_prompt, 1, 2); //If player wins window changes
      }
    }
    player1fields.pop();
  } else if (e.target.tagName === "LI" && one === 1) {
      activate1();
      one = 0;
      two = 1;
      if(e.target.className === "box box-filled-2" || e.target.className === "box box-filled-1"){
        count += 1;
      };
      for(let j = 0; j < 8; j++){
        if(player2wins[j].includes(player2fields[0])) {
          let index1 = player2wins[j].indexOf(player2fields[0]);
          if(index1 > -1) {
            player2wins[j].splice(index1,1);
          }
        }
        if(player2wins[j].length === 0) {
          player_wins("two", name_two_prompt, 1, 2); //If player wins window changes
        }
      }
      player2fields.pop();
    }
    if(count === 9) { //count if all fields are clicked to announce tie
      start_screen.id = "finish";
      start_screen.className = "screen screen-win-two";
      start_screen.hidden = false;
      startGameBtn.innerHTML = "New game";
      document.querySelector(".message").innerText = "IT IS TIE!!";
      $("#player1 p").remove();
      $("#player2 p").remove();
      count = 0;
    }
}); //End of listener




//
